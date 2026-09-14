export const STAFFING_SECTORS = [
  "Строителство",
  "Производство",
  "Складове и логистика",
  "Опаковане",
  "HoReCa",
  "Транспорт",
  "Почистване",
  "Поддръжка",
] as const;

export const SECTORS = [
  ...STAFFING_SECTORS,
  "Хамалски услуги",
] as const;
