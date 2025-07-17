-- Update properties with local image paths that will work on Vercel
UPDATE public.properties 
SET images = ARRAY['/src/assets/property-1.jpg']
WHERE title = 'Luxury Penthouse Victoria Island';

UPDATE public.properties 
SET images = ARRAY['/src/assets/property-2.jpg']
WHERE title = 'Modern Villa Lekki Phase 1';

UPDATE public.properties 
SET images = ARRAY['/src/assets/property-3.jpg']
WHERE title = 'Executive Duplex Ikoyi';

UPDATE public.properties 
SET images = ARRAY['/src/assets/property-4.jpg']
WHERE title = 'Waterfront Mansion Banana Island';

UPDATE public.properties 
SET images = ARRAY['/src/assets/property-5.jpg']
WHERE title = 'Luxury Apartment Eko Atlantic';