-- GAMA SERVICES - SUPABASE SCHEMA BRAIN (PGSQL)

-- 1. PROFILES (Extended user data)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('admin', 'employee', 'client')) DEFAULT 'client',
  avatar_url TEXT,
  company_name TEXT, -- Only for clients
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. WORK ORDERS (OS)
CREATE TABLE public.work_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id),
  employee_id UUID REFERENCES public.profiles(id),
  client_name TEXT NOT NULL,
  address TEXT NOT NULL,
  service_type TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'scheduled', 'in_progress', 'done', 'canceled')) DEFAULT 'pending',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  scheduled_date DATE,
  completion_date TIMESTAMP WITH TIME ZONE,
  signature_url TEXT, -- Digital signature
  photos JSONB DEFAULT '[]'::jsonb, -- Array of photo URLs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. QUOTES (Orçamentos/Leads)
CREATE TABLE public.quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  status TEXT CHECK (status IN ('new', 'contacted', 'approved', 'rejected')) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ATTENDANCE (Punch Clock / Ponto)
CREATE TABLE public.attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.profiles(id) NOT NULL,
  check_in TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  check_out TIMESTAMP WITH TIME ZONE,
  location_in POINT, -- GPS on check-in
  location_out POINT, -- GPS on check-out
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- POLICIES (Simplified for dev)
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- TRANGERS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
