import { ToolPageSEO } from "@/components/ToolPageSEO"

import TitleGenerator from './TitleGenerator';

function OriginalPage() {
  return <TitleGenerator />;
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Title Generator" cat="Text Tools" path="/text-tools/title-generator" />
    </>
  )
}
