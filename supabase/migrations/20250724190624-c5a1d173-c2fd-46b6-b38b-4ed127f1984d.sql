-- Phase 1: Critical Database Security Fixes (Fixed enum values)

-- 1. Enable RLS on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 2. Drop the overly permissive policies
DROP POLICY IF EXISTS "Allow all operations on properties" ON public.properties;
DROP POLICY IF EXISTS "Allow all operations on testimonials" ON public.testimonials;

-- 3. Create proper RLS policies for properties
-- Allow public to view available and sold properties
CREATE POLICY "Public can view published properties" 
ON public.properties 
FOR SELECT 
USING (status IN ('available', 'sold'));

-- Only authenticated admin users can modify properties
CREATE POLICY "Admin users can manage properties" 
ON public.properties 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'editor')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'editor')
  )
);

-- 4. Create proper RLS policies for testimonials
-- Allow public to view published testimonials
CREATE POLICY "Public can view published testimonials" 
ON public.testimonials 
FOR SELECT 
USING (published = true);

-- Only authenticated admin users can manage testimonials
CREATE POLICY "Admin users can manage testimonials" 
ON public.testimonials 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'editor')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'editor')
  )
);

-- 5. Create secure RLS policies for admin_users
-- Admin users can view their own record and other admin records (for super_admin role)
CREATE POLICY "Admin users can view admin records" 
ON public.admin_users 
FOR SELECT 
TO authenticated
USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  )
);

-- Only super_admin role can insert new admin users
CREATE POLICY "Super admin can create admin users" 
ON public.admin_users 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  )
);

-- Admin users can update their own record, super_admin role can update any
CREATE POLICY "Admin users can update admin records" 
ON public.admin_users 
FOR UPDATE 
TO authenticated
USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  )
)
WITH CHECK (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  )
);

-- Only super_admin role can delete admin users (except themselves)
CREATE POLICY "Super admin can delete other admin users" 
ON public.admin_users 
FOR DELETE 
TO authenticated
USING (
  user_id != auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  )
);

-- 6. Create security definer function to check admin roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin_user(check_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE user_id = check_user_id 
    AND role IN ('super_admin', 'editor')
  );
$$;

-- 7. Update the existing update_updated_at_column function with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 8. Create triggers for updated_at columns if they don't exist
DO $$
BEGIN
  -- Check if trigger exists for properties
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_properties_updated_at') THEN
    CREATE TRIGGER update_properties_updated_at
      BEFORE UPDATE ON public.properties
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  -- Check if trigger exists for testimonials
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_testimonials_updated_at') THEN
    CREATE TRIGGER update_testimonials_updated_at
      BEFORE UPDATE ON public.testimonials
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  -- Check if trigger exists for admin_users
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_admin_users_updated_at') THEN
    CREATE TRIGGER update_admin_users_updated_at
      BEFORE UPDATE ON public.admin_users
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;