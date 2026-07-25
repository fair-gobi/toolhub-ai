import { ToolPageSEO } from "@/components/ToolPageSEO"

import type { Metadata } from 'next'
import ProfitMarginCalculator from './ProfitMarginCalculator'

export const metadata: Metadata = {
  title: 'Profit Margin Calculator - Calculate Gross & Net Margin | ToolHub',
  description: 'Free profit margin calculator online. Calculate gross profit margin, net profit margin, markup, and selling price. Perfect for business owners and retailers.',
  keywords: 'profit margin calculator, gross margin calculator, net profit margin, markup calculator, profit percentage calculator, business calculator',
  openGraph: {
    title: 'Profit Margin Calculator | ToolHub',
    description: 'Calculate profit margins, markup, and selling prices instantly.',
    type: 'website',
  }
}

function OriginalPage() {
  return <ProfitMarginCalculator />
}


export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Profit Margin Calculator" cat="Finance" path="/finance/profit-margin" />
    </>
  )
}
