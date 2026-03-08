import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

// Helper function to safely parse and log Zod errors
function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw new Error(`데이터 검증 실패: ${label}`);
  }
  return result.data;
}

type SearchInput = z.infer<typeof api.youtube.search.input>;

export function useSearchYoutube() {
  return useMutation({
    mutationFn: async (data: SearchInput) => {
      // Validate input before sending
      const validatedInput = parseWithLogging(api.youtube.search.input, data, "youtube.search.input");

      const res = await fetch(api.youtube.search.path, {
        method: api.youtube.search.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedInput),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const errorData = await res.json();
          // Fallback parsing for error
          const error = api.youtube.search.responses[400].safeParse(errorData);
          throw new Error(error.success ? error.data.message : "잘못된 요청입니다.");
        }
        throw new Error("서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }

      const responseData = await res.json();
      return parseWithLogging(api.youtube.search.responses[200], responseData, "youtube.search.response");
    },
  });
}
