import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">💸</span>
        <span className="brand-name">NoWayTracker</span>
      </div>
      <button 
        className="theme-toggle" 
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle theme"
      >
        {isDark ? '☀️' : '🌑'}
      </button>
    </nav>
  );
}

export default Navbar;