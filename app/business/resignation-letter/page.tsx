import type { Metadata } from 'next'
import ResignationLetter from './ResignationLetter'

export const metadata: Metadata = {
  title: 'Free Resignation Letter Generator',
  description: 'Create professional resignation letters instantly. Download as PDF.',
}

export default function Page() {
  return <ResignationLetter />
}
