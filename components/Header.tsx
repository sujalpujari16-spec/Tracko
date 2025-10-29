
import React from 'react';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, children }) => {
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";
  const activeClasses = "bg-primary-600 text-white";
  const inactiveClasses = "text-gray-600 hover:bg-primary-100 hover:text-primary-700";

  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">Tracko</h1>
          </div>
          <nav className="flex items-center space-x-2 p-1 bg-gray-100 rounded-lg">
            <NavButton onClick={() => setCurrentPage('form')} isActive={currentPage === 'form'}>
              Add Expense
            </NavButton>
            <NavButton onClick={() => setCurrentPage('list')} isActive={currentPage === 'list'}>
              View Expenses
            </NavButton>
            <NavButton onClick={() => setCurrentPage('analytics')} isActive={currentPage === 'analytics'}>
              Analytics
            </NavButton>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
