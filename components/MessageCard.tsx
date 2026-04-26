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
      {/* Decorative SVGs */}
      <svg
        className="absolute top-10 left-10 w-8 h-8 animate-float-slow"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2l2.39 4.84L19 8.1l-3.5 3.41.82 5.04L12 15.77 7.68 16.55l.82-5.04L5 8.1l4.61-1.26L12 2z"
          fill="#FFF7A1"
        />
      </svg>

      <svg
        className="absolute right-10 top-16 w-10 h-10 opacity-80 animate-float"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 17.58A4.42 4.42 0 0115.58 22H7.42A4.42 4.42 0 013 17.58 4.5 4.5 0 017.5 13H8a5 5 0 019.9-1.2A3.5 3.5 0 0120 17.58z"
          fill="#B0E0E6"
        />
      </svg>

      <svg
        className="absolute left-12 bottom-20 w-6 h-6 animate-float-slow"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 21s-6-4.35-8.5-6.5C1.85 12.73 3 9 6 8c2.28-.75 3.5 1 6 1s3.72-1.75 6-1c3 1 4.15 4.73 2.5 6.5C18 16.65 12 21 12 21z"
          fill="#FFD1DC"
        />
      </svg>

      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-slideDown">
          <div className="text-center">
            <h2 className="text-[#d898ff] text-lg sm:text-xl font-bold leading-tight">
              A Letter From My Heart 💜
            </h2>
            <div className="text-xs text-[#9a4c73] mt-1">
              Just for you, Cheshta
            </div>
          </div>
        </div>

        {/* Main Container */}
        <div className="bg-gradient-to-br from-white via-purple-50 to-purple-100 rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-xl animate-fadeIn overflow-hidden backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {!isEnvelopeOpen ? (
              <motion.div
                key="envelope-closed"
                className="flex flex-col items-center justify-center min-h-[400px] relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div
                  className="relative cursor-pointer transition-all duration-700 transform hover:scale-110 hover:-rotate-2"
                  onClick={handleEnvelopeClick}
                >
                  <div className="relative w-72 sm:w-80 h-52 sm:h-56 mx-auto">
                    {/* Envelope base */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg shadow-lg border-2 border-purple-300" />

                    {/* Envelope flap */}
                    <div
                      className="absolute -top-1 left-0 right-0 h-24 sm:h-28 bg-gradient-to-br from-[#d898ff] to-[#c896ff]"
                      style={{
                        clipPath: 'polygon(0px 0px, 100% 0px, 50% 100%)',
                        borderRadius: '8px 8px 0px 0px',
                      }}
                    />

                    {/* Heart seal */}
                    <div className="absolute top-10 sm:top-12 left-1/2 transform -translate-x-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-[#d898ff] rounded-full flex items-center justify-center text-white text-lg sm:text-xl shadow-md animate-pulse">
                      💜
                    </div>

                    {/* Decorative hearts */}
                    <div className="absolute -top-2 -right-2 text-purple-300 text-sm animate-bounce-slow">
                      💜
                    </div>
                    <div
                      className="absolute -bottom-2 -left-2 text-purple-300 text-xs animate-bounce-slow"
                      style={{ animationDelay: '0.5s' }}
                    >
                      💜
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-sm text-[#9a4c73] mb-2">
                      Click to open
                    </p>
                    <div className="inline-block px-4 py-2 bg-purple-50 rounded-full text-xs font-medium text-[#d898ff] border border-purple-200 animate-pulse">
                      Ready? 💜
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="envelope-opened"
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {!showLetter && (
                  <motion.div
                    className="relative w-72 sm:w-80 h-52 sm:h-56 mx-auto mb-6"
                    style={{ perspective: '1000px' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg shadow-lg border-2 border-purple-300" />
                    <motion.div
                      className="absolute -top-1 left-0 right-0 h-24 sm:h-28 bg-gradient-to-br from-[#d898ff] to-[#c896ff]"
                      style={{
                        clipPath: 'polygon(0px 0px, 100% 0px, 50% 0px)',
                        borderRadius: '8px 8px 0px 0px',
                        transformOrigin: 'top center',
                        transformStyle: 'preserve-3d',
                      }}
                      initial={{ rotateX: 0, y: 0 }}
                      animate={{ rotateX: -160, y: -20 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                  </motion.div>
                )}

                <AnimatePresence>
                  {showLetter && (
                    <motion.div
                      className="relative w-full"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    >
                      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-inner border border-pink-100 relative">
                        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-pink-50 to-transparent rounded-xl" />

                        <div
                          className="absolute -top-6 -right-6 animate-float-slow opacity-80 pointer-events-none z-30"
                          style={{ transform: 'rotate(15deg)' }}
                        >
                          <Image
                            src="/assets/letter-C680mUtz.webp"
                            alt="Love letter"
                            width={96}
                            height={96}
                            className="w-24 h-auto object-contain drop-shadow-lg"
                            unoptimized
                          />
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-100">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-[#f04299] flex items-center justify-center text-white text-sm">
                                💝
                              </div>
                              <span className="text-sm font-semibold text-[#9a4c73]">
                                My Sweetest Love
                              </span>
                            </div>
                          </div>

                          <div className="handwriting text-sm sm:text-base leading-relaxed text-[#1b0d14] pb-20 pt-6">
                            <div className="mb-4 text-[#f04299] font-medium">
                              My dearest Cheshta,
                            </div>
                            <div className="mb-6 text-justify" style={{ textIndent: '2rem' }}>
                              {messageData.body}
                            </div>
                            <div className="mt-8 ml-auto w-fit">
                              <div className="font-medium text-[#f04299]">
                                <TypewriterText
                                  text="With all my love, Always yours 💜"
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
                            </div>
                          </div>
                        </div>

                        <div className="absolute bottom-24 right-4 text-pink-300 opacity-30 text-xs animate-float-slow" style={{ animationDelay: '1s' }}>
                          💕
                        </div>
                      </div>

                      {typewriterComplete.signature && (
                        <div className="flex justify-center mt-6 animate-slideUp">
                          <button
                            onClick={() => setShowPlaylist(true)}
                            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#d898ff] to-[#c896ff] text-white font-semibold shadow-lg transition-all transform hover:scale-105 active:scale-95 hover:shadow-purple-300/50 focus:outline-none focus:ring-4 focus:ring-purple-300 cursor-pointer text-sm sm:text-base"
                            aria-label="Continue to playlist"
                          >
                            Continue To See More ✨
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
