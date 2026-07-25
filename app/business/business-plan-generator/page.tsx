import { ToolPageSEO } from "@/components/ToolPageSEO"
'use client'
import BusinessPlanGenerator from './BusinessPlanGenerator'
function OriginalPage() {
  return <div className="min-h-screen bg-gray-50"><BusinessPlanGenerator /></div>
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Business Plan Generator" cat="Business" path="/business/business-plan-generator" />
    </>
  )
}
