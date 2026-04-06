import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface GalleryItem {
  photo: {
    url: string;
    text: string;
    pos?: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.04, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastScrollY = useRef<number>(0);
    const isUserScrolling = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Use scroll DELTA (not absolute position) — much smoother, no page-scroll conflict
    useEffect(() => {
      const handleScroll = () => {
        const delta = window.scrollY - lastScrollY.current;
        lastScrollY.current = window.scrollY;

        // Rotate proportionally to scroll speed, not scroll position
        setRotation(prev => prev + delta * 0.08);

        isUserScrolling.current = true;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isUserScrolling.current = false;
        }, 200);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    // Auto-rotate when idle
    useEffect(() => {
      const autoRotate = () => {
        if (!isUserScrolling.current) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: '3000px' }}
        {...props}
      >
        <div
          ref={containerRef}
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            // Use CSS transition only for auto-rotation smoothness, not scroll
            transition: isUserScrolling.current ? 'none' : 'transform 0.1s linear',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;

            return (
              <div
                key={item.photo.url + i}
                className="absolute w-[220px] h-[160px] md:w-[360px] md:h-[260px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) translate(-50%, -50%)`,
                  transformOrigin: '0 0',
                  left: '50%',
                  top: '50%',
                  transition: 'opacity 0.5s ease-out',
                }}
              >
                <div className="relative w-full h-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden group border border-black/5 bg-white">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/5 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
