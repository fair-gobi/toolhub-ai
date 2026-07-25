import { ToolPageSEO } from "@/components/ToolPageSEO"

import type { Metadata } from 'next'
import ProfitCalculator from './ProfitCalculator'

export const metadata: Metadata = {
  title: 'Profit Calculator - Calculate Margins Instantly',
  description: 'Free profit margin calculator for businesses. Gross profit, net profit, and margin %',
}

function OriginalPage() {
  return <ProfitCalculator />
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Profit Calculator" cat="Business" path="/business/profit-calculator" />
    </>
  )
}
