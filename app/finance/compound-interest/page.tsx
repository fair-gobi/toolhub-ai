import type { Metadata } from 'next'
import CompoundInterestCalculator from './CompoundInterestCalculator'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator - Calculate Investment Growth | ToolHub',
  description: 'Free compound interest calculator online. Calculate how your investment grows with yearly, quarterly, or monthly compounding. See principal vs interest breakdown.',
  keywords: 'compound interest calculator, investment calculator, compound interest formula, daily compound interest, monthly compounding calculator',
  openGraph: {
    title: 'Compound Interest Calculator | ToolHub',
    description: 'See the power of compounding. Calculate future value of your investments.',
    type: 'website',
  }
}

export default function Page() {
  return <CompoundInterestCalculator />
}
