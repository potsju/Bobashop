import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-dancing mb-6 text-center">
          Boba Finder
        </h1>
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for boba shops..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 rounded-full pl-12 text-gray-900 shadow-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
        </div>
      </div>
    </header>
  );
}