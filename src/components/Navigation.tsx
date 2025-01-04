import React from 'react';
import { Map, Bookmark, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'discover', icon: Map, label: 'Discover' },
    { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="bg-white shadow-lg fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors
                ${activeTab === id ? 'text-purple-600' : 'text-gray-500 hover:text-purple-500'}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}