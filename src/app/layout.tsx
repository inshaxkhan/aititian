/**
 * Root Layout Component
 * Defines the base HTML structure and global providers
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aititian - AI-Powered Nutrition Coach',
  description: 'Get personalized diet plans, track your health metrics, and achieve your wellness goals with intelligent AI recommendations.',
  keywords: 'nutrition, diet, AI, health, wellness, meal planning, BMI, calories',
  authors: [{ name: 'Aititian Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Aititian - AI-Powered Nutrition Coach',
    description: 'Transform your health with personalized AI nutrition guidance',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aititian - AI-Powered Nutrition Coach',
    description: 'Transform your health with personalized AI nutrition guidance',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}