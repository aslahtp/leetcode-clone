import React from 'react';
import Markdown from 'react-markdown';

const MarkdownRenderer = ({ content }) => {
    // Remove the first h1 tag from the content to prevent duplicate headings
    const contentWithoutFirstH1 = content.replace(/^#\s+.*$/m, '').trim();

    return (
        <div className="markdown-body fade-in">
            <Markdown
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3 border-b border-gray-200 pb-1">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                            {children}
                        </h3>
                    ),
                    p: ({ children }) => (
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            {children}
                        </p>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="text-gray-700 leading-relaxed">
                            {children}
                        </li>
                    ),
                    strong: ({ children }) => (
                        <strong className="font-semibold text-gray-900">
                            {children}
                        </strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic text-gray-600">
                            {children}
                        </em>
                    ),
                    code: ({ children, className }) => {
                        const isInline = !className;
                        if (isInline) {
                            return (
                                <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono border">
                                    {children}
                                </code>
                            );
                        }
                        return (
                            <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono border">
                                {children}
                            </code>
                        );
                    },
                    pre: ({ children }) => (
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-700">
                            {children}
                        </pre>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 text-blue-900 italic mb-4 rounded-r">
                            {children}
                        </blockquote>
                    ),
                    hr: () => (
                        <hr className="border-gray-300 my-6" />
                    ),
                }}
            >
                {contentWithoutFirstH1}
            </Markdown>
        </div>
    );
};

export default MarkdownRenderer; 