import { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/formatters';

function BudgetTracker({ expenses, categories }) {
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : {};
  });

  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: ''
  });

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!newBudget.category || !newBudget.amount) return;
    
    setBudgets({
      ...budgets,
      [newBudget.category]: parseFloat(newBudget.amount)
    });
    
    setNewBudget({ category: '', amount: '' });
  };

  const handleDeleteBudget = (category) => {
    const newBudgets = { ...budgets };
    delete newBudgets[category];
    setBudgets(newBudgets);
  };

  const calculateSpending = (category) => {
    return expenses
      .filter(exp => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  return (
    <div className="budget-tracker">
      <h2>Budget Tracker</h2>
      <form onSubmit={handleAddBudget} className="budget-form">
        <select
          value={newBudget.category}
          onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
        >
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          value={newBudget.amount}
          onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
          placeholder="Budget amount"
          step="0.01"
        />
        <button type="submit" className="btn-primary">Set Budget</button>
      </form>

      <div className="budget-list">
        {Object.entries(budgets).map(([category, budget]) => {
          const spent = calculateSpending(category);
          const percentage = (spent / budget) * 100;
          const isOverBudget = spent > budget;

          return (
            <div key={category} className="budget-item">
              <div className="budget-header">
                <h3>{category}</h3>
                <button 
                  onClick={() => handleDeleteBudget(category)}
                  className="btn-delete"
                  aria-label="Delete budget"
                >
                  Delete
                </button>
              </div>
              <div className="budget-details">
                <p>Budget: {formatCurrency(budget)}</p>
                <p>Spent: {formatCurrency(spent)}</p>
                <p>Remaining: {formatCurrency(budget - spent)}</p>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress ${isOverBudget ? 'over-budget' : ''}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetTracker