import { ToolPageSEO } from "@/components/ToolPageSEO"

import type { Metadata } from 'next'
import CryptoProfitCalculator from './CryptoProfitCalculator'

export const metadata: Metadata = {
  title: 'Crypto Profit Calculator - Calculate Bitcoin & Crypto Gains | ToolHub',
  description: 'Free crypto profit calculator. Calculate profit, loss, ROI, and percentage gain on Bitcoin, Ethereum, and altcoins. Includes fees and taxes.',
  keywords: 'crypto profit calculator, bitcoin profit calculator, cryptocurrency calculator, crypto ROI calculator, BTC profit, ETH gains calculator',
  openGraph: {
    title: 'Crypto Profit Calculator | ToolHub',
    description: 'Calculate your crypto gains, losses, and ROI instantly.',
    type: 'website',
  }
}

function OriginalPage() {
  return <CryptoProfitCalculator />
}


export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Crypto Profit Calculator" cat="Finance" path="/finance/crypto-profit" />
    </>
  )
}
