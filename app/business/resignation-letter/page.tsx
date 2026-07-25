import { ToolPageSEO } from "@/components/ToolPageSEO"

import type { Metadata } from 'next'
import ResignationLetter from './ResignationLetter'

export const metadata: Metadata = {
  title: 'Free Resignation Letter Generator',
  description: 'Create professional resignation letters instantly. Download as PDF.',
}

function OriginalPage() {
  return <ResignationLetter />
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Resignation Letter Generator" cat="Business" path="/business/resignation-letter" />
    </>
  )
}
