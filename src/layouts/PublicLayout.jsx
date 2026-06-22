import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useAppContext } from '../context/AppContext';
import { defaultAboutContent } from '../constants/aboutContent';

export default function PublicLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { aboutContent } = useAppContext();
  const content = { ...defaultAboutContent, ...aboutContent };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Voice', path: '/feedback' },
    { name: 'Updates', path: '/news' },
    { name: 'About', path: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header 
        className={clsx(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b",
          scrolled ? "bg-white/80 backdrop-blur-md border-gray-200 shadow-sm py-3" : "bg-white border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <iconify-icon icon="solar:diploma-verified-linear" width="24" height="24"></iconify-icon>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-gray-900 leading-tight">{content.name}</h1>
              <p className="text-xs text-gray-500 font-medium">MP, {content.district}</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => clsx(
                  "text-sm font-medium transition-colors hover:text-blue-600 relative py-1",
                  isActive ? "text-blue-600" : "text-gray-600"
                )}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <Link 
              to="/feedback" 
              className="ml-4 bg-gray-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm"
            >
              Share Concern
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <iconify-icon icon={mobileMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} width="28" height="28"></iconify-icon>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => clsx(
                  "text-lg font-medium p-2 rounded-lg",
                  isActive ? "bg-blue-50 text-blue-600" : "text-gray-700"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-[80px]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <iconify-icon icon="solar:diploma-verified-linear" width="20" height="20"></iconify-icon>
              </div>
              <h2 className="text-xl font-semibold text-white tracking-tight">{content.name}</h2>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
              Dedicated to transparency, progress, and community-driven development in the {content.district}. Working together for a better tomorrow.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <iconify-icon icon="simple-icons:x" width="20" height="20"></iconify-icon>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <iconify-icon icon="simple-icons:facebook" width="20" height="20"></iconify-icon>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <iconify-icon icon="simple-icons:instagram" width="20" height="20"></iconify-icon>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-widest uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/projects" className="hover:text-blue-400 transition-colors">Projects & Initiatives</Link></li>
              <li><Link to="/news" className="hover:text-blue-400 transition-colors">News & Updates</Link></li>
              <li><Link to="/feedback" className="hover:text-blue-400 transition-colors">Share a Concern</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About the MP</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-widest uppercase mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <iconify-icon icon="solar:map-point-linear" class="mt-0.5 shrink-0"></iconify-icon>
                <span>124 District Office Bldg,<br/>Central City, CC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <iconify-icon icon="solar:phone-linear" class="shrink-0"></iconify-icon>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <iconify-icon icon="solar:letter-linear" class="shrink-0"></iconify-icon>
                <span>office@mcthorne.gov</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Office of {content.name}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4 flex items-center">
            <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1">
              <iconify-icon icon="solar:lock-password-linear"></iconify-icon> Admin Access
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}