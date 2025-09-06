'use client';

import { useTaxCalculator } from '@/hooks/useTaxCalculator';
import { parseHUF } from '@/utils/currency';
import TaxForm from './TaxForm';
import TaxBreakdown from './TaxBreakdown';
import styles from './TaxCalculator.module.css';

export default function TaxCalculator() {
  const {
    grossInput,
    setGrossInput,
    results,
    isValid,
    calculate,
    clear,
    formatInput,
    showBreakdown,
  } = useTaxCalculator();

  return (
    <main className={styles.card} role="region" aria-labelledby="title">
      <header className={styles.header}>
        <h1 id="title" className={styles.title}>
          <span style={{color: '#FF6A00'}}>Fidesz</span> nemzeti sarc kalkulátor
        </h1>
      </header>

      <TaxForm
        grossInput={grossInput}
        onInputChange={setGrossInput}
        onSubmit={calculate}
        onClear={clear}
        onBlur={formatInput}
        isValid={isValid}
      />

      {results && (
        <TaxBreakdown 
          monthlyGross={parseHUF(grossInput) || 0} 
          triggerAnimation={showBreakdown}
        />
      )}
    </main>
  );
}