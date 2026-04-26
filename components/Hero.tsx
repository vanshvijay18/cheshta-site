'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenGift: () => void;
  isGiftOpened: boolean;
}

// Cute animal decorations component
const CuteAnimal = ({ emoji, delay, side }: { emoji: string; delay: number; side: 'left' | 'right' }) => {
  return (
    <motion.div
      className={`absolute text-4xl sm:text-5xl opacity-80 ${side === 'left' ? 'left-4 sm:left-8' : 'right-4 sm:right-8'}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.8, scale: 1 }}
      transition={{ delay: delay * 0.2, duration: 0.5 }}
      style={{ top: `${20 + delay * 15}%` }}
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 2.5 + delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
};

export default function Hero({ onOpenGift, isGiftOpened }: HeroProps) {
  const [particles, setParticles] = useState<
    Array<{ left: number; top: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 12 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  if (isGiftOpened) return null;

  return (
    <div className="app relative w-full min-h-screen overflow-hidden font-display">
      {/* Kawaii cute background */}
      <div className="dreamy-bg" />

      {/* Floating particles */}
      <div className="floating-particles" aria-hidden="true" suppressHydrationWarning>
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Polka dot overlay */}
      <div className="grid-overlay" aria-hidden="true" />

      {/* Cute animal decorations */}
      <div className="hidden md:block">
        <CuteAnimal emoji="🐷" delay={0} side="left" />
        <CuteAnimal emoji="🐼" delay={1} side="right" />
        <CuteAnimal emoji="🐰" delay={2} side="left" />
        <CuteAnimal emoji="🐷" delay={3} side="right" />
        <CuteAnimal emoji="🐼" delay={4} side="left" />
      </div>

      {/* Main content */}
      <div className="page-container relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10">
        {/* Decorative floating emojis - top */}
        <motion.div
          className="absolute top-12 left-8 text-3xl"
          animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          ✨
        </motion.div>

        <motion.div
          className="absolute top-16 right-10 text-4xl"
          animate={{ y: [0, 10, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          💕
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-12 text-3xl"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          🌸
        </motion.div>

        {/* Main bubble card */}
        <motion.div
          className="relative w-full max-w-2xl bg-gradient-to-br from-soft-white via-primary/5 to-accent/10 rounded-3xl shadow-cute-lg border-2 border-primary/20 p-8 sm:p-10 md:p-12 z-10 backdrop-blur-sm mx-auto"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Cute top decoration - little hearts */}
          <div className="absolute -top-6 right-8 flex gap-2" aria-hidden="true">
            <motion.div
              animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-2xl"
            >
              💜
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2.2, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-2xl"
            >
              💖
            </motion.div>
          </div>

          {/* Content */}
          <div className="text-center space-y-6 relative">
            {/* Greeting */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-black text-primary leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            >
              Hey Cheshta! 💜
            </motion.h1>

            {/* Message text */}
            <motion.div
              className="text-text text-base md:text-lg leading-relaxed relative mx-auto max-w-lg space-y-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            >
              <p>
                I know today hasn&apos;t been easy. But I need you to know something...
              </p>
              <p>
                You are the MOST important person in my life. And I wanted to show you just how much you mean to me. 💜
              </p>
              <p className="pt-2">
                <span className="font-semibold text-accent animate-pulse">
                  Click below when you&apos;re ready 💕
                </span>
              </p>
            </motion.div>

            {/* Call to action button */}
            <motion.button
              onClick={onOpenGift}
              className="mt-6 inline-flex items-center justify-center px-10 py-4 rounded-full bg-gradient-to-r from-primary to-accent-warm text-white font-bold shadow-cute-lg transition-all transform focus:outline-none focus:ring-4 focus:ring-primary/30 cursor-pointer text-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open my heart"
            >
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                Open Your Gift 💜
              </motion.span>
            </motion.button>

            {/* Bottom cute decoration */}
            <motion.div
              className="pt-4 flex justify-center gap-3 text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.span
                animate={{ y: [0, -4, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
              <motion.span
                animate={{ y: [0, -5, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
              >
                🎀
              </motion.span>
              <motion.span
                animate={{ y: [0, -3, 0], rotate: [0, 6, 0] }}
                transition={{ duration: 2.3, delay: 0.6, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer text */}
        <motion.div
          className="mt-10 text-sm text-secondary/70 text-center font-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <p>Made with love, only for you 💕</p>
          <motion.p
            className="text-xs mt-2 text-accent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Something special is waiting...
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
