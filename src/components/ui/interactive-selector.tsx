import React, { useState, useEffect } from 'react';
import { Tent, Flame, Droplets, HeartPulse, Mountain } from 'lucide-react';

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const options = [
    {
      title: "Cultural Heritage",
      description: "Preserving our rich Naga traditions",
      image: "https://i.ibb.co/hF8HzhBK/20230114-212842.webp",
      icon: <Tent size={20} className="text-white" />,
      color: "bg-[#0c2340]",
      shape: "rounded-[8rem_2rem_8rem_2rem]",
      iconShape: "rounded-tr-3xl rounded-bl-3xl"
    },
    {
      title: "Youth Empowerment",
      description: "Fueling the next generation of leaders",
      image: "https://i.ibb.co/W48V52WY/Whats-App-Image-2026-04-05-at-7-08-26-PM.jpg",
      icon: <Flame size={20} className="text-white" />,
      color: "bg-[#8b0000]",
      shape: "rounded-[2rem_8rem_2rem_8rem]",
      iconShape: "rounded-full"
    },
    {
      title: "Infrastructure",
      description: "Modern connectivity for every village",
      image: "https://i.ibb.co/Ldxvr0h0/Whats-App-Image-2026-04-05-at-7-08-24-PM.jpg",
      icon: <Droplets size={20} className="text-white" />,
      color: "bg-[#013220]",
      shape: "rounded-full",
      iconShape: "rounded-none rotate-45"
    },
    {
      title: "Healthcare & Wellness",
      description: "Quality medical care for all citizens",
      image: "https://i.ibb.co/TzqQ1RJ/GRQNIRx-XMAAr0ne.jpg",
      icon: <HeartPulse size={20} className="text-white" />,
      color: "bg-[#b8860b]",
      shape: "rounded-[6rem_6rem_2rem_2rem]",
      iconShape: "rounded-[1.5rem_0.5rem_1.5rem_0.5rem]"
    },
    {
      title: "Sustainable Future",
      description: "Leading Nagaland with visionary growth",
      image: "https://i.ibb.co/DfwSdn26/Whats-App-Image-2026-04-05-at-7-08-25-PM.jpg",
      icon: <Mountain size={20} className="text-white" />,
      color: "bg-[#2c3e50]",
      shape: "rounded-[2rem_2rem_6rem_6rem]",
      iconShape: "rounded-2xl"
    }
  ];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) setActiveIndex(index);
  };

  // Mobile: vertical stack layout
  if (isMobile) {
    return (
      <div className="relative flex flex-col items-center py-16 bg-white font-sans text-zinc-900 overflow-hidden px-4">
        <div className="w-full max-w-xl mb-8 text-center">
          <h1 className="text-3xl font-black text-zinc-900 mb-3 tracking-tight">
            <span style={{
              background: 'linear-gradient(270deg,#f97316,#f59e0b,#ef4444,#fb923c,#fbbf24,#f97316)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'color-flow 6s ease infinite',
            }}>A Vision for Progress</span>
          </h1>
          <p className="text-base text-zinc-600 font-medium">Discover the key pillars of Kuzholuzo Azo Nienu's commitment to Nagaland's future.</p>
        </div>

        {/* Tab selector for mobile */}
        <div className="flex w-full gap-1 mb-4 overflow-x-auto pb-2">
          {options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all ${
                activeIndex === index
                  ? `${opt.color} text-white shadow-lg`
                  : 'bg-zinc-100 text-zinc-500'
              }`}
            >
              {opt.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Active card */}
        <div className="w-full rounded-3xl overflow-hidden shadow-2xl relative" style={{ height: '340px' }}>
          {options.map((option, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-700"
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: activeIndex === index ? 1 : 0,
                transform: activeIndex === index ? 'scale(1)' : 'scale(1.05)',
              }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center ${option.iconShape} ${option.color} shadow-xl border border-white/20`}>
                  {option.icon}
                </div>
                <div className="text-white">
                  <div className="font-black text-xl tracking-tight">{option.title}</div>
                  <div className="text-sm text-white/80 font-medium">{option.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop: horizontal accordion (original behaviour)
  return (
    <div className="relative flex flex-col items-center justify-center py-24 bg-white font-sans text-zinc-900 overflow-hidden">
      <div className="w-full max-w-2xl px-6 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight drop-shadow-sm animate-fadeInTop delay-300">
          <span style={{
            background: 'linear-gradient(270deg,#f97316,#f59e0b,#ef4444,#fb923c,#fbbf24,#f97316)',
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'color-flow 6s ease infinite',
          }}>A Vision for Progress</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 font-medium max-w-xl mx-auto animate-fadeInTop delay-600">
          Discover the key pillars of Kuzholuzo Azo Nienu's commitment to Nagaland's future.
        </p>
      </div>

      <div className="options flex w-full max-w-[1100px] min-w-[320px] h-[480px] md:h-[550px] mx-auto items-stretch overflow-hidden relative rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] border border-black/5 bg-zinc-100 p-2 gap-2">
        {options.map((option, index) => (
          <div
            key={index}
            className={`option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out ${activeIndex === index ? 'active' : ''} ${option.shape}`}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              minWidth: '60px',
              cursor: 'pointer',
              backgroundColor: '#18181b',
              flex: activeIndex === index ? '10 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
            }}
            onClick={() => handleOptionClick(index)}
          >
            <div
              className="shadow absolute inset-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                background: activeIndex === index
                  ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)'
              }}
            />
            <div className="label absolute left-0 right-0 bottom-8 flex items-center justify-start h-16 z-10 pointer-events-none px-6 gap-4 w-full transition-all duration-500">
              <div className={`icon min-w-[48px] max-w-[48px] h-[48px] flex items-center justify-center ${option.iconShape} ${option.color} backdrop-blur-[10px] shadow-2xl border border-white/20 flex-shrink-0 transition-all duration-500 ${activeIndex === index ? 'scale-110' : 'scale-100'}`}>
                {option.icon}
              </div>
              <div className="info text-white whitespace-pre relative overflow-hidden">
                <div className="main font-black text-xl tracking-tight transition-all duration-700 ease-in-out" style={{ opacity: activeIndex === index ? 1 : 0, transform: activeIndex === index ? 'translateX(0)' : 'translateX(50px)' }}>
                  {option.title}
                </div>
                <div className="sub text-sm text-white/90 font-medium tracking-wide transition-all duration-700 ease-in-out" style={{ opacity: activeIndex === index ? 1 : 0, transform: activeIndex === index ? 'translateX(0)' : 'translateX(50px)' }}>
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInFromTop {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInTop { opacity: 0; transform: translateY(-20px); animation: fadeInFromTop 0.8s ease-in-out forwards; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;
