import { useState } from 'react';
import { formatCurrency } from '../utils/formatters';

function ExpenseForm({ onAddExpense, categories }) {
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.amount || !expense.category || !expense.description) {
      setError('Please fill in all fields');
      return;
    }
    if (expense.amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    onAddExpense({
      ...expense,
      amount: parseFloat(expense.amount),
      id: Date.now()
    });
    setExpense({
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setError('');
  };

  return (
    <div className="expense-form">
      <h2>Add New Expense</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            step="0.01"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={expense.category}
            onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={expense.description}
            onChange={(e) => setExpense({ ...expense, description: e.target.value })}
            placeholder="Enter description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={expense.date}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          />
        </div>
        <button type="submit" className="btn-primary">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm