'use client';
import { useState, useEffect } from 'react';

type GradeKey = 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F';
type University = 'TU' | 'PU' | 'KU';

interface Subject {
  name: string;
  credit: number;
  grade: GradeKey;
}

interface Semester {
  id: number;
  name: string;
  subjects: Subject[];
}

const GRADE_OPTIONS: GradeKey[] = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

const UNIVERSITY_SCALES: Record<University, Record<GradeKey, number>> = {
  TU: { A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7, 'C+': 2.3, C: 2.0, 'C-': 1.7, 'D+': 1.3, D: 1.0, F: 0 },
  PU: { A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7, 'C+': 2.3, C: 2.0, 'C-': 0.0, 'D+': 1.3, D: 1.0, F: 0 },
  KU: { A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7, 'C+': 2.3, C: 2.0, 'C-': 1.7, 'D+': 1.0, D: 1.0, F: 0 }
};

export default function GPACalculator() {
  const [uni, setUni] = useState<University>('TU');
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
  setIsMounted(true);
  try {
    const savedSemesters = localStorage.getItem('cgpa_semesters');
    // ... other localStorage stuff

    if (savedSemesters) {
      const parsed = JSON.parse(savedSemesters) as Semester[];
      // Validate that grades are actually GradeKey values
      const validated = parsed.map(sem => ({
        ...sem,
        subjects: sem.subjects.map(sub => ({
          ...sub,
          grade: GRADE_OPTIONS.includes(sub.grade as GradeKey) ? sub.grade as GradeKey : 'A'
        }))
      }));
      if (Array.isArray(validated) && validated.length > 0) {
        setSemesters(validated);
        return;
      }
    }
  } catch (e) {
    console.error(e);
  }
  setSemesters([{ id: 1, name: '1st Semester', subjects: [{ name: '', credit: 3, grade: 'A' }] }]);
}, []);


  useEffect(() => {
    if (!isMounted || semesters.length === 0) return;
    try {
      localStorage.setItem('cgpa_semesters', JSON.stringify(semesters));
      localStorage.setItem('cgpa_uni', uni);
      localStorage.setItem('cgpa_name', studentName);
      localStorage.setItem('cgpa_roll', rollNumber);
    } catch (e) {
      console.error(e);
    }
  }, [semesters, uni, studentName, rollNumber, isMounted]);

  const currentGrades = UNIVERSITY_SCALES[uni];

  const calculateSemesterGPA = (subs: Subject[]) => {
  const credits = subs.reduce((sum, s) => sum + (Number(s.credit) || 0), 0);
  const points = subs.reduce((sum, s) => {
    const gradePoint = currentGrades[s.grade]; // s.grade is GradeKey here
    return sum + gradePoint * (Number(s.credit) || 0);
  }, 0);
  return {
    credits,
    gpa: credits ? (points / credits) : 0,
    points
  };
};

  let totalOverallCredits = 0;
  let totalOverallPoints = 0;

  semesters.forEach(sem => {
    const res = calculateSemesterGPA(sem.subjects);
    totalOverallCredits += res.credits;
    totalOverallPoints += res.points;
  });

  const overallCGPA = totalOverallCredits? (totalOverallPoints / totalOverallCredits) : 0;

  const getOrdinal = (n: number) => {
    if (n === 2) return 'nd';
    if (n === 3) return 'rd';
    return 'th';
  };

  const addSemester = () => {
    const nextNum = semesters.length + 1;
    setSemesters([...semesters, {
      id: Date.now(),
      name: `${nextNum}${getOrdinal(nextNum)} Semester`,
      subjects: [{ name: '', credit: 3, grade: 'A' }]
    }]);
  };

  const removeSemester = (id: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id!== id));
    }
  };

  const addSubject = (semId: number) => {
    setSemesters(semesters.map(sem =>
      sem.id === semId? {...sem, subjects: [...sem.subjects, { name: '', credit: 3, grade: 'A' }] } : sem
    ));
  };

  const removeSubject = (semId: number, subIndex: number) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semId && sem.subjects.length > 1) {
        return {...sem, subjects: sem.subjects.filter((_, j) => j!== subIndex) };
      }
      return sem;
    }));
  };

  const updateSubject = (semId: number, subIndex: number, field: keyof Subject, val: string | number) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semId) {
        const updatedSubs = [...sem.subjects];
        if (field === 'credit') updatedSubs[subIndex].credit = Number(val) || 0;
        else if (field === 'grade') updatedSubs[subIndex].grade = val as GradeKey;
        else if (field === 'name') updatedSubs[subIndex].name = String(val);
        return {...sem, subjects: updatedSubs };
      }
      return sem;
    }));
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 print:bg-white print:p-0 text-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border print:border-none print:shadow-none">

          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">CGPA & GPA Calculator</h1>
              <p className="text-gray-600 text-sm mt-1 print:hidden">Calculate multi-semester CGPA using Nepal university standards.</p>
            </div>
            <button onClick={() => window.print()} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1 print:hidden text-sm font-semibold">
              ?? Export PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 p-4 bg-gray-50 rounded-xl border border-dashed print:border-solid print:bg-white">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Student Name</label>
              <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="e.g. Ram Bahadur Thapa" className="w-full bg-white border rounded-lg px-3 py-1.5 text-sm print:border-none print:px-0 print:font-bold print:text-base" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Roll/Symbol Number</label>
              <input type="text" value={rollNumber} onChange={e => setRollNumber(e.target.value)} placeholder="e.g. 732/TR/2080" className="w-full bg-white border rounded-lg px-3 py-1.5 text-sm print:border-none print:px-0 print:font-bold print:text-base" />
            </div>
          </div>

          <div className="flex gap-2 my-4 print:hidden">
            {(['TU', 'PU', 'KU'] as University[]).map((u) => (
              <button
                key={u}
                onClick={() => setUni(u)}
                className={`px-4 py-1.5 font-semibold rounded-lg text-xs transition-colors ${
                  uni === u? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {u === 'TU'? 'Tribhuvan (TU)' : u === 'PU'? 'Pokhara (PU)' : 'Kathmandu (KU)'}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-xl my-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Cumulative Total</div>
              <div className="text-2xl font-bold mt-1 text-emerald-400">{studentName || 'Student Records'}</div>
              <div className="text-xs text-slate-300 mt-0.5">University Standard: {uni}</div>
            </div>
            <div className="flex gap-6 text-center sm:text-right">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Total Credits</div>
                <div className="text-xl font-bold">{totalOverallCredits}</div>
              </div>
              <div className="border-l border-slate-700 pl-6">
                <div className="text-xs text-slate-400 uppercase tracking-wider">Overall CGPA</div>
                <div className="text-3xl font-black text-emerald-400">{overallCGPA.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-6">
            {semesters.map((sem) => {
              const semResult = calculateSemesterGPA(sem.subjects);
              return (
                <div key={sem.id} className="p-4 rounded-xl border bg-white shadow-xs relative print:p-0 print:border-none print:break-inside-avoid">
                  <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <div>
                      <span className="font-bold text-gray-800 text-base">{sem.name}</span>
                      <div className="text-xs text-gray-500 mt-0.5">
                        GPA: <span className="font-bold text-blue-600">{semResult.gpa.toFixed(2)}</span> | Credits: {semResult.credits}
                      </div>
                    </div>
                    {semesters.length > 1 && (
                      <button onClick={() => removeSemester(sem.id)} className="text-xs text-red-500 hover:underline print:hidden">
                        Remove Semester
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 uppercase px-1 print:hidden">
                      <div className="col-span-5 md:col-span-6">Subject</div>
                      <div className="col-span-3 md:col-span-2">Credit</div>
                      <div className="col-span-3 md:col-span-2">Grade</div>
                    </div>
                    {sem.subjects.map((s, i) => (
                      <div key={i} className="grid grid-cols-12 gap-2 items-center">
                        <input
                          value={s.name}
                          onChange={e => updateSubject(sem.id, i, 'name', e.target.value)}
                          placeholder="Subject Name"
                          className="col-span-5 md:col-span-6 border rounded-lg px-3 py-1.5 text-sm print:border-b print:border-t-0 print:border-x-0 print:px-0"
                        />
                        <input
                          type="number"
                          min="0"
                          max="6"
                          value={s.credit}
                          onChange={e => updateSubject(sem.id, i, 'credit', e.target.value)}
                          className="col-span-3 md:col-span-2 border rounded-lg px-3 py-1.5 text-sm print:border-b print:border-t-0 print:border-x-0 print:px-0"
                        />
                        <select
                          value={s.grade}
                          onChange={e => updateSubject(sem.id, i, 'grade', e.target.value)}
                          className="col-span-2 md:col-span-2 border rounded-lg px-3 py-1.5 text-sm print:border-b print:border-t-0 print:border-x-0 print:px-0"
                        >
                          {GRADE_OPTIONS.map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                        {sem.subjects.length > 1 && (
                          <button
                            onClick={() => removeSubject(sem.id, i)}
                            className="col-span-1 text-red-500 hover:text-red-700 text-lg print:hidden"
                            aria-label="Remove subject"
                          >
                            
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => addSubject(sem.id)}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-semibold print:hidden"
                  >
                    + Add Subject
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={addSemester}
            className="mt-6 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors font-semibold print:hidden"
          >
            + Add New Semester
          </button>
        </div>
      </div>
    </main>
  );
}
