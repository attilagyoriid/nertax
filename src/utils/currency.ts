export const nf = new Intl.NumberFormat("hu-HU", {
  style: "currency",
  currency: "HUF",
  maximumFractionDigits: 0,
});

export function parseHUF(value: string): number {
  if (!value) return NaN;
  const digits = value
    .toString()
    .replace(/[^0-9.,]/g, "")
    .replace(/\s+/g, "");
  if (!digits) return NaN;
  const normalized = digits.replace(",", ".");
  return Number(normalized);
}

export function formatHUF(value: number): string {
  return new Intl.NumberFormat("hu-HU").format(Math.round(value));
}