const Loader = () => (
  <div 
    className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#020617]"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <div className="w-10 h-10 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin mb-4" />
    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Waking up the server... This might take 30 seconds.</p>
  </div>
);

export default Loader;