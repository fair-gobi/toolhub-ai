import { ToolPageSEO } from "@/components/ToolPageSEO"

import NameGenerator from './NameGenerator'

export const metadata = {
  title: 'Business Name Generator - ToolHub',
  description: 'Generate creative business names with AI'
}

function OriginalPage() {
  return <NameGenerator />
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Business Name Generator" cat="Business" path="/business/name-generator" />
    </>
  )
}
