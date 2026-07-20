import type { Metadata } from 'next'
import InvoiceGenerator from './InvoiceGenerator'

export const metadata: Metadata = {
  title: 'Free Invoice Generator - Create PDF Invoices',
  description: 'Generate professional invoices instantly. Download as PDF.',
}

export default function Page() {
  return <InvoiceGenerator />
}
