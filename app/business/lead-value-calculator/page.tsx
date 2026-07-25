import { ToolPageSEO } from "@/components/ToolPageSEO"

import LeadValue from './LeadValue'
export const metadata = { title: 'Lead Value Calculator' }
function OriginalPage(){ return <LeadValue /> }

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Lead Value Calculator" cat="Business" path="/business/lead-value-calculator" />
    </>
  )
}
