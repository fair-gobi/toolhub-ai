import { ToolPageSEO } from "@/components/ToolPageSEO"
import Summarizer from './Summarizer';

function OriginalPage() {
  return <Summarizer />;
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Text Summarizer" cat="Text Tools" path="/text-tools/text-summarizer" />
    </>
  )
}
