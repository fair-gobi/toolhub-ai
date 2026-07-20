import type { Metadata } from 'next'
import CashFlowCalculator from './CashFlowCalculator'

export const metadata: Metadata = {
  title: 'Cash Flow Calculator - Operating & Free Cash Flow | ToolHub',
  description: 'Free cash flow calculator for businesses. Calculate operating cash flow, free cash flow, cash runway, and monthly burn rate. Perfect for startups and SMEs.',
  keywords: 'cash flow calculator, free cash flow calculator, operating cash flow, cash runway calculator, burn rate calculator, business cash flow',
  openGraph: {
    title: 'Cash Flow Calculator | ToolHub',
    description: 'Calculate your business cash flow, burn rate, and runway in seconds.',
    type: 'website',
  }
}

export default function Page() {
  return <CashFlowCalculator />
}
