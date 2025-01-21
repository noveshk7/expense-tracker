import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BudgetTracker from './components/BudgetTracker';
import './App.css';

const DEFAULT_CATEGORIES = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Other'
];

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  return (
    <div className="app">
      <Navbar />
      <main>
        <div className="container">
          <div className="left-panel">
            <ExpenseForm 
              onAddExpense={handleAddExpense}
              categories={DEFAULT_CATEGORIES}
            />
            <BudgetTracker 
              expenses={expenses}
              categories={DEFAULT_CATEGORIES}
            />
          </div>
          
          <div className="right-panel">
            <ExpenseList 
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;