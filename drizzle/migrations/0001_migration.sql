CREATE TABLE public.candidate_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  position text,
  city text,
  message text,
  consent boolean NOT NULL,
  source text NOT NULL DEFAULT 'home',
  status text NOT NULL DEFAULT 'new',
  ip_hash text
);
GRANT INSERT ON public.candidate_applications TO anon, authenticated;
GRANT ALL ON public.candidate_applications TO service_role;
ALTER TABLE public.candidate_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit candidate applications" ON public.candidate_applications
  FOR INSERT TO anon, authenticated WITH CHECK (consent = true AND status = 'new');
CREATE INDEX candidate_applications_ip_time ON public.candidate_applications (ip_hash, created_at DESC);

ALTER TABLE public.company_requests ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

CREATE OR REPLACE FUNCTION public.candidate_recent_count(_ip_hash text)
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT count(*)::int FROM public.candidate_applications
  WHERE ip_hash = _ip_hash AND created_at > now() - interval '1 hour';
$$;
REVOKE ALL ON FUNCTION public.candidate_recent_count(text) FROM public;
GRANT EXECUTE ON FUNCTION public.candidate_recent_count(text) TO anon, authenticated, service_role;