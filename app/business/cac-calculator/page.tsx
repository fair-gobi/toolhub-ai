import { ToolPageSEO } from "@/components/ToolPageSEO"

import CACCalculator from './CACCalculator'
export const metadata = { title: 'CAC Calculator - Customer Acquisition Cost' }
function OriginalPage(){ return <CACCalculator /> }

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="CAC Calculator" cat="Business" path="/business/cac-calculator" />
    </>
  )
}
