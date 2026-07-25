import { ToolPageSEO } from "@/components/ToolPageSEO"

import type { Metadata } from 'next'
import InvoiceGenerator from './InvoiceGenerator'

export const metadata: Metadata = {
  title: 'Free Invoice Generator - Create PDF Invoices',
  description: 'Generate professional invoices instantly. Download as PDF.',
}

function OriginalPage() {
  return <InvoiceGenerator />
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Invoice Generator" cat="Business" path="/business/invoice-generator" />
    </>
  )
}
