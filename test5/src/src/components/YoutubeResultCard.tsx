import { motion } from "framer-motion";
import { PlayCircle, Users, Eye, TrendingUp, CalendarDays } from "lucide-react";
import { z } from "zod";
import { api } from "@shared/routes";

type YoutubeResult = z.infer<typeof api.youtube.search.responses[200]>[number];

interface Props {
  result: YoutubeResult;
  index: number;
}

export function YoutubeResultCard({ result, index }: Props) {
  // Format numbers with commas
  const formatNumber = (num: number) => new Intl.NumberFormat("ko-KR").format(num);
  
  // Parse date
  const publishDate = new Date(result.publishedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl glass-card transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] hover:border-primary/30"
    >
      {/* Floating Gradient Backdrop for Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Thumbnail Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/50">
        <img
          src={result.videoThumbnailUrl}
          alt={result.videoTitle}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={`https://youtube.com/watch?v=${result.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-16 w-16 transform items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg shadow-primary/50 transition-transform duration-300 hover:scale-110"
          >
            <PlayCircle className="h-8 w-8 ml-1" />
          </a>
        </div>

        {/* Ratio Badge */}
        <div className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-1.5 text-sm font-bold text-white shadow-lg backdrop-blur-md border border-white/10 flex items-center gap-1.5 z-10">
          <TrendingUp className="h-4 w-4 text-primary" />
          조회수 <span className="text-primary">{result.ratio.toFixed(1)}배</span> 떡상
        </div>
      </div>

      {/* Content Section */}
      <div className="relative flex flex-1 flex-col p-5">
        {/* Channel Info */}
        <div className="mb-3 flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-white/20 shadow-md">
            <img 
              src={result.channelThumbnailUrl} 
              alt={result.channelTitle}
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback if avatar fails to load
                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(result.channelTitle) + "&background=random";
              }}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="truncate text-sm font-semibold text-white/90" title={result.channelTitle}>
              {result.channelTitle}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{formatNumber(result.subscriberCount)}명</span>
            </div>
          </div>
        </div>

        {/* Video Title */}
        <a 
          href={`https://youtube.com/watch?v=${result.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 line-clamp-2 text-base font-medium leading-snug text-white group-hover:text-primary transition-colors"
          title={result.videoTitle}
        >
          {result.videoTitle}
        </a>

        {/* Stats Footer */}
        <div className="mt-auto grid grid-cols-2 gap-2 rounded-xl bg-white/[0.08] p-3 border border-white/15 backdrop-blur-md">
          <div className="flex flex-col">
            <span className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
              <Eye className="h-3 w-3" /> 조회수
            </span>
            <span className="font-display text-sm font-bold text-white">
              {formatNumber(result.viewCount)}
            </span>
          </div>
          <div className="flex flex-col border-l border-white/5 pl-2">
            <span className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
              <CalendarDays className="h-3 w-3" /> 업로드
            </span>
            <span className="text-xs font-medium text-white/80">
              {publishDate}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
