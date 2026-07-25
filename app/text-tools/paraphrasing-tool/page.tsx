import { ToolPageSEO } from "@/components/ToolPageSEO"
import Paraphraser from './Paraphraser';

function OriginalPage() {
  return <Paraphraser />;
}

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Paraphrasing Tool" cat="Text Tools" path="/text-tools/paraphrasing-tool" />
    </>
  )
}
