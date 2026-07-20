import type { Metadata } from 'next'
import PricingCalculator from './PricingCalculator'

export const metadata: Metadata = {
  title: 'Pricing Calculator - Set Perfect Prices',
  description: 'Calculate selling price with margin, markup, tax and profit. 25 currencies supported.',
}

export default function Page() {
  return <PricingCalculator />
}
