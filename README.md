# TISZA Tax Calculator

A responsive Next.js application for calculating Hungarian tax changes based on TISZA party proposals.

## Features

- Modular component architecture
- Responsive design for mobile and desktop
- TypeScript for type safety
- Custom hooks for state management
- CSS modules for styling
- Hungarian currency formatting

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable React components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `public/` - Static assets

## Components

- `TaxCalculator` - Main calculator container
- `TaxForm` - Input form for gross income
- `TaxResults` - Results display component

## Utilities

- `currency.ts` - Currency formatting and parsing
- `taxCalculation.ts` - Tax calculation logic