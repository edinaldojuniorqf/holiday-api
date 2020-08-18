/**
 * Retorna a data de páscoa
 */
export default function getdatePascoa(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const L = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * L) / 451);
  const moth = Math.floor((h + L - 7 * m + 114) / 31);
  const day = 1 + (h + L - 7 * m + 114) % 31

  return new Date(day, moth - 1, year, 0, 0, 0);
}
