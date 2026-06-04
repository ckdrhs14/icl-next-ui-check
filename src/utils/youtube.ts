const CHANNEL_ID = "UCvEaGb-ZeF2rxAL_2Trx-6g";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
}

/** /shorts/ URL 접근 시 200이면 Shorts, 리다이렉트(303)면 일반 영상 */
async function isShorts(videoId: string): Promise<boolean> {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
      redirect: "manual",
    });
    return res.status === 200;
  } catch {
    return false;
  }
}

export async function fetchLatestVideos(count = 5): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const candidates: YouTubeVideo[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null && candidates.length < count * 3) {
      const entry = match[1];
      const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "";
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";

      if (videoId) {
        candidates.push({
          id: videoId,
          title,
          published: published.slice(0, 10),
          thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        });
      }
    }

    const checks = await Promise.all(
      candidates.map(async (v) => ({ video: v, shorts: await isShorts(v.id) }))
    );

    return checks.filter((c) => !c.shorts).map((c) => c.video).slice(0, count);
  } catch {
    return [];
  }
}
