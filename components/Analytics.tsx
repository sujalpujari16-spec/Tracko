import React, { useMemo } from 'react';
import type { Expense } from '../types';
import Card from './Card';

interface AnalyticsProps {
  expenses: Expense[];
}

const Analytics: React.FC<AnalyticsProps> = ({ expenses }) => {
  const { byCategory, grandTotal, maxCategory } = useMemo(() => {
    const map: Record<string, number> = {};
    let total = 0;
    for (const e of expenses) {
      map[e.category] = (map[e.category] ?? 0) + e.amount;
      total += e.amount;
    }
    const max = Object.values(map).reduce((m, v) => (v > m ? v : m), 0);
    return { byCategory: map, grandTotal: total, maxCategory: max };
  }, [expenses]);

  const categories = useMemo(() => Object.keys(byCategory).sort((a, b) => byCategory[b] - byCategory[a]), [byCategory]);

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Spending Analytics</h2>
        <p className="text-gray-500 mt-1">Where your money is going by category.</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-between items-center">
        <span className="text-lg font-medium text-gray-600">Total Spent:</span>
        <span className="text-2xl font-bold text-primary-600">₹{grandTotal.toFixed(2)}</span>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No data yet</h3>
          <p className="mt-1 text-sm text-gray-500">Add some expenses to see analytics.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat) => {
            const amount = byCategory[cat];
            const pct = grandTotal > 0 ? (amount / grandTotal) * 100 : 0;
            const widthPct = maxCategory > 0 ? Math.max(4, (amount / maxCategory) * 100) : 0; // ensure visible bar
            return (
              <div key={cat} className="">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="text-sm font-medium text-gray-700">{cat}</div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">₹{amount.toFixed(2)}</span>
                    <span className="ml-2 text-gray-500">({pct.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default Analytics;
