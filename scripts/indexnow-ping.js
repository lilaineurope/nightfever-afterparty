// IndexNow ping (Lisa, 27 Oct 2026): tells Bing, Yandex, Seznam, Naver and others that pages are new or changed.
// The cloud shell can't reach api.indexnow.org, so run this AFTER a publish in the built-in browser, on the live
// https://nightfever-afterparty.com/robots.txt tab (robots.txt is not a counted visit), via javascript_tool.
// Pass the changed paths, e.g. ["/", "/episodes/s01e06", "/episodes"]; with no list it sends every sitemap URL.
// The key file is public/82d7429e91091acfe544cce5772c1ace.txt (must stay live - it proves the site is ours).
async function indexNowPing(paths) {
  const host = "nightfever-afterparty.com";
  const key = "82d7429e91091acfe544cce5772c1ace";
  let urlList = (paths || []).map((p) => `https://${host}${p}`);
  if (!urlList.length) {
    const xml = await (await fetch("/sitemap.xml", { cache: "no-store" })).text();
    urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  }
  const body = JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList });
  // text/plain keeps it a "simple" cross-origin request (no preflight); IndexNow reads the JSON body either way.
  const res = await fetch("https://api.indexnow.org/indexnow", { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain; charset=utf-8" }, body });
  return { sent: urlList.length, type: res.type };
}
