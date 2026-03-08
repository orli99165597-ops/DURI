import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SearchForm } from "@/components/SearchForm";
import { YoutubeResultCard } from "@/components/YoutubeResultCard";
import { useSearchYoutube } from "@/hooks/use-youtube";
import { Rocket, Telescope, AlertCircle } from "lucide-react";

// Import images from assets
import hero1 from "@assets/Image20260308204208_1772970266900.png";
import hero2 from "@assets/Image20260308204202_1772970266901.png";

export default function Home() {
  const { mutate, data: results, isPending, error } = useSearchYoutube();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid-white/[0.02]" />
      
      <motion.div 
        style={{ y: y1, opacity }}
        className="pointer-events-none absolute -right-40 -top-40 z-0 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]"
      />
      <motion.div 
        style={{ y: y1, opacity }}
        className="pointer-events-none absolute -left-40 top-[20%] z-0 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[120px]"
      />

      {/* Floating 3D/Experimental Images */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 2, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="pointer-events-none absolute right-[5%] top-[10%] z-0 hidden lg:block"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent blur-2xl mix-blend-screen" />
          <img 
            src={hero1} 
            alt="Space aesthetic 1" 
            className="h-64 w-auto rounded-3xl object-cover opacity-60 mix-blend-luminosity grayscale contrast-125" 
          />
        </div>
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1 
        }}
        className="pointer-events-none absolute left-[2%] top-[30%] z-0 hidden lg:block"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-transparent blur-2xl mix-blend-screen" />
          <img 
            src={hero2} 
            alt="Space aesthetic 2" 
            className="h-48 w-auto rounded-3xl object-cover opacity-40 mix-blend-luminosity grayscale contrast-125" 
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pt-32">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md"
          >
            <Rocket className="h-4 w-4 text-primary" />
            <span>유튜브 알고리즘의 틈새를 찾아보세요</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-glow mb-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent">
              TubeRadar
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground md:text-xl"
          >
            구독자는 적지만 폭발적인 조회수를 기록한 보석 같은 채널들을
            <br className="hidden sm:block" /> 단 한 번의 검색으로 발굴하세요.
          </motion.p>
        </div>

        {/* Form */}
        <SearchForm onSearch={(data) => mutate(data)} isLoading={isPending} />

        {/* Results Area */}
        <div className="mt-24 min-h-[400px]">
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 p-8 text-center backdrop-blur-md"
            >
              <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
              <h3 className="mb-2 text-lg font-bold text-white">검색 오류</h3>
              <p className="text-muted-foreground">{error.message}</p>
            </motion.div>
          )}

          {isPending && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="glass-card flex flex-col overflow-hidden rounded-2xl">
                  <div className="aspect-video w-full animate-pulse bg-white/10" />
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
                        <div className="h-3 w-1/3 animate-pulse rounded bg-white/10" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                      <div className="h-4 w-4/5 animate-pulse rounded bg-white/10" />
                    </div>
                    <div className="mt-auto h-16 w-full animate-pulse rounded-xl bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isPending && results && results.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto flex max-w-lg flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                <Telescope className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">결과를 찾을 수 없습니다</h3>
              <p className="text-muted-foreground text-lg">
                조건을 변경하여 다시 검색해보세요.<br/>조회수 기준을 낮추거나 구독자 수를 늘려보세요.
              </p>
            </motion.div>
          )}

          {!isPending && results && results.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  발굴된 보석 채널 
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-sm text-primary border border-primary/30">
                    {results.length}
                  </span>
                </h2>
                <span className="text-sm text-muted-foreground">
                  조회수 비율 높은 순
                </span>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((result, idx) => (
                  <YoutubeResultCard key={`${result.videoId}-${idx}`} result={result} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 오르리 • All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
