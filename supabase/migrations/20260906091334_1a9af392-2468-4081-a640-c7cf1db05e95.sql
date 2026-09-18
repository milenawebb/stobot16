CREATE TABLE public.job_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  position TEXT NOT NULL,
  schedule TEXT NOT NULL,
  location TEXT NOT NULL,
  pay TEXT NOT NULL,
  description TEXT,
  sector TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.job_listings TO anon;
GRANT SELECT ON public.job_listings TO authenticated;
GRANT ALL ON public.job_listings TO service_role;

ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active job listings"
  ON public.job_listings FOR SELECT
  USING (is_active = true);

CREATE OR REPLACE FUNCTION public.set_job_listings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER job_listings_updated_at
BEFORE UPDATE ON public.job_listings
FOR EACH ROW EXECUTE FUNCTION public.set_job_listings_updated_at();

CREATE INDEX job_listings_active_created_idx ON public.job_listings (is_active, created_at DESC);

INSERT INTO public.job_listings (slug, title, position, schedule, location, pay, description, sector) VALUES
('skladov-rabotnik-sofia-dnevna', 'Търсим складови работници за дневна смяна', 'Складов работник', 'Дневна смяна', 'София, склад Орбит', '15 лв/час', 'Комисиониране и подготовка на пратки. Осигурен транспорт до обекта, трудов договор и осигуровки от първия ден.', 'Складове и логистика'),
('shofyor-kategoriya-b-sofia', 'Шофьор категория B за градски курсове', 'Шофьор', 'Половин работен ден', 'София и околността', '1600 лв/месец', 'Развоз на пратки в рамките на града с фирмен автомобил. Подходящо и за студенти.', 'Транспорт'),
('hamalin-premestvaniya-plovdiv', 'Хамали за премествания и товаро-разтоварна дейност', 'Хамалин', 'Гъвкав график', 'Пловдив', '18 лв/час', 'Премествания на офиси и домове, товарене и разтоварване. Плащане веднага след приключване на обекта.', 'Хамалски услуги'),
('operator-mashini-nochna-smyana', 'Оператори на машини за нощна смяна', 'Оператор на машина', 'Нощна смяна', 'Божурище, производствена база', '17 лв/час', 'Работа на поточна линия с обучение на място. Допълнително заплащане за нощен труд.', 'Производство');