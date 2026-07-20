import type { Metadata } from 'next'
import RoiCalculator from './RoiCalculator'

export const metadata: Metadata = {
  title: 'ROI Calculator - Calculate Return on Investment | ToolHub',
  description: 'Free ROI calculator to calculate return on investment percentage. Compare investments, calculate annualized ROI, and measure profitability for business, stocks, real estate.',
  keywords: 'ROI calculator, return on investment calculator, ROI percentage, annualized ROI calculator, investment return calculator, profitability calculator',
  openGraph: {
    title: 'ROI Calculator | ToolHub',
    description: 'Calculate ROI, annualized return, and total profit on any investment.',
    type: 'website',
  }
}

export default function Page() {
  return <RoiCalculator />
}


