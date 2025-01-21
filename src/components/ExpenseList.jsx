import { useState } from 'react';
import { formatCurrency } from '../utils/formatters';

function ExpenseList({ expenses, onDeleteExpense }) {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('');

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' 
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    }
    return sortOrder === 'desc' 
      ? b.amount - a.amount
      : a.amount - b.amount;
  });

  const filteredExpenses = filterCategory
    ? sortedExpenses.filter(exp => exp.category === filterCategory)
    : sortedExpenses;

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <div className="filters">
        <button 
          onClick={() => handleSort('date')}
          className={sortBy === 'date' ? 'active' : ''}
        >
          Sort by Date {sortBy === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
        </button>
        <button 
          onClick={() => handleSort('amount')}
          className={sortBy === 'amount' ? 'active' : ''}
        >
          Sort by Amount {sortBy === 'amount' && (sortOrder === 'desc' ? '↓' : '↑')}
        </button>
      </div>
      <div className="expense-table">
        <div className="expense-header">
          <span>Date</span>
          <span>Category</span>
          <span>Description</span>
          <span>Amount</span>
          <span>Action</span>
        </div>
        {filteredExpenses.map(expense => (
          <div key={expense.id} className="expense-row">
            <span>{new Date(expense.date).toLocaleDateString()}</span>
            <span>{expense.category}</span>
            <span>{expense.description}</span>
            <span className="amount">{formatCurrency(expense.amount)}</span>
            <span>
              <button 
                onClick={() => onDeleteExpense(expense.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList