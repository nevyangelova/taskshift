import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {Providers} from '@/providers/ApolloProvider';
import Header from '@/components/Header';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Task Manager',
    description: 'A task management view toggle application'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                        <Header />
                        <main className="container mx-auto px-4 py-8">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
