"use client"
import { useState } from "react"

const grades = { "A+":4.0, "A":3.6, "B+":3.2, "B":2.8, "C+":2.4, "C":2.0, "D+":1.6, "D":1.2, "E":0.8 }

export default function GPACalculator() {
  const [subjects, setSubjects] = useState([
    { name: "English", credit: 4, grade: "A" },
    { name: "Nepali", credit: 4, grade: "B+" },
    { name: "Math", credit: 4, grade: "A+" },
  ])

  const addSubject = () => setSubjects([...subjects, { name: "", credit: 3, grade: "A" }])
  const update = (i: number, field: string, value: any) => {
    const s = [...subjects]; (s[i] as any)[field] = value; setSubjects(s)
  }

  const totalCredits = subjects.reduce((sum, s) => sum + Number(s.credit || 0), 0)
  const totalPoints = subjects.reduce((sum, s) => sum + (grades[s.grade as keyof typeof grades] || 0) * Number(s.credit || 0), 0)
  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00"
  const percentage = (parseFloat(gpa) * 25).toFixed(1)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-3">Nepal GPA Calculator (SEE, +2, Bachelor)</h1>
      <p className="text-gray-600 mb-8 text-lg">Calculate GPA for NEB, TU, PU grading system. Supports 4.0 scale.</p>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-3 p-4 bg-gray-50 text-sm font-medium text-gray-600">
              <div className="col-span-5">Subject</div>
              <div className="col-span-3">Credit Hour</div>
              <div className="col-span-4">Grade</div>
            </div>
            {subjects.map((s, i) => (
              <div key={i} className="grid grid-cols-12 gap-3 p-3 border-t">
                <input value={s.name} onChange={e => update(i, 'name', e.target.value)} 
                  className="col-span-5 p-2 border rounded" placeholder="Subject name" />
                <input type="number" value={s.credit} onChange={e => update(i, 'credit', e.target.value)}
                  className="col-span-3 p-2 border rounded" min="1" max="6" />
                <select value={s.grade} onChange={e => update(i, 'grade', e.target.value)}
                  className="col-span-4 p-2 border rounded">
                  {Object.keys(grades).map(g => <option key={g} value={g}>{g} ({grades[g as keyof typeof grades]})</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={addSubject} className="mt-4 text-blue-600 font-medium hover:underline">+ Add Subject</button>
        </div>

        <div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-8 sticky top-6">
            <p className="text-indigo-100 text-sm">Your GPA</p>
            <div className="text-6xl font-bold mt-2">{gpa}</div>
            <div className="mt-1 text-indigo-100">out of 4.0</div>
            
            <div className="mt-6 pt-6 border-t border-white/20 space-y-2 text-sm">
              <div className="flex justify-between"><span>Total Credits</span><span className="font-semibold">{totalCredits}</span></div>
              <div className="flex justify-between"><span>Percentage</span><span className="font-semibold">{percentage}%</span></div>
              <div className="flex justify-between"><span>Division</span>
                <span className="font-semibold">
                  {parseFloat(gpa) >= 3.6 ? "Distinction" : parseFloat(gpa) >= 2.8 ? "First" : parseFloat(gpa) >= 2.0 ? "Second" : "Pass"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 prose max-w-none">
        <h2>Nepal Grading System</h2>
        <p>Used by NEB for SEE and +2, Tribhuvan University, Pokhara University. A+ = 4.0, A = 3.6, B+ = 3.2, etc.</p>
      </div>
    </div>
  )
}