import type { Metadata } from 'next'
import InflationCalculator from './InflationCalculator'

export const metadata: Metadata = {
  title: 'Inflation Calculator - Calculate Future Value & Purchasing Power | ToolHub',
  description: 'Free inflation calculator to see how inflation affects your money. Calculate future cost of goods, purchasing power loss, and inflation-adjusted returns.',
  keywords: 'inflation calculator, purchasing power calculator, future value calculator, inflation impact, cost of living calculator, inflation adjusted calculator',
  openGraph: {
    title: 'Inflation Calculator | ToolHub',
    description: 'See how inflation erodes your money over time. Calculate future prices and purchasing power.',
    type: 'website',
  }
}

export default function Page() {
  return <InflationCalculator />
}
