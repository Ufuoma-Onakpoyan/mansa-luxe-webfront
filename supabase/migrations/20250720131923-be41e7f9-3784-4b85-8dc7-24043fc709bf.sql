-- Add featured column to properties table for better admin control
ALTER TABLE public.properties 
ADD COLUMN featured boolean DEFAULT false;

-- Add display_order column to testimonials for admin control
ALTER TABLE public.testimonials 
ADD COLUMN display_order integer DEFAULT 0;

-- Add published column to testimonials for admin control  
ALTER TABLE public.testimonials 
ADD COLUMN published boolean DEFAULT true;

-- Create index for better performance on featured properties
CREATE INDEX idx_properties_featured ON public.properties(featured);

-- Create index for testimonials ordering
CREATE INDEX idx_testimonials_display_order ON public.testimonials(display_order, published);