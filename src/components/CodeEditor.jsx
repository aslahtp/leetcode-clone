import React from 'react';
import { Editor } from "@monaco-editor/react";

const CodeEditor = ({ code, setCode, isLoading, onRun, onSubmit }) => {
    return (
        <div className="card h-full flex flex-col">
            <div className="card-header">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">JavaScript</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="text-gray-500 hover:text-gray-700 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 editor-container">
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    value={code}
                    onChange={(value) => setCode(value)}
                    theme="vs-light"
                    options={{
                        minimap: { enabled: false },
                        automaticLayout: true,
                        fontSize: 14,
                        lineNumbers: "on",
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        readOnly: false,
                        cursorStyle: "line",
                        contextmenu: true,
                        mouseWheelZoom: true,
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true,
                        wordBasedSuggestions: true,
                    }}
                />
            </div>

            <div className="card-body border-t border-gray-100">
                <div className="flex gap-3">
                    <button
                        onClick={onRun}
                        disabled={isLoading}
                        className={`flex-1 btn-secondary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="spinner w-4 h-4 mr-2"></div>
                                Running...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Run
                            </div>
                        )}
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={isLoading}
                        className={`flex-1 btn-success ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="spinner w-4 h-4 mr-2"></div>
                                Submitting...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Submit
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor; 