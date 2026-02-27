import React from 'react';
import { X } from 'lucide-react';
import { trackError } from '../utils/analytics';

// For production error monitoring with Sentry:
// 1. Run: npm install @sentry/react
// 2. Import: import * as Sentry from "@sentry/react";
// 3. Initialize in main.tsx with your DSN
// 4. Uncomment Sentry.captureException() below

type State = {
  hasError: boolean;
  error?: Error | null;
};

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Track error with analytics (logged to Google Analytics)
    trackError(error, {
      componentStack: errorInfo.componentStack,
      url: window.location.href,
    });

    // For development debugging
    console.error('Unhandled error caught by ErrorBoundary:', error, errorInfo);

    // For production monitoring (requires @sentry/react installation):
    // Sentry.captureException(error, {
    //   contexts: {
    //     react: {
    //       componentStack: errorInfo.componentStack,
    //     },
    //   },
    // });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] p-6">
          <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center mb-4 text-red-700 dark:text-red-400">
              <X size={20} />
            </div>
            <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Something went wrong</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">An unexpected error occurred. You can reload the page or return home.</p>
            {/* Only show error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <pre className="text-xs text-left mt-4 bg-slate-50 p-3 rounded text-red-700 whitespace-pre-wrap overflow-auto max-h-48">
                {this.state.error.stack || this.state.error.message}
              </pre>
            )}
            <div className="flex gap-4 justify-center">
              <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-md bg-blue-600 text-white font-bold">Reload</button>
              <a href="/" className="px-4 py-2 rounded-md border border-slate-200">Home</a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
