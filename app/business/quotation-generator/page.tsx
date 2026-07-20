import type { Metadata } from 'next'
import QuotationGenerator from './QuotationGenerator'

export const metadata: Metadata = {
  title: 'Free Quotation Generator - Create Quotes',
  description: 'Generate professional quotations for clients instantly. Download as PDF.',
}

export default function Page() {
  return <QuotationGenerator />
}
