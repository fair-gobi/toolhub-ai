import type { Metadata } from 'next'
import LoanEmiCalculator from './LoanEmiCalculator'

export const metadata: Metadata = {
  title: 'Loan EMI Calculator - Calculate Home, Car & Personal Loan EMI | ToolHub',
  description: 'Free online EMI calculator for home loan, car loan, personal loan. Calculate monthly EMI, total interest, and payment breakdown instantly with sliders.',
  keywords: 'EMI calculator, loan calculator, home loan EMI, car loan EMI, personal loan calculator, EMI formula',
  openGraph: {
    title: 'Loan EMI Calculator | ToolHub',
    description: 'Calculate your monthly EMI for any loan instantly. See principal vs interest breakdown.',
    type: 'website',
  }
}

export default function Page() {
  return <LoanEmiCalculator />
}
