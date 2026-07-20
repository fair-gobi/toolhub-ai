import type { Metadata } from 'next'
import StartupRunwayCalculator from './StartupRunwayCalculator'

export const metadata: Metadata = {
  title: 'Startup Runway Calculator - Calculate Burn Rate & Months Left | ToolHub',
  description: 'Free startup runway calculator. Calculate how many months your startup can survive based on cash balance, monthly burn rate, and revenue. Plan fundraising.',
  keywords: 'startup runway calculator, burn rate calculator, runway months calculator, startup cash burn, how long will cash last, startup financial planning',
  openGraph: {
    title: 'Startup Runway Calculator | ToolHub',
    description: 'Calculate your startup runway, burn rate, and zero cash date.',
    type: 'website',
  }
}

export default function Page() {
  return <StartupRunwayCalculator />
}

