'use client';

import { FormEvent, useRef, useEffect } from 'react';
import Image from 'next/image';
import taxData from '@/utils/taxBreakdown.json';
import styles from './TaxForm.module.css';

interface TaxFormProps {
  grossInput: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  onBlur: () => void;
  isValid: boolean;
}

export default function TaxForm({
  grossInput,
  onInputChange,
  onSubmit,
  onClear,
  onBlur,
  isValid,
}: TaxFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    
    // Eager prefetch images in background
    setTimeout(() => {
      taxData.taxBreakdown.forEach((tax) => {
        const img = new Image();
        img.src = tax.image;
      });
    }, 100);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="gross" className={styles.label}>
        Az Ön bruttó jövedelme jelenleg:
      </label>
      <div className={styles.field}>
        <input
          ref={inputRef}
          id="gross"
          name="gross"
          type="text"
          inputMode="numeric"
          placeholder="pl. 450 000"
          autoComplete="off"
          value={grossInput}
          onChange={(e) => onInputChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={!isValid}
          className={styles.input}
        />
        <div className={styles.suffix}>Ft / hó</div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.button}>
          Számolás
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.ghost}`}
          onClick={handleClear}
          aria-label="Mező törlése"
        >
          Törlés
        </button>
      </div>
    </form>
  );
}