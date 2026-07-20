import type { Metadata } from 'next'
import FireCalculator from './FireCalculator'

export const metadata: Metadata = {
  title: 'FIRE Calculator - Financial Independence Retire Early Calculator | ToolHub',
  description: 'Free FIRE calculator to find your FIRE number, years to financial independence, and safe withdrawal rate. Plan early retirement with the 4% rule.',
  keywords: 'FIRE calculator, financial independence calculator, retire early calculator, FIRE number calculator, 4 percent rule calculator, lean fire fat fire',
  openGraph: {
    title: 'FIRE Calculator | ToolHub',
    description: 'Calculate your FIRE number and years to financial independence.',
    type: 'website',
  }
}

export default function Page() {
  return <FireCalculator />
}
