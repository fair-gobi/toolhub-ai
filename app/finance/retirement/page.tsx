import type { Metadata } from 'next'
import RetirementCalculator from './RetirementCalculator'

export const metadata: Metadata = {
  title: 'Retirement Calculator - Plan Your Retirement Corpus Online | ToolHub',
  description: 'Free retirement planning calculator. Calculate how much you need to save for retirement. Find your retirement corpus based on current age, expenses, and inflation.',
  keywords: 'retirement calculator, retirement planning calculator, retirement corpus calculator, pension calculator, retirement savings calculator, how much to save for retirement',
  openGraph: {
    title: 'Retirement Calculator | ToolHub',
    description: 'Plan your retirement with this free calculator. See how much you need to save monthly.',
    type: 'website',
  }
}

export default function Page() {
  return <RetirementCalculator />
}

