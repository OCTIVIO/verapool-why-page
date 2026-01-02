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

    if (url.pathname === "/sitemap.xml") {
      return new Response(buildSitemapXml(), {
        headers: {
          "content-type": "application/xml; charset=utf-8",
          "cache-control":
            "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    if (url.pathname === "/robots.txt") {
      return new Response(buildRobotsTxt(), {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control":
            "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    if (url.pathname === "/blog/how-to-choose-a-bitcoin-mining-pool-2026") {
      return new Response(buildBlogHtml(), {
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
    }

    if (url.pathname === "/") {
      return new Response(buildHomeHtml(), {
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
    }

    return new Response("Not found", { status: 404 });
  },
};

function buildHomeHtml() {
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
      <br />
      <a href="/blog/how-to-choose-a-bitcoin-mining-pool-2026">
        Read: How to Choose a Bitcoin Mining Pool (2026 Guide)
      </a>
    </footer>
  </div>
</body>
</html>`;
}

function buildBlogHtml() {
  const title = "How to Choose a Bitcoin Mining Pool (2026 Guide)";
  const description =
    "A practical 2026 guide to choosing a Bitcoin mining pool: custody models, payout methods, latency, reliability, privacy, and transparency—what to check before you connect.";
  const canonical =
    "https://why.verapool.io/blog/how-to-choose-a-bitcoin-mining-pool-2026";
  const updatedDate = new Date().toISOString().slice(0, 10);

  const faqItems = [
    {
      question: "Which payout method is best for steady income?",
      answer:
        "PPS or FPPS can provide steadier payouts but typically come with higher fees or stricter terms. PPLNS may be lower fee but has more variance.",
    },
    {
      question: "How can I test pool latency before switching?",
      answer:
        "Check the pool's published stratum endpoints, ping or trace them from your location, and compare results against your current pool.",
    },
    {
      question: "Does non-custodial mean no pool account?",
      answer:
        "Not necessarily. Non-custodial means payouts go directly to your wallet, but some pools still offer dashboards or accounts for monitoring.",
    },
    {
      question: "What signals show a pool is reliable?",
      answer:
        "Look for incident history, uptime transparency, clear documentation, and communication when issues occur.",
    },
    {
      question: "Is minimal data collection compatible with compliance?",
      answer:
        "Yes. Pools can minimize data collection while still meeting regional requirements and clearly explaining any necessary verification steps.",
    },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: updatedDate,
    dateModified: updatedDate,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: "Verapool Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Verapool",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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

  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:site_name" content="Verapool" />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />

  <script type="application/ld+json">${JSON.stringify(articleJsonLd)}</script>
  <script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>

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
    h1{ font-size: 40px; margin: 0 0 8px; }
    h2{ margin-top: 28px; }
    .sub{ color: var(--muted); max-width: 70ch; }

    .toc{
      border:1px solid var(--line);
      border-radius:16px;
      padding:14px 16px;
      background:rgba(255,255,255,.03);
      margin: 18px 0 22px;
    }
    .toc ul{ margin:10px 0 0; padding-left:18px; }

    table{
      width:100%;
      border-collapse: collapse;
      border:1px solid var(--line);
      margin-top: 12px;
    }
    th, td{
      padding:10px 12px;
      border-bottom:1px solid var(--line);
      text-align:left;
      font-size:14px;
    }
    th{ background: rgba(255,255,255,.06); }

    details{
      border:1px solid var(--line);
      border-radius:12px;
      padding:10px 12px;
      margin-top:10px;
      background:rgba(255,255,255,.03);
    }
    summary{ cursor:pointer; font-weight:600; }

    footer{
      margin-top:28px;
      border-top:1px solid var(--line);
      padding-top:16px;
      font-size:13px;
      color:var(--muted);
    }
  </style>
</head>

<body>
  <article class="wrap">
    <header>
      <p class="sub">Why VeraPool</p>
      <a class="sub" href="/">Back to Why VeraPool</a>
      <h1>${escapeHtml(title)}</h1>
      <p class="sub">Last updated ${escapeHtml(updatedDate)}</p>
    </header>

    <section class="sub">
      <p>
        Choosing a Bitcoin mining pool in 2026 is less about chasing the lowest fee and more about understanding how a pool handles
        custody, reliability, and communication. The right choice depends on your risk tolerance and the scale of your operation.
      </p>
      <p>
        This guide highlights the key factors that matter most: payout mechanics, infrastructure resilience, latency, and privacy.
        Use it as a checklist before you point your ASICs to a new endpoint.
      </p>
      <p>
        The goal is simple: align your pool choice with how you actually run mining hardware, not just how the pool markets itself.
      </p>
      <p>
        Who this guide is for: operators and teams comparing pools for real-world uptime, predictable payouts, and clear operational
        practices.
      </p>
    </section>

    <nav class="toc">
      <strong>Table of contents</strong>
      <ul>
        <li><a href="#custody">Custodial vs Non-Custodial Pools</a></li>
        <li><a href="#payouts">Payout Methods and Variance</a></li>
        <li><a href="#infra">Infrastructure and Reliability</a></li>
        <li><a href="#latency">Latency and Geographic Coverage</a></li>
        <li><a href="#privacy">Data Collection and Privacy</a></li>
        <li><a href="#transparency">Transparency and Operator Trust</a></li>
        <li><a href="#fees">Fees (Last, Not First)</a></li>
        <li><a href="#disclosure">Where Verapool Fits (Disclosure)</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
    </nav>

    <section id="custody">
      <h2 id="custody">Custodial vs Non-Custodial Pools</h2>
      <p class="sub">
        Custodial pools hold balances internally and pay miners after thresholds or schedules. This can simplify accounting but
        introduces counterparty risk: the pool controls timing and custody of funds until payout.
      </p>
      <p class="sub">
        Non-custodial pools route rewards directly to miner wallets. This reduces custody risk and can improve transparency, but it
        may change how payouts are tracked. Choose the model that matches your risk profile.
      </p>
    </section>

    <section id="payouts">
      <h2 id="payouts">Payout Methods and Variance</h2>
      <p class="sub">
        Payout method affects variance, fees, and the predictability of revenue. Understand how each method behaves under different
        hashrate conditions.
      </p>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>How it works</th>
            <th>Variance profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PPS / FPPS</td>
            <td>Pays for shares immediately, sometimes including transaction fee coverage.</td>
            <td>Lowest variance, often higher fees.</td>
          </tr>
          <tr>
            <td>PPLNS</td>
            <td>Pays based on shares in the most recent window, aligned with pool luck.</td>
            <td>Medium variance, usually lower fees.</td>
          </tr>
          <tr>
            <td>SOLO</td>
            <td>Rewards only when your hashrate finds a block through the pool.</td>
            <td>Highest variance, potentially higher upside.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="infra">
      <h2 id="infra">Infrastructure and Reliability</h2>
      <ul class="sub">
        <li>Documented uptime targets and historical incident reporting.</li>
        <li>Monitoring, alerting, and redundancy across regions.</li>
        <li>DDoS mitigation posture and recovery playbooks.</li>
        <li>Clear, timely communication when issues occur.</li>
      </ul>
      <p class="sub">
        A pool can advertise low fees, but reliability is what keeps your ASICs hashing without interruptions.
      </p>
    </section>

    <section id="latency">
      <h2 id="latency">Latency and Geographic Coverage</h2>
      <p class="sub">
        Latency affects share submission and stale share rates. Pools with multiple regional endpoints can reduce latency for
        geographically distributed fleets.
      </p>
      <p class="sub">
        2-minute test: ping or traceroute each published stratum endpoint from your mining location and compare with your current
        pool. Look for failover options in other regions.
      </p>
    </section>

    <section id="privacy">
      <h2 id="privacy">Data Collection and Privacy</h2>
      <p class="sub">
        Pools vary in how much data they collect. Look for minimal data collection and clear statements on how data is stored,
        retained, and shared.
      </p>
      <p class="sub">
        Some pools allow no mandatory identity verification for standard mining participation, while still meeting regional
        compliance needs. The key is transparency about when additional verification is required.
      </p>
    </section>

    <section id="transparency">
      <h2 id="transparency">Transparency and Operator Trust</h2>
      <p class="sub">
        Mining is a long-term game. Operator trust comes from clear documentation, responsible disclosure, and honest messaging
        about changes. Look for:
      </p>
      <ul class="sub">
        <li>Public documentation for payout logic and fee structures.</li>
        <li>Clear operator identity and contact channels.</li>
        <li>Realistic guidance rather than hype or promises.</li>
      </ul>
    </section>

    <section id="fees">
      <h2 id="fees">Fees (Last, Not First)</h2>
      <p class="sub">
        Fees are easy to compare but rarely the most important factor. A slightly higher fee can be worth it if uptime is strong,
        payouts are transparent, and the pool communicates clearly when issues happen.
      </p>
    </section>

    <section id="disclosure">
      <h2 id="disclosure">Where Verapool Fits (Disclosure)</h2>
      <p class="sub">
        Verapool is an infrastructure-first, non-custodial mining pool built to prioritize predictable operations and transparent
        reporting. It is not a promise of performance or profitability. Use the same checklist above when evaluating Verapool or
        any other pool.
      </p>
    </section>

    <section id="faq">
      <h2 id="faq">FAQ</h2>
      ${faqItems
        .map(
          (item) => `
      <details>
        <summary>${escapeHtml(item.question)}</summary>
        <p class="sub">${escapeHtml(item.answer)}</p>
      </details>`
        )
        .join("")}
    </section>

    <section>
      <h2>Conclusion</h2>
      <p class="sub">
        The right pool is the one that matches your risk tolerance, latency needs, and operational expectations. Compare custody
        models, payout variance, infrastructure reliability, and privacy posture before making the switch.
      </p>
      <p class="sub">
        If you want to review VeraPool connection details, see
        <a href="https://verapool.io/connect">https://verapool.io/connect</a>.
      </p>
    </section>

    <footer>
      Disclosure: We run Verapool; this guide is informational.
      <br />
      <a href="/">Back to Why VeraPool</a>
    </footer>
  </article>
</body>
</html>`;
}

function buildSitemapXml() {
  const baseUrl = "https://why.verapool.io";
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/blog/how-to-choose-a-bitcoin-mining-pool-2026`,
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === `${baseUrl}/` ? "1.0" : "0.7"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

function buildRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /cdn-cgi/
Sitemap: https://why.verapool.io/sitemap.xml`;
}

function escapeHtml(input) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
