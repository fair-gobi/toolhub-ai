import { ToolPageSEO } from "@/components/ToolPageSEO"
import type { Metadata } from 'next'
import QuotationGenerator from './QuotationGenerator'

export const metadata: Metadata = {
  title: 'Free Quotation Generator - Create Quotes',
  description: 'Generate professional quotations for clients instantly. Download as PDF.',
}

function OriginalPage() {
  return <QuotationGenerator />
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Quotation Generator" cat="Business" path="/business/quotation-generator" />
    </>
  )
}
