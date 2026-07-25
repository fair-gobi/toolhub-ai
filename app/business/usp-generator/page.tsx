import { ToolPageSEO } from "@/components/ToolPageSEO"
'use client'
import UspGenerator from './UspGenerator'
function OriginalPage() {
  return <div className="min-h-screen bg-gray-50"><UspGenerator /></div>
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="USP Generator" cat="Business" path="/business/usp-generator" />
    </>
  )
}
