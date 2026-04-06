import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ImageSwiperProps {
  images: string;
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

export const ImageSwiper: React.FC<ImageSwiperProps> = ({
  images,
  cardWidth = 256,
  cardHeight = 352,
  className = ''
}) => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const hasTriggeredSwipe = useRef(false); // prevent double-fire

  const imageList = images.split(',').map(img => img.trim()).filter(img => img);
  const [cardOrder, setCardOrder] = useState<number[]>(() =>
    Array.from({ length: imageList.length }, (_, i) => i)
  );

  const SWIPE_THRESHOLD = 80; // increased from 50 — less accidental triggers
  const SWIPE_EXIT_DISTANCE = 320;
  const CARD_SWAP_DURATION = 300;

  const getCards = useCallback((): HTMLElement[] => {
    if (!cardStackRef.current) return [];
    return [...cardStackRef.current.querySelectorAll('.image-card')] as HTMLElement[];
  }, []);

  const getActiveCard = useCallback((): HTMLElement | null => {
    return getCards()[0] || null;
  }, [getCards]);

  const updatePositions = useCallback(() => {
    getCards().forEach((card, i) => {
      card.style.setProperty('--i', (i + 1).toString());
      card.style.setProperty('--swipe-x', '0px');
      card.style.setProperty('--swipe-rotate', '0deg');
      card.style.opacity = '1';
      card.style.transition = '';
    });
  }, [getCards]);

  const applySwipeStyles = useCallback((deltaX: number) => {
    const card = getActiveCard();
    if (!card) return;
    card.style.setProperty('--swipe-x', `${deltaX}px`);
    card.style.setProperty('--swipe-rotate', `${deltaX * 0.15}deg`);
    card.style.opacity = (1 - Math.min(Math.abs(deltaX) / 150, 1) * 0.6).toString();
  }, [getActiveCard]);

  const triggerSwipe = useCallback((deltaX: number) => {
    if (hasTriggeredSwipe.current) return;
    hasTriggeredSwipe.current = true;

    const card = getActiveCard();
    if (card) {
      const direction = Math.sign(deltaX);
      card.style.transition = `transform ${CARD_SWAP_DURATION}ms ease, opacity ${CARD_SWAP_DURATION}ms ease`;
      card.style.setProperty('--swipe-x', `${direction * SWIPE_EXIT_DISTANCE}px`);
      card.style.setProperty('--swipe-rotate', `${direction * 20}deg`);
      card.style.opacity = '0';

      setTimeout(() => {
        setCardOrder(prev => {
          if (prev.length === 0) return [];
          return [...prev.slice(1), prev[0]];
        });
        hasTriggeredSwipe.current = false;
      }, CARD_SWAP_DURATION);
    }
  }, [getActiveCard]);

  const handleStart = useCallback((clientX: number) => {
    if (isSwiping.current || hasTriggeredSwipe.current) return;
    isSwiping.current = true;
    startX.current = clientX;
    currentX.current = clientX;
    const card = getActiveCard();
    if (card) card.style.transition = 'none';
  }, [getActiveCard]);

  const handleMove = useCallback((clientX: number) => {
    if (!isSwiping.current || hasTriggeredSwipe.current) return;
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    animationFrameId.current = requestAnimationFrame(() => {
      currentX.current = clientX;
      const deltaX = currentX.current - startX.current;
      applySwipeStyles(deltaX);
      // DO NOT call handleEnd here — that was the bug causing jitter
    });
  }, [applySwipeStyles]);

  const handleEnd = useCallback(() => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    const deltaX = currentX.current - startX.current;
    const card = getActiveCard();

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      triggerSwipe(deltaX);
    } else {
      // Snap back
      if (card) {
        card.style.transition = `transform 200ms ease, opacity 200ms ease`;
        applySwipeStyles(0);
        card.style.opacity = '1';
      }
    }

    isSwiping.current = false;
    startX.current = 0;
    currentX.current = 0;
  }, [getActiveCard, triggerSwipe, applySwipeStyles]);

  useEffect(() => {
    const el = cardStackRef.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => { e.preventDefault(); handleStart(e.clientX); };
    const onMove = (e: PointerEvent) => { e.preventDefault(); handleMove(e.clientX); };
    const onUp = () => handleEnd();
    const onLeave = () => { if (isSwiping.current) handleEnd(); };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointerleave', onLeave);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [handleStart, handleMove, handleEnd]);

  useEffect(() => {
    updatePositions();
  }, [cardOrder, updatePositions]);

  return (
    <section
      className={`relative grid place-content-center select-none ${className}`}
      ref={cardStackRef}
      style={{
        width: cardWidth + 32,
        height: cardHeight + 32,
        touchAction: 'none',
        transformStyle: 'preserve-3d',
        '--card-perspective': '700px',
        '--card-z-offset': '12px',
        '--card-y-offset': '7px',
        '--card-max-z-index': imageList.length.toString(),
        '--card-swap-duration': `${CARD_SWAP_DURATION}ms`,
      } as React.CSSProperties}
    >
      {cardOrder.map((originalIndex, displayIndex) => (
        <article
          key={`${imageList[originalIndex]}-${originalIndex}`}
          className="image-card absolute cursor-grab active:cursor-grabbing
                     place-self-center border border-zinc-200 rounded-xl
                     shadow-xl overflow-hidden will-change-transform bg-white"
          style={{
            '--i': (displayIndex + 1).toString(),
            zIndex: imageList.length - displayIndex,
            width: cardWidth,
            height: cardHeight,
            transform: `perspective(var(--card-perspective))
                       translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                       translateY(calc(var(--card-y-offset) * var(--i)))
                       translateX(var(--swipe-x, 0px))
                       rotateY(var(--swipe-rotate, 0deg))`
          } as React.CSSProperties}
        >
          <img
            src={imageList[originalIndex]}
            alt={`Swiper image ${originalIndex + 1}`}
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />
        </article>
      ))}
    </section>
  );
};
