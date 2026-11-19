CREATE TABLE public.company_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL DEFAULT 'home' CHECK (char_length(source) <= 40),
  company text NOT NULL CHECK (char_length(company) BETWEEN 1 AND 200),
  contact_name text NOT NULL CHECK (char_length(contact_name) BETWEEN 1 AND 200),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 3 AND 40),
  email text CHECK (char_length(email) <= 255),
  sector text CHECK (char_length(sector) <= 100),
  workers text CHECK (char_length(workers) <= 40),
  city text CHECK (char_length(city) <= 200),
  message text CHECK (char_length(message) <= 2000),
  gdpr_consent boolean NOT NULL DEFAULT false
);
GRANT INSERT ON public.company_requests TO anon, authenticated;
GRANT ALL ON public.company_requests TO service_role;
ALTER TABLE public.company_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit company requests" ON public.company_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);