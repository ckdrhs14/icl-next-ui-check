/**
 * Instagram Graph API를 통해 최신 게시물을 가져옵니다.
 *
 * 필요 환경변수:
 *   INSTAGRAM_ACCESS_TOKEN  – 장기 액세스 토큰
 *   INSTAGRAM_USER_ID       – 비즈니스 계정 ID (선택, 기본 "me")
 *
 * 토큰이 없으면 빈 배열을 반환하므로 UI에서 fallback 처리 가능.
 */

export interface InstaPost {
  id: string;
  caption: string;
  thumbnail: string;
  permalink: string;
  timestamp: string; // YYYY-MM-DD
}

export async function fetchLatestPosts(count = 4): Promise<InstaPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  const userId = process.env.INSTAGRAM_USER_ID || "me";
  const fields = "id,caption,media_url,thumbnail_url,permalink,timestamp,media_type";
  const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${count}&access_token=${token}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();

    return (json.data ?? []).map((item: Record<string, string>) => ({
      id: item.id,
      caption: item.caption ?? "",
      thumbnail: item.thumbnail_url || item.media_url || "",
      permalink: item.permalink ?? "",
      timestamp: (item.timestamp ?? "").slice(0, 10),
    }));
  } catch {
    return [];
  }
}
