import { CLIENTS_PHONE, WORKERS_PHONE } from "@/lib/contact";
import { LEGAL } from "@/lib/legal";

export function ContactLines() {
  return (
    <ul>
      <li>Телефон за работници: <a href={`tel:${WORKERS_PHONE.tel}`}>{WORKERS_PHONE.display}</a></li>
      <li>Телефон за фирми: <a href={`tel:${CLIENTS_PHONE.tel}`}>{CLIENTS_PHONE.display}</a></li>
      {LEGAL.email && <li>Имейл: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></li>}
    </ul>
  );
}
