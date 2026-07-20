import type { Metadata } from 'next'
import BreakEvenCalculator from './BreakEvenCalculator'

export const metadata: Metadata = {
  title: 'Break-Even Calculator - Calculate BEP Units & Sales | ToolHub',
  description: 'Free break-even point calculator. Find how many units you need to sell to cover fixed and variable costs. Calculate BEP in units and revenue for your business.',
  keywords: 'break even calculator, BEP calculator, break even point, break even analysis, units to break even, break even sales calculator',
  openGraph: {
    title: 'Break-Even Calculator | ToolHub',
    description: 'Calculate your break-even point in units and sales amount instantly.',
    type: 'website',
  }
}

export default function Page() {
  return <BreakEvenCalculator />
}
