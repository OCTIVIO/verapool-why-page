/**
 * Cloudflare Worker — "Why miners switch to VeraPool"
 * Copy-paste into Cloudflare Dashboard → Workers & Pages → Create Worker → Edit code → Deploy
 *
 * Notes:
 * - No external assets
 * - Inline CSS
 * - Google-safe meta tags (no earnings/profit claims)
 * - CSP locks down everything to self + no external requests
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Basic health check endpoint (optional)
    if (url.pathname === "/health") {
      return new Response("ok", {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store",
        },
      });
    }

    // Serve the page
    const html = buildHtml();

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        // Cache at the edge for 1 hour; browsers 5 min (tune as you like)
        "cache-control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        // Security + crawler-friendly headers
        "x-content-type-options": "nosniff",
        "x-frame-options": "DENY",
        "referrer-policy": "strict-origin-when-cross-origin",
        "permissions-policy":
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), interest-cohort=()",
        // Strict CSP: no external scripts/styles/fonts/images
        "content-security-policy":
          "default-src 'self'; " +
          "base-uri 'none'; " +
          "form-action 'none'; " +
          "frame-ancestors 'none'; " +
          "img-src 'self' data:; " +
          "script-src 'none'; " +
          "style-src 'unsafe-inline'; " +
          "font-src 'self'; " +
          "connect-src 'none'; " +
          "object-src 'none'; " +
          "upgrade-insecure-requests",
      },
      status: 200,
    });
  },
};

function buildHtml() {
  const title = "Why miners switch to VeraPool";
  const description =
    "A concise, miner-focused overview of VeraPool’s infrastructure-first approach: stable Stratum connectivity, low-latency endpoints, transparent payout logic, and non-custodial design.";
  const canonical = "https://verapool.io/why"; // Change to your Worker domain if different
  const brand = "VeraPool";

  // Minimal structured data (Google-safe): Organization + WebPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: brand,
      url: "https://verapool.io",
    },
    about: {
      "@type": "Organization",
      name: brand,
      url: "https://verapool.io",
    },
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />

  <!-- Google-safe indexing -->
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <meta name="googlebot" content="index,follow" />

  <!-- Canonical URL -->
  <link rel="canonical" href="${escapeHtml(canonical)}" />

  <!-- Open Graph / Twitter (safe, neutral) -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:site_name" content="${escapeHtml(brand)}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />

  <!-- Optional: if you have a real favicon hosted on your main site -->
  <!-- <link rel="icon" href="https://verapool.io/favicon.ico" /> -->

  <!-- Structured data -->
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

  <style>
    :root{
      --bg:#0b1020;
      --card:#0f1731;
      --text:#e7ecff;
      --muted:#b8c2ff;
      --line:rgba(255,255,255,.12);
      --accent:#a8b3ff;
      --shadow: 0 10px 30px rgba(0,0,0,.35);
    }
    @media (prefers-color-scheme: light){
      :root{
        --bg:#f6f7ff;
        --card:#ffffff;
        --text:#111427;
        --muted:#49537a;
        --line:rgba(17,20,39,.12);
        --accent:#2f48ff;
        --shadow: 0 10px 30px rgba(17,20,39,.10);
      }
    }

    html, body { height: 100%; }
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
      background: radial-gradient(1200px 800px at 20% 10%, rgba(168,179,255,.18), transparent 60%),
                  radial-gradient(900px 600px at 90% 30%, rgba(47,72,255,.10), transparent 55%),
                  var(--bg);
      color: var(--text);
      line-height: 1.55;
    }
    a{ color: var(--accent); text-decoration: none; }
    a:hover{ text-decoration: underline; }

    .wrap{
      max-width: 980px;
      margin: 0 auto;
      padding: 42px 18px 64px;
    }
    header{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:18px;
      margin-bottom: 22px;
    }
    .brand{
      display:flex;
      flex-direction:column;
      gap:6px;
    }
    .kicker{
      color: var(--muted);
      font-size: 14px;
      letter-spacing:.04em;
      text-transform: uppercase;
    }
    h1{
      margin: 0;
      font-size: 40px;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }
    .sub{
      margin: 10px 0 0;
      max-width: 70ch;
      color: var(--muted);
      font-size: 16px;
    }
    .pillrow{
      margin-top: 14px;
      display:flex;
      flex-wrap:wrap;
      gap:8px;
    }
    .pill{
      border:1px solid var(--line);
      background: rgba(255,255,255,.03);
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 13px;
      color: var(--muted);
    }
    main{
      margin-top: 22px;
      display:grid;
      grid-template-columns: 1.4fr .9fr;
      gap: 16px;
    }
    @media (max-width: 900px){
      main{ grid-template-columns: 1fr; }
    }
    .card{
      background: rgba(255,255,255,.03);
      backdrop-filter: blur(10px);
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 18px;
      box-shadow: var(--shadow);
    }
    .card h2{
      margin: 0 0 10px;
      font-size: 18px;
      letter-spacing:-0.01em;
    }
    .card p{
      margin: 10px 0 0;
      color: var(--muted);
      font-size: 15px;
    }
    .list{
      margin: 10px 0 0;
      padding: 0;
      list-style: none;
      display:flex;
      flex-direction:column;
      gap: 12px;
    }
    .li{
      padding: 12px 12px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: rgba(255,255,255,.02);
    }
    .li strong{
      display:block;
      font-size: 15px;
      color: var(--text);
      margin-bottom: 4px;
    }
    .li span{
      display:block;
      color: var(--muted);
      font-size: 14px;
    }
    .quote{
      margin-top: 12px;
      border-left: 3px solid var(--accent);
      padding: 10px 12px;
      border-radius: 10px;
      background: rgba(168,179,255,.08);
      color: var(--muted);
      font-size: 14px;
    }
    .cta{
      margin-top: 14px;
      display:flex;
      flex-direction:column;
      gap:10px;
    }
    .btn{
      display:inline-block;
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.04);
      color: var(--text);
      font-weight: 600;
      font-size: 14px;
    }
    .btn:hover{
      background: rgba(255,255,255,.07);
      text-decoration:none;
    }
    footer{
      margin-top: 18px;
      color: var(--muted);
      font-size: 13px;
      border-top: 1px solid var(--line);
      padding-top: 14px;
    }
    code{
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.95em;
      color: var(--text);
    }
  </style>
</head>

<body>
  <div class="wrap">
    <header>
      <div class="brand">
        <div class="kicker">Infrastructure-first mining pool</div>
        <h1>Why miners switch to ${escapeHtml(brand)}</h1>
        <p class="sub">
          Miners don’t switch pools for hype — they switch for stability, predictable behavior, and transparent operations.
          This page explains what VeraPool is built to optimize for.
        </p>
        <div class="pillrow">
          <div class="pill">Stable Stratum</div>
          <div class="pill">Low-latency endpoints</div>
          <div class="pill">Transparent payout logic</div>
          <div class="pill">Non-custodial design</div>
        </div>
      </div>
    </header>

    <main>
      <section class="card">
        <h2>What miners care about</h2>
        <ul class="list">
          <li class="li">
            <strong>1) Predictable performance</strong>
            <span>Consistent share acceptance and stable behavior under vardiff targets.</span>
          </li>
          <li class="li">
            <strong>2) Low latency where it matters</strong>
            <span>Region-aware Stratum connectivity designed to reduce stale shares and keep efficiency steady.</span>
          </li>
          <li class="li">
            <strong>3) Non-custodial by design</strong>
            <span>Miners retain full control of their payout addresses. The pool does not custody funds.</span>
          </li>
          <li class="li">
            <strong>4) Clear payout logic</strong>
            <span>No fine print, no hidden deductions — stats and payout rules are meant to be understandable.</span>
          </li>
          <li class="li">
            <strong>5) Infrastructure-first operations</strong>
            <span>Monitoring, testing, and operational discipline before growth — built for long-term stability.</span>
          </li>
          <li class="li">
            <strong>6) Quiet growth</strong>
            <span>No artificial volume — growth comes from miners pointing hash and keeping it pointed.</span>
          </li>
        </ul>

        <div class="quote">
          Example miner feedback (anonymized):<br />
          “Fastest pool for my connection — pinging around <code>35–40ms</code>. Clean site, easy to use.”
        </div>
      </section>

      <aside class="card">
        <h2>Getting started (simple)</h2>
        <p>
          Point a worker. Monitor latency. Watch share acceptance. If it performs as expected, keep it pointed.
        </p>

        <div class="cta">
          <a class="btn" href="https://verapool.io" rel="nofollow">Go to VeraPool</a>
          <a class="btn" href="https://verapool.io/how-to-mine" rel="nofollow">How to connect (Stratum)</a>
          <a class="btn" href="https://verapool.io/about" rel="nofollow">About & operations</a>
        </div>

        <p style="margin-top:14px;">
          Tip: share this page privately in Discord/Telegram when someone asks “why should I switch?”
        </p>
      </aside>
    </main>

    <footer>
      <div><strong>Non-custodial note:</strong> Miners retain full control of their payout addresses at all times.</div>
      <div style="margin-top:6px;">
        Canonical: <code>${escapeHtml(canonical)}</code>
      </div>
    </footer>
  </div>
</body>
</html>`;
}

function escapeHtml(input) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
