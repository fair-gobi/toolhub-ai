import type { Metadata } from 'next'
import SalaryCalculator from './SalaryCalculator'

export const metadata: Metadata = {
  title: 'Salary Calculator - Take Home Pay',
  description: 'Calculate net salary after tax, PF, and deductions. 25 currencies.',
}
export default function Page() { return <SalaryCalculator /> }
