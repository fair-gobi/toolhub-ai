import { ToolPageSEO } from "@/components/ToolPageSEO"
import type { Metadata } from 'next'
import SalesForecast from './SalesForecast'

export const metadata: Metadata = {
  title: 'Sales Forecast Calculator - Predict Revenue',
  description: 'Forecast monthly sales with growth rate. 25 currencies.',
}

function OriginalPage() {
  return <SalesForecast />
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Sales Forecast" cat="Business" path="/business/sales-forecast" />
    </>
  )
}
