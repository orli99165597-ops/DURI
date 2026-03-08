import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Activity, Sparkles } from "lucide-react";
import { z } from "zod";
import { api } from "@shared/routes";

type SearchInput = z.infer<typeof api.youtube.search.input>;

interface Props {
  onSearch: (data: SearchInput) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: Props) {
  const [query, setQuery] = useState("AI동화");
  const [maxSubscribers, setMaxSubscribers] = useState("50000");
  const [minViews, setMinViews] = useState("50000");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate using Zod schema
    const result = api.youtube.search.input.safeParse({
      query,
      maxSubscribers: Number(maxSubscribers),
      minViews: Number(minViews),
    });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    onSearch(result.data);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="glass-card relative z-10 mx-auto w-full max-w-4xl overflow-hidden rounded-3xl p-1"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
      
      <div className="relative rounded-[22px] bg-white/[0.08] p-6 md:p-8 backdrop-blur-2xl border border-white/20">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          
          {/* Main Keyword Input */}
          <div className="md:col-span-12 lg:col-span-5">
            <label className="mb-2 flex items-center text-sm font-medium text-white/80">
              <Search className="mr-2 h-4 w-4 text-primary" />
              어떤 주제를 찾고 계신가요?
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="예: AI동화, 쇼츠 편집, 미니언 크리에이터..."
              className="glass-input w-full rounded-xl px-4 py-4 text-lg font-medium shadow-inner"
              disabled={isLoading}
            />
          </div>

          {/* Max Subs Input */}
          <div className="md:col-span-6 lg:col-span-3">
            <label className="mb-2 flex items-center text-sm font-medium text-white/80">
              <Users className="mr-2 h-4 w-4 text-secondary" />
              최대 구독자 수
            </label>
            <div className="relative">
              <input
                type="number"
                value={maxSubscribers}
                onChange={(e) => setMaxSubscribers(e.target.value)}
                className="glass-input w-full rounded-xl px-4 py-4 font-display text-lg tracking-wider"
                min="0"
                step="1"
                disabled={isLoading}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">명</span>
            </div>
          </div>

          {/* Min Views Input */}
          <div className="md:col-span-6 lg:col-span-3">
            <label className="mb-2 flex items-center text-sm font-medium text-white/80">
              <Activity className="mr-2 h-4 w-4 text-accent" />
              최소 조회수
            </label>
            <div className="relative">
              <input
                type="number"
                value={minViews}
                onChange={(e) => setMinViews(e.target.value)}
                className="glass-input w-full rounded-xl px-4 py-4 font-display text-lg tracking-wider"
                min="0"
                step="1"
                disabled={isLoading}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">회</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-12 lg:col-span-1">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex h-[60px] w-full items-center justify-center overflow-hidden rounded-xl bg-primary text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {isLoading ? (
                <div className="relative h-6 w-6 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <Sparkles className="relative h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive border border-destructive/20"
          >
            {error}
          </motion.div>
        )}
      </div>
    </motion.form>
  );
}
