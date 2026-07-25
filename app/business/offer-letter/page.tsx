import { ToolPageSEO } from "@/components/ToolPageSEO"

import type { Metadata } from 'next'
import OfferLetter from './OfferLetter'

export const metadata: Metadata = {
  title: 'Free Offer Letter Generator',
  description: 'Generate professional job offer letters instantly.',
}

function OriginalPage() {
  return <OfferLetter />
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Offer Letter Generator" cat="Business" path="/business/offer-letter" />
    </>
  )
}
