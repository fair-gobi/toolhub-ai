import type { Metadata } from 'next'
import OfferLetter from './OfferLetter'

export const metadata: Metadata = {
  title: 'Free Offer Letter Generator',
  description: 'Generate professional job offer letters instantly.',
}

export default function Page() {
  return <OfferLetter />
}
