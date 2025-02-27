import React, { useState } from 'react';
import { Menu, X, HelpCircle, Shield, Mail, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isPlayingGame = location.pathname.startsWith('/play/');

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              QuizWordz Atlas
            </Link>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu overlay */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 bottom-0 w-80 z-50 bg-black/95 backdrop-blur-lg shadow-xl transform transition-transform duration-200 ease-in-out">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="px-4 pt-8">
            <div className="space-y-6">
              {isPlayingGame && (
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-lg text-white p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="h-6 w-6" />
                  Return to Game
                </Link>
              )}
              
              <Link
                to="/how-to-play"
                className="flex items-center gap-3 text-lg text-white p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle className="h-6 w-6" />
                How to Play
              </Link>
              
              <Link
                to="/privacy"
                className="flex items-center gap-3 text-lg text-white p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="h-6 w-6" />
                Privacy Policy
              </Link>
              
              <Link
                to="/contact"
                className="flex items-center gap-3 text-lg text-white p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="h-6 w-6" />
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}