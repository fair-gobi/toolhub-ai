import { ToolPageSEO } from "@/components/ToolPageSEO"
import LTVCalculator from './LTVCalculator'
export const metadata = { title: 'LTV Calculator - Lifetime Value' }
function OriginalPage(){ return <LTVCalculator /> }

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="LTV Calculator" cat="Business" path="/business/ltv-calculator" />
    </>
  )
}
