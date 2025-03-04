import React from 'react';

export default function Header() {
    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Task Manager
                </h1>
            </div>
        </header>
    );
}
