'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { messageData } from '@/data/message';
import { showToast } from '@/lib/toast';
import Playlist from '@/components/Playlist';
import FlipCards from '@/components/FlipCards';
import TypewriterText from '@/components/TypewriterText';

interface MessageCardProps {
  isRevealed: boolean;
  onRestart?: () => void;
}

export default function MessageCard({
  isRevealed,
  onRestart,
}: MessageCardProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showFlipCards, setShowFlipCards] = useState(false);
  const [typewriterComplete, setTypewriterComplete] = useState({
    signature: false,
    love: false,
    stamped: false,
  });
  const [stampText, setStampText] = useState({ love: '', stamped: '' });

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setShowLetter(true);
      setTimeout(() => {
        typeText('LOVE', 'love', () =>
          setTypewriterComplete((prev) => ({ ...prev, love: true }))
        );
        setTimeout(() => {
          typeText('STAMPED', 'stamped', () =>
            setTypewriterComplete((prev) => ({ ...prev, stamped: true }))
          );
        }, 800);
      }, 1000);
    }, 400);
  };

  const typeText = (
    fullText: string,
    key: 'love' | 'stamped',
    onComplete: () => void
  ) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setStampText((prev) => ({
          ...prev,
          [key]: fullText.slice(0, currentIndex),
        }));
        currentIndex++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 100);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageData.body);
      showToast.success(messageData.toast.copied);
    } catch (err) {
      showToast.error(messageData.toast.error);
    }
  };

  if (!isRevealed) return null;

  if (showFlipCards) {
    return <FlipCards onRestart={onRestart} />;
  }

  if (showPlaylist) {
    return <Playlist onContinue={() => setShowFlipCards(true)} />;
  }

  return (
    <div className="page-container font-display relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-6">
      {/* Cute decorative emojis */}
      <motion.div
        className="absolute top-8 left-8 text-3xl"
        animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🐼
      </motion.div>

      <motion.div
        className="absolute top-20 right-12 text-3xl"
        animate={{ y: [0, 10, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        ✨
      </motion.div>

      <motion.div
        className="absolute bottom-24 left-10 text-4xl"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}
      >
        🐷
      </motion.div>

      <motion.div
        className="absolute bottom-12 right-8 text-3xl"
        animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
      >
        🎀
      </motion.div>

      <div className="w-full max-w-3xl">
        {/* Header */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-8 animate-slideDown"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center">
            <h2 className="text-primary text-2xl sm:text-3xl font-bold leading-tight">
              A Letter For You 💌
            </h2>
            <div className="text-sm text-secondary/60 mt-2">
              From the heart, just for Cheshta
            </div>
          </div>
        </motion.div>

        {/* Main Container */}
        <motion.div
          className="bg-gradient-to-br from-soft-white via-primary/5 to-accent/10 rounded-3xl p-8 sm:p-10 border-2 border-primary/20 shadow-cute-lg animate-fadeIn overflow-hidden backdrop-blur-sm"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          <AnimatePresence mode="wait">
            {!isEnvelopeOpen ? (
              <motion.div
                key="envelope-closed"
                className="flex flex-col items-center justify-center min-h-[450px] relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                {/* Cute wiggling envelope */}
                <motion.div
                  className="relative cursor-pointer mb-8"
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  onClick={handleEnvelopeClick}
                >
                  <div className="relative w-72 sm:w-96 h-56 sm:h-64 mx-auto">
                    {/* Envelope base - cute pastel pink */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-cute-lg border-2 border-primary/30"
                      animate={{ rotate: isEnvelopeOpen ? 0 : [0, -1, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                    />

                    {/* Envelope flap - wiggling effect */}
                    <motion.div
                      className="absolute top-2 left-0 right-0 h-32 bg-gradient-to-b from-primary via-primary to-accent-warm rounded-t-2xl"
                      style={{
                        clipPath: 'polygon(0px 0px, 100% 0px, 50% 100%)',
                        transformStyle: 'preserve-3d', 
                        transformOrigin: 'center top'
                      }}
                      animate={{ rotateX: isEnvelopeOpen ? -180 : 0, rotateZ: isEnvelopeOpen ? 0 : [-1, 1, -1, 0] }}
                      transition={{
                        rotateX: { duration: 0.6, ease: 'easeInOut' },
                        rotateZ: { duration: 1.5, repeat: Infinity, repeatType: 'loop' },
                      }}
                    />

                    {/* Cute heart seal */}
                    <motion.div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-accent rounded-full flex items-center justify-center text-2xl shadow-md border-2 border-accent/50 z-10">
                      💜
                      <motion.div
                        className="absolute inset-0 bg-accent rounded-full"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ zIndex: -1 }}
                      />
                    </motion.div>

                    {/* Decorative cute elements */}
                    <motion.div
                      className="absolute -top-4 -right-4 text-3xl"
                      animate={{ y: [0, -4, 0], rotate: [0, 15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💕
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-2 -left-6 text-2xl"
                      animate={{ y: [0, 4, 0], rotate: [0, -10, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: 0.5 }}
                    >
                      💖
                    </motion.div>
                  </div>

                  {/* Instructions */}
                  <motion.div className="text-center mt-8">
                    <motion.p
                      className="text-secondary text-lg font-semibold mb-3"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Click to open ✨
                    </motion.p>
                    <motion.div
                      className="inline-block px-6 py-3 bg-primary/15 rounded-full text-accent-warm font-bold border-2 border-primary/30 text-sm"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Ready? Let&apos;s begin! 💌
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="envelope-opened"
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {!showLetter && (
                  <motion.div
                    className="relative w-72 sm:w-96 h-56 sm:h-64 mx-auto mb-8"
                    initial={{ opacity: 1, rotateX: 0 }}
                    animate={{ opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-cute-lg border-2 border-primary/30" />
                    <motion.div
                      className="absolute top-2 left-0 right-0 h-32 bg-gradient-to-b from-primary via-primary to-accent-warm rounded-t-2xl"
                      style={{
                        clipPath: 'polygon(0px 0px, 100% 0px, 50% 100%)',
                        transformStyle: 'preserve-3d', 
                        transformOrigin: 'top center'
                      }}
                      initial={{ rotateX: 0 }}
                      animate={{ rotateX: -180, y: -20 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                  </motion.div>
                )}

                <AnimatePresence>
                  {showLetter && (
                    <motion.div
                      className="relative w-full"
                      initial={{ y: 40, opacity: 0, scale: 0.95 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.3 }}
                    >
                      {/* Cute notebook paper style letter */}
                      <div className="bg-soft-white rounded-2xl p-8 sm:p-10 shadow-lg border-2 border-accent/20 relative">
                        {/* Paper texture lines (optional) */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none rounded-2xl bg-repeat-y" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 2px, #FFB7B2 2px, #FFB7B2 4px)' }} />

                        {/* Cute tape corners */}
                        <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-accent-warm/40 to-accent-warm/20 rotate-45 rounded-sm shadow-sm" />
                        <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-accent-warm/40 to-accent-warm/20 -rotate-45 rounded-sm shadow-sm" />
                        <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-accent-warm/40 to-accent-warm/20 -rotate-45 rounded-sm shadow-sm" />
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-accent-warm/40 to-accent-warm/20 rotate-45 rounded-sm shadow-sm" />

                        <div className="relative z-10">
                          {/* Letter header */}
                          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary/20">
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-warm flex items-center justify-center text-lg"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                              >
                                💝
                              </motion.div>
                              <span className="text-lg font-bold text-primary">
                                My Sweetest Love
                              </span>
                            </div>
                          </div>

                          {/* Letter content */}
                          <div className="handwriting text-base sm:text-lg leading-relaxed text-secondary pb-24 pt-4">
                            <motion.div
                              className="mb-4 text-primary font-bold text-xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              My Dearest Cheshta,
                            </motion.div>
                            <motion.div
                              className="mb-8 text-justify leading-relaxed"
                              style={{ textIndent: '2rem' }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.7 }}
                            >
                              {messageData.body}
                            </motion.div>

                            {/* Signature */}
                            <motion.div
                              className="mt-12 ml-auto w-fit"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.9 }}
                            >
                              <div className="font-semibold text-primary text-lg">
                                <TypewriterText
                                  text="With all my love,"
                                  duration={2}
                                  delay={0}
                                  onComplete={() =>
                                    setTypewriterComplete((prev) => ({
                                      ...prev,
                                      signature: true,
                                    }))
                                  }
                                  showCursor={false}
                                />
                              </div>
                            </motion.div>
                          </div>

                          {/* Cute floating decoration */}
                          <motion.div
                            className="absolute bottom-6 right-6 text-accent opacity-40 text-3xl"
                            animate={{ y: [0, -6, 0], rotate: [0, 10, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                          >
                            🌸
                          </motion.div>
                        </div>
                      </div>

                      {/* Continue button */}
                      {typewriterComplete.signature && (
                        <motion.div
                          className="flex justify-center mt-8 animate-slideUp"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <motion.button
                            onClick={() => setShowPlaylist(true)}
                            className="inline-flex items-center justify-center px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-primary to-accent-warm text-white font-bold shadow-cute-lg transition-all transform focus:outline-none focus:ring-4 focus:ring-primary/30 cursor-pointer text-base sm:text-lg"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Continue to playlist"
                          >
                            Continue To See More ✨
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
