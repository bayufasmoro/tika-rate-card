import React, { useState, useEffect, useRef } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';
import { Link } from 'react-router-dom';

// Corner Frame Component
const CornerFrame = ({ position = 'top-left' }: { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  const rotationMap = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  };

  return (
    <div 
      className={`absolute z-10 w-40 h-40 ${position.includes('top') ? 'top-0' : 'bottom-0'} ${position.includes('left') ? 'left-0' : 'right-0'}`}
    >
      <img 
        src="/corner-frame-gold.png" 
        alt="" 
        className={`w-full h-full object-contain ${rotationMap[position]}`}
      />      
    </div>    
  );
};

// Add this CSS for fullpage scroll
const fullpageStyles = `
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
  }
  
  .section {
    min-height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    box-sizing: border-box;
  }
  
  .section > div {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .scroll-container {
    height: 100vh;
    overflow-y: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  
  .scroll-container::-webkit-scrollbar {
    display: none;
  }
  
  .nav-dots {
    position: fixed;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 8px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(168, 85, 247, 0.1);
  }
  
  .nav-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(203, 213, 225, 0.8);
    display: block;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    border: 2px solid transparent;
  }
  
  .nav-dot::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }
  
  .nav-dot:hover {
    background-color: theme('colors.lilac.400');
    transform: scale(1.4);
    box-shadow: 0 0 0 1px white, 0 0 0 3px theme('colors.lilac.400');
  }
  
  .nav-dot.active {
    background-color: rgb(147, 51, 234);
    transform: scale(1.4);
    box-shadow: 0 0 0 2px white, 0 0 0 4px rgb(147, 51, 234);
  }
  
  .nav-dot:hover::after {
    border-color: theme('colors.lilac.200');
  }
  
  .nav-dot.active::after {
    border-color: theme('colors.lilac.300');
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    70% {
      transform: scale(1.4);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .section {
      padding: 1rem 0;
    }
    
    .section > div {
      padding: 0 1.25rem;
    }
    
    .nav-dots {
      right: 10px;
      gap: 10px;
    }
  }
`;

// Sample data
const photos = [
  { id: 1, src: '/photo-1.jpeg', title: 'Portrait Series' },
  { id: 2, src: '/photo-3.jpeg', title: 'Urban Exploration' },
  { id: 3, src: '/photo-2.jpeg', title: 'Fashion Editorial' },
];

// Define the video type
interface VideoItem {
  id: number;
  videoUrl: string;
  thumbnail: string;
  playing: boolean;
}

// Initialize videos with playing state
// Video data with direct paths to files in public directory
const videos = [
  { 
    id: 1, 
    videoUrl: '/video-1.mp4',
    thumbnail: '/video-1-preview.png'
  },
  { 
    id: 2, 
    videoUrl: '/video-2.mp4',
    thumbnail: '/video-2-preview.png'
  },
  { 
    id: 3, 
    videoUrl: '/video-3.mp4',
    thumbnail: '/video-3-preview.png'
  },
  { 
    id: 4, 
    videoUrl: '/video-4.mp4',
    thumbnail: '/video-4-preview.png'
  },
  { 
    id: 5, 
    videoUrl: '/video-5.mp4',
    thumbnail: '/video-5-preview.png'
  },
  { 
    id: 6, 
    videoUrl: '/video-6.mp4',
    thumbnail: '/video-6-preview.png'
  }
];

const socialMedia = [
  { 
    name: 'TikTok', 
    url: 'https://www.tiktok.com/@Mestikawinata18', 
    icon: '🎵', 
    handle: '@Mestikawinata18',
    embedUrl: 'https://www.tiktok.com/embed/v2/your-tiktok-video-id',
    profilePic: 'https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/1234567890abcdef1234567890abcdef~c5_100x100.jpeg?x-expires=9999999999&x-signature=example'
  },
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/laely_winata18/', 
    icon: '📸', 
    handle: '@laely_winata18',
    embedUrl: 'https://www.instagram.com/p/your-instagram-post',
    profilePic: 'https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png'
  }
];

const insights = [
  {
    title: 'Finding Your Photographic Style',
    excerpt: 'Discover how to develop a unique visual signature that sets your work apart...',
    date: 'May 15, 2023',
    readTime: '5 min read'
  },
  {
    title: 'Essential Gear for Beginner Photographers',
    excerpt: 'My top recommendations for cameras, lenses, and accessories to start your photography journey...',
    date: 'April 28, 2023',
    readTime: '7 min read'
  },
  {
    title: 'Mastering Natural Light Portraits',
    excerpt: 'Tips and techniques for creating stunning portraits using only natural light...',
    date: 'April 10, 2023',
    readTime: '6 min read'
  }
];

const collaborations = [
  { 
    company: 'Brand 1', 
    logo: '/collab-1.png',
    alt: 'Brand 1 Logo'
  },
  { 
    company: 'Brand 2', 
    logo: '/collab-2.png',
    alt: 'Brand 2 Logo'
  },
  { 
    company: 'Brand 3', 
    logo: '/collab-3.png',
    alt: 'Brand 3 Logo'
  },
  { 
    company: 'Brand 4', 
    logo: '/collab-4.png',
    alt: 'Brand 4 Logo'
  },
  { 
    company: 'Brand 5', 
    logo: '/collab-5.png',
    alt: 'Brand 5 Logo'
  },
  { 
    company: 'Brand 6', 
    logo: '/collab-6.png',
    alt: 'Brand 6 Logo'
  },
  { 
    company: 'Brand 7', 
    logo: '/collab-7.png',
    alt: 'Brand 7 Logo'
  },
  { 
    company: 'Brand 8', 
    logo: '/collab-8.png',
    alt: 'Brand 8 Logo'
  },
  { 
    company: 'Brand 9', 
    logo: '/collab-9.png',
    alt: 'Brand 9 Logo'
  },
];

const services = [
  { 
    name: 'TikTok Single Video', 
    price: 'Rp 187.000', 
    duration: '1x VT', 
    includes: [
      'Keranjang kuning',
      'Boost code 180 hari',
      'Menerima brief & revisi 1x'
    ] 
  },
  { 
    name: 'TikTok Paket 1 Bulan', 
    price: 'Rp 700.000', 
    duration: '4 video TikTok', 
    includes: [
      'Keranjang kuning',
      'Mirroring IGS + tap link',
      'Boost code 180 hari',
      'Menerima brief & revisi 2x'
    ] 
  },
  { 
    name: 'Instagram Reels', 
    price: 'Rp 100.000', 
    duration: '1x Reels', 
    includes: [
      'Reels + IGS + tap link'
    ] 
  },
];

const terms = [
  'Owning dikenakan 2x fee',
  'Boost code 365 hari dikenakan 1x fee',
  'Revisi ga lebih dari 2x',
  'Draft video dikirim dalam 3 hari after produk diterima',
  'Jangka waktu keep video tiktok selamanya',
  'Max pembayaran H+1 sesudah di video di upload',
];

const Section = ({ id, title, children, className = '', style = {} }: { 
  id: string; 
  title?: string; 
  children: React.ReactNode; 
  className?: string;
  style?: React.CSSProperties;
}) => (
  <section id={id} className={`py-16 px-4 ${className}`} style={style}>
    <div className="max-w-4xl mx-auto">
      {title && <h2 className="text-3xl font-bold text-lilac-600 mb-8 text-center">{title}</h2>}
      {/* <div className="bg-white rounded-2xl shadow-lg p-8"> */}
      <div className="p-8">
        {children}
      </div>
    </div>
  </section>
);

const Home: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [playingVideos, setPlayingVideos] = useState<{[key: number]: boolean}>({});
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sections = ['home', 'about', 'photography', 'videography', 'social', 'insights', 'collaborations', 'services', 'terms'];

  const handleVideoPlay = (videoId: number) => {
    setPlayingVideos(prev => ({...prev, [videoId]: true}));
  };

  const handleVideoPause = (videoId: number) => {
    setPlayingVideos(prev => ({...prev, [videoId]: false}));
  };

  // Handle initial audio play on user interaction
  const handleInitialPlay = async () => {
    if (!audioRef.current) return;
    
    try {
      // First try to play
      await audioRef.current.play();
      
      // If successful, hide the play button
      setShowPlayButton(false);
      
      // Set initial mute state
      audioRef.current.muted = isMuted;
    } catch (error) {
      console.log('Audio play failed, showing play button');
      setShowPlayButton(true);
    }
  };

  // Set up audio context on user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      handleInitialPlay();
      // Remove the event listener after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !audioRef.current.muted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // If user unmutes, try to play if not already playing
      if (!newMutedState && audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  useEffect(() => {
    // Add the styles to the document head
    const styleElement = document.createElement('style');
    styleElement.textContent = fullpageStyles;
    document.head.appendChild(styleElement);

    const container = containerRef.current;

    // IntersectionObserver with the scroll container as root (Safari friendly)
    const observerOptions: IntersectionObserverInit = {
      root: container ?? null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sections.findIndex(section => `#${section}` === `#${(entry.target as HTMLElement).id}`);
          if (index !== -1) setCurrentSection(index);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sectionElements = sections
      .map(section => document.getElementById(section))
      .filter((el): el is HTMLElement => el !== null);

    sectionElements.forEach(el => observer.observe(el));

    // Scroll fallback for Safari iOS (updates active dot based on closest section to viewport center)
    const handleScroll = () => {
      // Use window innerHeight since container is fixed to viewport
      const viewportCenter = window.innerHeight / 2;
      let bestIndex = 0;
      let bestDelta = Number.POSITIVE_INFINITY;
      for (let i = 0; i < sectionElements.length; i++) {
        const rect = sectionElements[i].getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const delta = Math.abs(sectionCenter - viewportCenter);
        if (delta < bestDelta) {
          bestDelta = delta;
          bestIndex = i;
        }
      }
      setCurrentSection(bestIndex);
    };

    // Attach scroll listener to the container if present
    container?.addEventListener('scroll', handleScroll, { passive: true });

    // Initial sync
    handleScroll();

    // Clean up
    return () => {
      sectionElements.forEach(el => observer.unobserve(el));
      observer.disconnect();
      container?.removeEventListener('scroll', handleScroll as EventListener);
      document.head.removeChild(styleElement);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    const element = document.getElementById(sections[index]);
    if (!container || !element) return;

    const top = element.offsetTop;
    try {
      container.scrollTo({ top, behavior: 'smooth' });
    } catch {
      container.scrollTop = top;
    }
  };
  // Add audio element (hidden)
  const audioElement = (
    <audio 
      ref={audioRef}
      src="/kuromi-lilac-music.mp3" 
      loop 
      preload="auto"
      muted={isMuted}
    />
  );

  // Initial play button (shown until first interaction)
  const playButton = showPlayButton && (
    <button 
      onClick={handleInitialPlay}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-lilac-600 text-white shadow-lg flex items-center justify-center hover:bg-lilac-700 transition-colors focus:outline-none focus:ring-2 focus:ring-lilac-500 focus:ring-opacity-50 animate-pulse"
      aria-label="Play background music"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      </svg>
    </button>
  );

  // Mute/unmute button (shown after first play)
  const muteButton = !showPlayButton && (
    <button 
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-lilac-600 text-white shadow-lg flex items-center justify-center hover:bg-lilac-700 transition-colors focus:outline-none focus:ring-2 focus:ring-lilac-500 focus:ring-opacity-50"
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
    >
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );

  return (
    <div ref={containerRef} className="scroll-container">
      {audioElement}
      {playButton}
      {muteButton}
      {/* Navigation Dots */}
      <div className="nav-dots">
        {sections.map((section, index) => (
          <div 
            key={section}
            className={`nav-dot ${currentSection === index ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
            title={`Go to ${section}`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lilac-50 to-lilac-100 relative overflow-hidden">
        {/* Floral Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/floral-bg-purple.jpg")',
            backgroundRepeat: 'repeat',
            backgroundSize: '500px',
            opacity: '0.4'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-lilac-50/80 to-lilac-100/80 z-0"></div>
        <div className="text-center px-4 max-w-4xl mx-auto relative z-10">
          <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
            {/* Profile Image */}
            <div className="relative z-10 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src="/profile-pfp.jpeg"
                // src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"                
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floral Circle Background */}
            <div className="absolute inset-0 z-10 flex items-center justify-center translate-y-1.5 -translate-x-1">
              <img               
                src="/floral-circle-lilac.png" 
                alt="" 
                className="w-full h-full max-w-[280px] max-h-[280px] object-contain"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-lilac-900 mb-6">Mestika Winata</h1>
          <p className="text-2xl text-lilac-600 mb-10 font-serif italic">Beauty Content Creator</p>
          <div className="space-x-6">
            <WhatsAppButton 
              phoneNumber="6289630047405"
              message=""
              className="inline-block bg-gradient-to-r from-lilac-600 to-lilac-400 hover:from-lilac-700 hover:to-lilac-500 text-white font-medium py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-lilac-200"
            >
              Hubungi Saya
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* About Me */}
      <Section id="about" className="section !p-0 bg-[#f9f7ff] relative">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/kuromi-skull-pattern.png")',
            backgroundRepeat: 'repeat',
            backgroundSize: '200px',
            opacity: '0.2'
          }}
        />
        {/* Top Floral Border */}
        <div 
          className="w-screen left-1/2 -translate-x-1/2 relative overflow-hidden"
          style={{ 
            height: '80px',
            marginBottom: '40px',
            zIndex: 10
          }}
        >
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: 'url(/floral-border.png)',
              backgroundPosition: '0 0',
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 800%',
              width: '200%',
              transform: 'translateX(-25%)',
              height: '100%'
            }}
          ></div>
        </div>
        
        <div className="w-full h-full flex flex-col md:flex-row relative z-0">
          {/* Image Side - Full Height */}
          <div className="w-full md:w-1/2 h-full relative">
            <img 
              src="/profile-about-me.jpeg"
              // src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
              alt="About Me" 
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-lilac-50/10 to-lilac-100/10"></div>
          </div>
          
          {/* Content Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About Me</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
              Hallo!!! Saya Mestika Winata seorang kreator Beauty Enthusiast, suka bgt eksplorasi seputar makeup, skincare, dan fashion, dan saya bisa mereview dan memasarkan produk kecantikan terbaru, follow aku untuk dapetin inspirasi dan tips seputar kecantikan yang mudah!
              </p>
              <div className="text-lg text-gray-700 mb-8">
                <p className="mb-3">Aktivitas yang aku lakukan sekarang:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Mereview produk kecantikan</li>
                  <li>Membuat konten makeup</li>
                  <li>Membuat konten info dan tips seputar makeup dan skincare</li>
                </ol>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-semibold text-lilac-500 mb-2">Equipments</h4>
                  <div className="text-gray-600">
                    <ol className="list-disc pl-6 space-y-2">
                      <li>iPhone 13</li>
                      <li>Tripod stand holder HP</li>
                      <li>Lighting equipment</li>
                    </ol>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lilac-500 mb-2">Tools</h4>
                  <div className="text-gray-600">
                    <ol className="list-disc pl-6 space-y-2">
                      <li>Capcut</li>
                      <li>Wink</li>
                      <li>Tiktok studio</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Floral Border */}
        <div 
          className="w-screen left-1/2 -translate-x-1/2 relative overflow-hidden rotate-180"
          style={{ 
            height: '80px',
            marginTop: '40px',
            zIndex: 10
          }}
        >
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: 'url(/floral-border.png)',
              backgroundPosition: '0 0',
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 800%',
              width: '200%',
              transform: 'translateX(-25%)',
              height: '100%'
            }}
          ></div>
        </div>
      </Section>

      {/* Navigation Bar */}


      {/* Photography Section */}
      {/* <Section id="photography" title="Photography" className="!px-0"> */}
        {/* <div className="w-full h-400"> */}
      <Section id="photography" title="Photography" className="!px-0 relative">
        {/* <div className="absolute inset-0 -z-10">
          <img 
            src="/purple-photo-bg.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-lilac-100/50"></div>
        </div> */}
        <div className="relative w-full min-h-screen py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-2">
              {/* First image - full width */}
              <div className="group relative overflow-hidden">
                <img 
                  src={photos[0].src} 
                  alt={photos[0].title} 
                  className="w-full h-[60vh] object-cover transform group-hover:scale-105 transition-transform duration-700 relative"
                />
                <CornerFrame position="top-left" />
                <CornerFrame position="top-right" />
                <CornerFrame position="bottom-left" />
                <CornerFrame position="bottom-right" />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">{photos[0].title}</h3>
                    <p className="text-lilac-300 text-sm">View project →</p>
                  </div>
                </div> */}
              </div>
              
              {/* Bottom two images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {photos.slice(1).map((photo) => (
                  <div key={photo.id} className="group relative overflow-hidden">
                    <img 
                      src={photo.src} 
                      alt={photo.title} 
                      className="w-full h-[40vh] object-cover transform group-hover:scale-105 transition-transform duration-700 relative"
                    />
                    <CornerFrame position="top-left" />
                    <CornerFrame position="top-right" />
                    <CornerFrame position="bottom-left" />
                    <CornerFrame position="bottom-right" />
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">{photo.title}</h3>
                        <p className="text-lilac-300 text-sm">View project →</p>
                      </div>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Add video styles to head */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .video-container video::-webkit-media-controls {
            display: none !important;
          }
          .video-container video::-webkit-media-controls-enclosure {
            display: none !important;
          }
          .video-container video::-webkit-media-controls-panel {
            display: none !important;
          }
        `
      }} />
      
      {/* Videography Section */}
      <Section id="videography" title="Videography" className="section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 px-2 md:px-0">
          {videos.map((video) => (
            <div key={video.id} className="relative">
              <div 
                className="relative overflow-hidden rounded-xl bg-black video-container group"
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.play().catch(e => console.log('Autoplay prevented:', e));
                    handleVideoPlay(parseInt(video.id));
                  }
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                    handleVideoPause(parseInt(video.id));
                  }
                }}
              >
                {/* 9:16 Aspect Ratio Container */}
                <div className="relative pt-[177.78%] w-full">
                  {/* Video Element */}
                  <video
                    id={video.id.toString()}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={video.videoUrl}
                    loop
                    muted
                    playsInline
                    preload="none"
                    poster={video.thumbnail}
                    onPlay={() => handleVideoPlay(video.id)}
                    onPause={() => handleVideoPause(video.id)}
                  />
                  
                  {/* Play Button */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                    playingVideos[video.id] ? 'opacity-0' : 'opacity-70 group-hover:opacity-100'
                  }`}>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Social Media Section */}
      <Section id="social" title="Social Media" className="section relative bg-lilac-50">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(\"/kuromi-skull-pattern.png\")',
            backgroundRepeat: 'repeat',
            backgroundSize: '200px',
            opacity: '0.2'
          }}
        />
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* TikTok Profile Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
            <div className="bg-black p-4 text-center relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white">TikTok</h3>
                <p className="text-white/90">@Mestikawinata18</p>
              </div>
            </div>
            <div className="p-6">
              <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src="/sosmed-tiktok.jpeg"
                  alt="TikTok Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <a 
                href="https://www.tiktok.com/@mestikawinata18"                 
                target="_blank" 
                rel="noopener noreferrer"                
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                Follow on TikTok
              </a>
            </div>
          </div>

          {/* Instagram Profile Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
            <div className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-4 text-center">
              <h3 className="text-2xl font-bold text-white">Instagram</h3>
              <p className="text-white/90">@laely_winata18</p>
            </div>
            <div className="p-6">
              <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src="/sosmed-ig.jpeg"
                  alt="Instagram Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <a 
                href="https://www.instagram.com/laely_winata18/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
        </div>
      </Section>

      {/* Insights Section */}
      <Section id="insights" title="Audience Insights" className="section">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Viewers Metric */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
              <img 
                src="/metric-viewers.jpeg"
                alt="Viewers Metric"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800">Viewers Metric</h3>
            <p className="text-sm text-gray-500 text-center mt-1">Last 7 days</p>
          </div>

          {/* Gender Metric */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
              <img 
                src="/metric-gender.jpeg"
                alt="Gender Metric"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800">Gender Metric</h3>
            <p className="text-sm text-gray-500 text-center mt-1">Most popular: Female</p>
          </div>

          {/* Age Metric */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
              <img 
                src="/metric-age.jpeg"
                alt="Audience Demographics"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800">Age Metric</h3>
            <p className="text-sm text-gray-500 text-center mt-1">Most popular: Around 18-34 years old</p>
          </div>

          {/* Content Performance */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
              <img 
                src="/metric-location.jpeg"
                alt="Content Performance"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800">Location Metric</h3>
            <p className="text-sm text-gray-500 text-center mt-1">Most popular: Indonesia</p>
          </div>
        </div>
      </Section>

      {/* Previous Collaborations */}
      <Section id="collaborations" title="Previous Collaborations" className="section bg-lilac-50">
      <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(\"/kuromi-skull-pattern.png\")',
            backgroundRepeat: 'repeat',
            backgroundSize: '200px',
            opacity: '0.2'
          }}
        />
        <div className="relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-4 max-w-4xl mx-auto">
            {collaborations.map((brand, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center aspect-square p-2 hover:opacity-90 transition-opacity"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.alt}
                  className="h-full w-full object-contain rounded-full"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {/* <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Dan masih banyak brand lainnya...</p>
            <button className="px-6 py-2 bg-lilac-600 text-white rounded-full hover:bg-lilac-700 transition-colors">
              Lihat Semua Kolaborasi
            </button>
          </div> */}
        </div>
        </div>
      </Section>

      {/* Services & Rates */}
      <Section id="services" title="Services & Rates" className="section">
        <div className="space-y-8">
          {services.map((service, index) => (
            <div key={index} className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                  <p className="text-gray-500">{service.duration}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="text-2xl font-bold text-lilac-600">{service.price}</span>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              {/* <button className="mt-6 w-full md:w-auto px-6 py-2 bg-lilac-600 text-white rounded-lg hover:bg-lilac-700 transition-colors">
                Pesan Sekarang
              </button> */}
            </div>
          ))}
        </div>
      </Section>

      {/* Terms & Conditions */}
      <Section id="terms" title="Terms & Conditions" className="section bg-lilac-50">
      <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(\"/kuromi-skull-pattern.png\")',
            backgroundRepeat: 'repeat',
            backgroundSize: '200px',
            opacity: '0.2'
          }}
        />
        <div className="relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="prose max-w-none">
            <ul className="space-y-3">
              {terms.map((term, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-lilac-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{term}</span>
              </li>
            ))}
          </ul>
          {/* <div className="mt-8 p-4 bg-lilac-100 rounded-lg">
            <p className="text-lilac-800">              
              <span className="font-semibold">Note:</span> Semua paket dapat disesuaikan dengan kebutuhan spesifik Anda. 
              <Link to="/contact" className="text-lilac-600 hover:underline ml-1">Hubungi saya</Link> untuk mendiskusikan proyek Anda!
            </p>
          </div> */}
          </div>  
        </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;
