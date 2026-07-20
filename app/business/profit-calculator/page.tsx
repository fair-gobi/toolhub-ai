import type { Metadata } from 'next'
import ProfitCalculator from './ProfitCalculator'

export const metadata: Metadata = {
  title: 'Profit Calculator - Calculate Margins Instantly',
  description: 'Free profit margin calculator for businesses. Gross profit, net profit, and margin %',
}

export default function Page() {
  return <ProfitCalculator />
}
