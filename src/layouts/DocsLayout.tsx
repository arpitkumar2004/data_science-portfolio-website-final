import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Menu, X, ArrowLeft, Search, BookOpen, XCircle } from 'lucide-react';

interface DocItem {
  title: string;
  path: string;
}

interface DocCategory {
  category: string;
  items: DocItem[];
}

const DocsLayout: React.FC = () => {
  const [sidebarData, setSidebarData] = useState<DocCategory[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/docs/sidebar.json')
      .then(res => res.json())
      .then(data => setSidebarData(data))
      .catch(err => console.error('Failed to load sidebar data:', err));
  }, []);

  const filteredSidebar = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return sidebarData;
    return sidebarData
      .map(category => {
        const items = category.items.filter(item => item.title.toLowerCase().includes(q));
        return { ...category, items };
      })
      .filter(category => category.items.length > 0);
  }, [sidebarData, searchQuery]);

  const hasResults = filteredSidebar.length > 0;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-gray-900">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-slate-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle documentation menu"
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-5 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-slate-100 text-slate-900">
                  <BookOpen size={18} />
                </div>
                <h1 className="text-lg font-black tracking-tight">
                  Documentation
                </h1>
              </div>
              <a
                href="/"
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Back
              </a>
            </div>

            <div className="mt-4 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder="Search docs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search documentation"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <XCircle size={16} />
                </button>
              )}
            </div>
          </div>
          <nav className="p-5 overflow-y-auto flex-1 pb-24">
            {!hasResults && (
              <div className="text-sm text-slate-500 px-2 py-6 text-center">
                No results for “{searchQuery}”
              </div>
            )}
            {filteredSidebar.map((category, idx) => (
              <div key={idx} className="mb-6">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {category.category}
                </h2>
                <ul className="space-y-1">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg text-sm transition-all ${
                            isActive
                              ? 'bg-slate-900 text-white font-semibold'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="px-2 py-1 rounded-full bg-slate-100">Docs</span>
                <span>Updated Feb 2026</span>
              </div>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
