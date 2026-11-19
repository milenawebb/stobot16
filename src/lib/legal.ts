// Confirm legal entity and fill in email before launch.
// Empty values are never rendered anywhere. Never add the management address here.
export const LEGAL = {
  companyName: "Стобот ЕйчАр ЕООД",
  eik: "208648435",
  city: "гр. София",
  email: "",
  registration:
    "Регистрация за посредническа дейност по наемане на работа, Министерство на труда и социалната политика, № 4055 / 16.02.2026 г.",
} as const;

export const LEGAL_COMPANY_LINE = [LEGAL.companyName, LEGAL.eik && `ЕИК ${LEGAL.eik}`, LEGAL.city]
  .filter(Boolean)
  .join(", ");

export const LEGAL_UPDATED = "19.11.2026";

/** Opens the AI chat assistant from anywhere (listened to by FloatingContact). */
export const OPEN_CHAT_EVENT = "stobot:open-chat";
export function openChat() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
}
