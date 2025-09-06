'use client';

import { useState, useEffect } from 'react';
import { parseHUF, formatHUF } from '@/utils/currency';
import { calculateTax, TaxCalculationResult } from '@/utils/taxCalculation';

export function useTaxCalculator(initialValue = '') {
  const [grossInput, setGrossInput] = useState(initialValue);
  const [results, setResults] = useState<TaxCalculationResult | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculate = () => {
    const monthlyGross = parseHUF(grossInput);
    
    if (!Number.isFinite(monthlyGross) || monthlyGross <= 0) {
      setResults(null);
      setIsValid(false);
      setShowBreakdown(false);
      return;
    }
    
    setIsValid(true);
    const calculationResults = calculateTax(monthlyGross);
    setResults(calculationResults);
    setShowBreakdown(true);
  };

  const clear = () => {
    setGrossInput('');
    setResults(null);
    setIsValid(true);
    setShowBreakdown(false);
  };

  const formatInput = () => {
    const val = parseHUF(grossInput);
    if (Number.isFinite(val) && val > 0) {
      setGrossInput(formatHUF(val));
    }
  };



  return {
    grossInput,
    setGrossInput,
    results,
    isValid,
    calculate,
    clear,
    formatInput,
    showBreakdown,
  };
}