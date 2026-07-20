import type { Metadata } from 'next'
import SavingsGoalCalculator from './SavingsGoalCalculator'

export const metadata: Metadata = {
  title: 'Savings Goal Calculator - How Much to Save Monthly | ToolHub',
  description: 'Free savings goal calculator to find how much you need to save monthly to reach your target. Plan for house, car, vacation, or emergency fund.',
  keywords: 'savings goal calculator, how much to save, monthly savings calculator, goal planning calculator, savings target calculator',
  openGraph: {
    title: 'Savings Goal Calculator | ToolHub',
    description: 'Calculate monthly savings needed to reach your financial goals.',
    type: 'website',
  }
}

export default function Page() {
  return <SavingsGoalCalculator />
}
