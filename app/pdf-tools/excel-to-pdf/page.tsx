"use client";
import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ExcelToPdf() {
  const [loading, setLoading] = useState(false);

  const smartSplit = (rows: any[][]) => {
    return rows.map(row => {
      // If row is 1 cell but contains spaced table data -> split it
      if (row.length === 1 && typeof row[0] === 'string') {
        const s = row[0].trim();
        // split by 2+ spaces or tab
        if (s.includes(" ") || s.includes("\t")) {
          return s.split(/\s{2,}|\t/).map(v => v.trim()).filter(Boolean);
        }
        // fallback: split by single space if looks like header
        if (s.split(" ").length >= 3) {
          // keep product name together - simple heuristic
          return s.split(/\s+/);
        }
      }
      return row;
    });
  };

  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf);
      const ws = wb.Sheets[wb.SheetNames[0]];
      let data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" }) as any[][];
      data = data.filter(r => r.join("").trim()!== "");
      data = smartSplit(data);

      if (!data.length) throw new Error("Empty");

      const doc = new jsPDF();
      const head = [data[0]];
      const body = data.slice(1);

      doc.setFontSize(12);
      doc.text(`Excel to PDF - ${file.name}`, 14, 12);

      autoTable(doc, {
        head: head,
        body: body,
        startY: 18,
        theme: 'grid',
        headStyles: { fillColor: [22, 22, 22], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        styles: { fontSize: 9, cellPadding: 3, lineColor: [0,0,0], lineWidth: 0.1 },
      });

      doc.save(file.name.replace(/\.xlsx?$/i, '') + '.pdf');
    } catch (err) {
      console.error(err);
      alert("Failed to convert. Please use a valid Excel file.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Excel to PDF (Table Fix)</h1>
      <p className="text-sm text-gray-500 mb-4">Converts properly with borders</p>
      <input type="file" accept=".xlsx,.xls" onChange={handleFile} className="border p-2 w-full rounded" />
      {loading && <p className="mt-4 text-blue-600">Generating PDF with table...</p>}
    </div>
  );
}