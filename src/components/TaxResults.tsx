'use client';

import { TaxCalculationResult } from '@/utils/taxCalculation';
import { nf } from '@/utils/currency';
import styles from './TaxResults.module.css';

interface TaxResultsProps {
  results: TaxCalculationResult | null;
}

export default function TaxResults({ results }: TaxResultsProps) {
  if (!results) return null;

  return (
    <section className={styles.results}>
      <div className={`${styles.resultLine} ${styles.green}`}>
        <span className={styles.label}>
          A FIDESZ-kormány alatt az Ön jelenlegi Adó kötelezettsége havonta:
        </span>
        <span className={styles.number}>
          {nf.format(Math.round(results.current))} / hó
        </span>
      </div>
      
      <div className={styles.resultLine}>
        <span className={styles.label}>
          Tisza új javaslata szerint Ön ennyi SZJA-t fizetne havonta:
        </span>
        <span className={styles.number}>
          {nf.format(Math.round(results.proposed))} / hó
        </span>
        
        <span className={styles.label}>
          Éves szinten ennyivel több SZJA-t kellene fizetnie:
        </span>
        <div className={styles.number}>
          {nf.format(Math.round(results.extraYearly))}
        </div>
        
        <span className={styles.label}>
          4 év alatt összesen ennyivel fizetne több SZJA-t:
        </span>
        <div className={styles.number}>
          {nf.format(Math.round(results.extraFourYears))}
        </div>
        
        <p className={styles.info}>
          Az esetleg fennmaradó adókedvezményeket nem tartalmazza. Ha ön 25 év
          alatti, vagy 3 vagy több gyermeket nevelő édesanya, nincsen szja
          fizetési kötelezettsége a FIDESZ-kormány kezdeményezésére!
        </p>
      </div>
    </section>
  );
}