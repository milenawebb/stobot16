UPDATE public.job_listings
SET pay = replace(
  replace(
    replace(pay, chr(1083) || chr(1074) || '.', '€'),
    chr(1083) || chr(1074),
    '€'
  ),
  chr(1083) || chr(1077) || chr(1074) || chr(1072),
  '€'
)
WHERE pay LIKE '%' || chr(1083) || chr(1074) || '%'
   OR pay LIKE '%' || chr(1083) || chr(1077) || chr(1074) || chr(1072) || '%';