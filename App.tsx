import React, { useState, useCallback, useEffect } from 'react';
import { Expense } from './types';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Analytics from './components/Analytics';

export type Page = 'form' | 'list' | 'analytics';

const API_URL = 'http://127.0.0.1:8001';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('form');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/expenses`);
        if (!res.ok) throw new Error('Failed to load expenses');
        const data: Expense[] = await res.json();
        setExpenses(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const addExpense = useCallback(async (expense: Omit<Expense, 'id'>) => {
    try {
      const res = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (!res.ok) throw new Error('Failed to add expense');
      const created: Expense = await res.json();
      setExpenses(prev => [created, ...prev]);
    } catch (e) {
      console.error(e);
    }
  }, []);
  
  const deleteExpense = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/expenses/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete expense');
      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {currentPage === 'form' && <ExpenseForm addExpense={addExpense} />}
        {currentPage === 'list' && <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />}
        {currentPage === 'analytics' && <Analytics expenses={expenses} />}
      </main>
    </div>
  );
};

export default App;
