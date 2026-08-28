const CRAWLER_UA =
  /Googlebot|Google-InspectionTool|bingbot|BingPreview|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebookexternalhit|LinkedInBot|Twitterbot|Applebot/i;

export function isSearchCrawler(
  userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent,
) {
  return CRAWLER_UA.test(userAgent);
}
