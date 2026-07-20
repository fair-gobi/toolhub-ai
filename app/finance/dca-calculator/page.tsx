import type { Metadata } from 'next'
import DCACalculator from './DCACalculator'

export const metadata: Metadata = {
  title: 'DCA Calculator - Dollar Cost Averaging Calculator for Stocks & Crypto | ToolHub',
  description: 'Free DCA calculator to calculate dollar-cost averaging returns. See average buy price, total investment, and profit for stocks, mutual funds, and crypto.',
  keywords: 'DCA calculator, dollar cost averaging calculator, SIP calculator crypto, average buy price calculator, DCA strategy, cost averaging calculator',
  openGraph: {
    title: 'DCA Calculator | ToolHub',
    description: 'Calculate your dollar-cost averaging returns and average purchase price.',
    type: 'website',
  }
}

export default function Page() {
  return <DCACalculator />
}

