import { ToolPageSEO } from "@/components/ToolPageSEO"
'use client'
import SloganGenerator from './SloganGenerator'

function OriginalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SloganGenerator />
    </div>
  )
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Slogan Generator" cat="Business" path="/business/slogan-generator" />
    </>
  )
}
