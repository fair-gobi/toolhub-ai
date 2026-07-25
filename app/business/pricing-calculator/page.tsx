import { ToolPageSEO } from "@/components/ToolPageSEO"

import type { Metadata } from 'next'
import PricingCalculator from './PricingCalculator'

export const metadata: Metadata = {
  title: 'Pricing Calculator - Set Perfect Prices',
  description: 'Calculate selling price with margin, markup, tax and profit. 25 currencies supported.',
}

function OriginalPage() {
  return <PricingCalculator />
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Pricing Calculator" cat="Business" path="/business/pricing-calculator" />
    </>
  )
}
