
import { Expense } from '../types';

const escapeCsvCell = (cell: string | number) => {
  const cellStr = String(cell);
  if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
    return `"${cellStr.replace(/"/g, '""')}"`;
  }
  return cellStr;
};

export const exportToCsv = (expenses: Expense[], filename: string = 'expenses.csv'): void => {
  if (expenses.length === 0) {
    alert("No expenses to export.");
    return;
  }

  const headers = ['Date', 'Description', 'Category', 'Amount'];
  const csvRows = [headers.join(',')];

  for (const expense of expenses) {
    const row = [
      expense.date,
      expense.description,
      expense.category,
      expense.amount,
    ].map(escapeCsvCell);
    csvRows.push(row.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
