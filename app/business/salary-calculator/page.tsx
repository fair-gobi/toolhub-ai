import { ToolPageSEO } from "@/components/ToolPageSEO"

import type { Metadata } from 'next'
import SalaryCalculator from './SalaryCalculator'

export const metadata: Metadata = {
  title: 'Salary Calculator - Take Home Pay',
  description: 'Calculate net salary after tax, PF, and deductions. 25 currencies.',
}
function OriginalPage() { return <SalaryCalculator /> }

export default function PageWrapper() {
  return (
    <>
      <OriginalPage />
      <ToolPageSEO name="Salary Calculator" cat="Business" path="/business/salary-calculator" />
    </>
  )
}
