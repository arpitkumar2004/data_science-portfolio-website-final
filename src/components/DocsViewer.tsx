import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DocsViewer: React.FC = () => {
  const location = useLocation();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoc = async () => {
      setLoading(true);
      setError(null);
      try {
        // The path in location.pathname should match the file path in public/docs
        // e.g. /docs/general/ROOT_ACCESS_WORKFLOW.md
        const response = await fetch(location.pathname);
        if (!response.ok) {
          throw new Error(`Failed to load document: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error(err);
        setError('Failed to load documentation. Please check the URL.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800">
        <h2 className="text-lg font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        <div className="px-6 py-5 border-b border-slate-200">
          <div className="text-xs font-semibold text-slate-500">Project Docs</div>
          <div className="text-xl font-black tracking-tight text-slate-900">Documentation</div>
        </div>

        <div className="px-6 py-6">
          <div className="prose prose-slate max-w-none">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1({ children }) {
                  return <h1 className="scroll-mt-24 text-3xl font-black tracking-tight">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="scroll-mt-24 text-2xl font-bold tracking-tight">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="scroll-mt-24 text-xl font-semibold tracking-tight">{children}</h3>;
                },
                a({ href, children }) {
                  return (
                    <a
                      href={href}
                      className="text-slate-900 font-semibold underline decoration-slate-300 hover:decoration-slate-900"
                    >
                      {children}
                    </a>
                  );
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-slate-900 bg-slate-50 rounded-r-lg px-4 py-2">
                      {children}
                    </blockquote>
                  );
                },
                table({ children }) {
                  return (
                    <div className="overflow-x-auto">
                      <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
                        {children}
                      </table>
                    </div>
                  );
                },
                th({ children }) {
                  return (
                    <th className="bg-slate-100 text-left px-3 py-2 text-sm font-semibold">
                      {children}
                    </th>
                  );
                },
                td({ children }) {
                  return <td className="border-t border-slate-200 px-3 py-2 text-sm">{children}</td>;
                },
                code({ inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        border: '1px solid rgba(148,163,184,0.2)'
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-900" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsViewer;
