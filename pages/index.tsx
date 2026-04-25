'use client';

import { useState } from 'react';
import Head from 'next/head';
import Hero from '@/components/Hero';
import MessageCard from '@/components/MessageCard';
import Confetti from '@/components/Confetti';
import { Toaster } from '@/lib/toast';

export default function Home() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    setShowConfetti(true);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  const handleRestart = () => {
    setIsGiftOpened(false);
    setShowConfetti(false);
  };

  const toastOptions = {
    duration: 3000,
    style: {
      background: 'var(--primary)',
      color: 'var(--text)',
      borderRadius: '12px',
      padding: '12px 20px',
      fontSize: '14px',
    },
  };

  return (
    <>
      <Head>
        <title>For Suar🐷🩷</title>
        <meta
          name="description"
          content="A small surprise made just for you - A delightful interactive experience with love letters, music, and memories"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="romantic surprise, love letter, personal message"
        />
        <meta name="author" content="Made with 💕" />

        {/* Favicon - Multiple formats for better browser support */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="For You" />
        <meta
          property="og:description"
          content="A small surprise made just for you - A delightful interactive experience with love letters, music, and memories"
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta
          property="og:url"
          content="#"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="For You" />
        <meta
          name="twitter:description"
          content="A small surprise made just for you"
        />
        <meta name="twitter:image" content="/og-image.jpg" />

        {/* Additional SEO */}
        <meta name="theme-color" content="#fff8e7" />
        <link rel="canonical" href="#" />
      </Head>

      <main className="min-h-screen">
        {!isGiftOpened && (
          <Hero onOpenGift={handleOpenGift} isGiftOpened={isGiftOpened} />
        )}
        {isGiftOpened && (
          <MessageCard isRevealed={isGiftOpened} onRestart={handleRestart} />
        )}
        <Confetti trigger={showConfetti} onComplete={handleConfettiComplete} />

        <a
          href="https://www.zomato.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium bg-[#9a4c73] hover:bg-[#f04299] text-white transition-all cursor-pointer rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <span className="text-sm sm:text-base">☕</span>
          <span className="hidden xs:inline sm:inline">Buy me a CheeseCake</span>
        </a>

        <footer className="px-4 py-8 text-center text-text/60 relative z-50">
          <p className="text-sm">
           Just for you  —{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-xs mt-2">Made with 💕</p>
          <a
            href="https://www.zomato.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium bg-[#9a4c73]/10 hover:bg-[#9a4c73]/20 text-[#9a4c73] hover:text-[#f04299] transition-all cursor-pointer rounded-full border border-[#9a4c73]/20 hover:border-[#f04299]/40"
          >
            <span>☕</span>
            <span>Buy me a CheeseCake</span>
          </a>
        </footer>
      </main>

      <Toaster position="bottom-center" toastOptions={toastOptions} />
    </>
  );
}
