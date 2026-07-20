import type { Metadata } from 'next'
import InvestmentReturnCalculator from './InvestmentReturnCalculator'

export const metadata: Metadata = {
  title: 'Investment Return Calculator - CAGR & Annualized Return | ToolHub',
  description: 'Free investment return calculator to find CAGR, absolute return, and annualized return on your investments. Calculate ROI for stocks, mutual funds, real estate.',
  keywords: 'investment return calculator, CAGR calculator, annualized return calculator, ROI calculator, absolute return calculator, investment growth',
  openGraph: {
    title: 'Investment Return Calculator | ToolHub',
    description: 'Calculate CAGR, absolute return, and annualized return on any investment.',
    type: 'website',
  }
}

export default function Page() {
  return <InvestmentReturnCalculator />
}

