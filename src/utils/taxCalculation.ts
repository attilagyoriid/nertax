export interface TaxCalculationResult {
  current: number;
  proposed: number;
  extraYearly: number;
  extraFourYears: number;
}

export function calculateTax(monthlyGross: number): TaxCalculationResult {
  const annual = monthlyGross * 12;

  // Progressive tax calculation
  let proposedAnnual = 0;
  if (annual <= 5_000_000) {
    proposedAnnual = annual * 0.15;
  } else if (annual <= 15_000_000) {
    proposedAnnual = 5_000_000 * 0.15 + (annual - 5_000_000) * 0.22;
  } else {
    proposedAnnual =
      5_000_000 * 0.15 +
      10_000_000 * 0.22 +
      (annual - 15_000_000) * 0.33;
  }

  const proposed = proposedAnnual / 12;
  const current = monthlyGross * 0.15;
  const extraPerYear = proposedAnnual - annual * 0.15;
  const extraPerFourYears = extraPerYear * 4;

  return {
    current,
    proposed,
    extraYearly: extraPerYear,
    extraFourYears: extraPerFourYears,
  };
}