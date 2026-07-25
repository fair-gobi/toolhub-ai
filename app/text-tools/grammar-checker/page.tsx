import { ToolPageSEO } from "@/components/ToolPageSEO"
'use client'
import GrammarChecker from './GrammarChecker'
function OriginalPage() {
  return <div className="min-h-screen bg-gray-50"><GrammarChecker /></div>
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Grammar Checker" cat="Text Tools" path="/text-tools/grammar-checker" />
    </>
  )
}
