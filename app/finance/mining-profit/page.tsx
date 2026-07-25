import { ToolPageSEO } from "@/components/ToolPageSEO"
import type { Metadata } from 'next'
import MiningProfitCalculator from './MiningProfitCalculator'

export const metadata: Metadata = {
  title: 'Mining Profit Calculator - Calculate Crypto Mining Profitability | ToolHub',
  description: 'Free crypto mining profit calculator. Calculate daily, monthly, and yearly mining profit based on hashrate, power consumption, electricity cost, and pool fees.',
  keywords: 'mining profit calculator, crypto mining calculator, bitcoin mining profit, ethereum mining, hashrate calculator, mining profitability, ASIC profit',
  openGraph: {
    title: 'Mining Profit Calculator | ToolHub',
    description: 'Calculate your crypto mining profitability instantly with power costs and pool fees.',
    type: 'website',
  }
}

function OriginalPage() {
  return <MiningProfitCalculator />
}


export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Mining Profit Calculator" cat="Finance" path="/finance/mining-profit" />
    </>
  )
}
