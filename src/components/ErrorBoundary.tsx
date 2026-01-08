import React from 'react';
import { X } from 'lucide-react';

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
    // Log errors to console for debugging (can be replaced with external logging later)
    console.error('Unhandled error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg border p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 text-red-700">
              <X size={20} />
            </div>
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-500 mb-6">An unexpected error occurred. You can reload the page or return home.</p>
            {this.state.error && (
              <pre className="text-xs text-left mt-4 bg-slate-50 p-3 rounded text-red-700 whitespace-pre-wrap">{this.state.error.stack || this.state.error.message}</pre>
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
