import type { Metadata } from 'next'
import SipCalculator from './SipCalculator'

export const metadata: Metadata = {
  title: 'SIP Calculator - Calculate Mutual Fund SIP Returns Online | ToolHub',
  description: 'Free SIP calculator to estimate returns on your Systematic Investment Plan. Calculate future value, total invested amount, and wealth gained for mutual fund SIPs.',
  keywords: 'SIP calculator, mutual fund calculator, SIP return calculator, systematic investment plan, SIP calculator online, SIP investment calculator',
  openGraph: {
    title: 'SIP Calculator | ToolHub',
    description: 'Calculate how much wealth you can create with monthly SIP investments.',
    type: 'website',
  }
}
export default function Page() {
  return <SipCalculator />
}
