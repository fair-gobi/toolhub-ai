import type { Metadata } from 'next'
import SalesForecast from './SalesForecast'

export const metadata: Metadata = {
  title: 'Sales Forecast Calculator - Predict Revenue',
  description: 'Forecast monthly sales with growth rate. 25 currencies.',
}

export default function Page() {
  return <SalesForecast />
}
