/**
 * Cloudflare Worker — "Why miners switch to VeraPool"
 * Final miner-trust pass applied
 */

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Optional health check
    if (url.pathname === "/health") {
      return new Response("ok", {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store",
        },
      });
    }

    return new Response(buildHtml(), {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control":
          "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        "x-content-type-options": "nosniff",
        "x-frame-options": "DENY",
        "referrer-policy": "strict-origin-when-cross-origin",
        "permissions-policy":
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), interest-cohort=()",
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
    });
  },
};

function buildHtml() {
  const title = "Why miners switch to VeraPool";
  const description =
    "An overview of how VeraPool is operated and what it prioritizes: infrastructure stability, low-latency Stratum connectivity, transparent payout logic, and a non-custodial design.";
  const canonical = "https://why.verapool.io";
  const brand = "VeraPool";

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

  <meta name="robots" content="index,follow" />
  <meta name="googlebot" content="index,follow" />

  <link rel="canonical" href="${escapeHtml(canonical)}" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:site_name" content="${escapeHtml(brand)}" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />

  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

  <style>
    :root{
      --bg:#0b1020;
      --card:#0f1731;
      --text:#e7ecff;
      --muted:#b8c2ff;
      --line:rgba(255,255,255,.12);
      --accent:#a8b3ff;
    }
    @media (prefers-color-scheme: light){
      :root{
        --bg:#f6f7ff;
        --card:#ffffff;
        --text:#111427;
        --muted:#49537a;
        --line:rgba(17,20,39,.12);
        --accent:#2f48ff;
      }
    }

    body{
      margin:0;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      background: var(--bg);
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
    h1{ font-size: 40px; margin: 0; }
    .sub{ color: var(--muted); max-width: 70ch; }

    .pillrow{ margin-top:14px; display:flex; gap:8px; flex-wrap:wrap; }
    .pill{
      border:1px solid var(--line);
      padding:6px 10px;
      border-radius:999px;
      font-size:13px;
      color:var(--muted);
    }

    main{
      margin-top:22px;
      display:grid;
      grid-template-columns:1.4fr .9fr;
      gap:16px;
    }
    @media (max-width:900px){ main{ grid-template-columns:1fr; } }

    .card{
      border:1px solid var(--line);
      border-radius:18px;
      padding:18px;
      background:rgba(255,255,255,.03);
    }

    .list{ list-style:none; padding:0; margin:0; }
    .li{ padding:12px; border:1px solid var(--line); border-radius:14px; margin-top:12px; }
    .li strong{ display:block; }

    footer{
      margin-top:24px;
      border-top:1px solid var(--line);
      padding-top:14px;
      font-size:13px;
      color:var(--muted);
    }
  </style>
</head>

<body>
  <div class="wrap">
    <h1>Why miners switch to ${escapeHtml(brand)}</h1>
    <p class="sub">
      Miners don’t switch pools for hype. This page outlines how VeraPool is operated and what it prioritizes.
    </p>

    <div class="pillrow">
      <div class="pill">Stable Stratum</div>
      <div class="pill">Low-latency endpoints</div>
      <div class="pill">Transparent payout logic</div>
      <div class="pill">Non-custodial design</div>
    </div>

    <main>
      <section class="card">
        <ul class="list">
          <li class="li"><strong>Predictable performance</strong>Consistent behavior under vardiff targets.</li>
          <li class="li"><strong>Latency-aware routing</strong>Designed to reduce stale shares where possible.</li>
          <li class="li"><strong>Non-custodial payouts</strong>Miners retain control of payout addresses.</li>
          <li class="li"><strong>Clear payout logic</strong>Rules intended to be understandable and auditable.</li>
          <li class="li"><strong>Infrastructure-first operations</strong>Stability prioritized before growth.</li>
        </ul>
      </section>

      <aside class="card">
        <p>
          Point a worker, observe latency and share acceptance, and decide based on performance.
        </p>
        <a href="https://verapool.io">Go to VeraPool</a><br />
        <a href="https://verapool.io/about">About & operations</a>
      </aside>
    </main>

    <footer>
      <strong>Non-custodial note:</strong>
      Miners retain full control of their payout addresses at all times.
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
