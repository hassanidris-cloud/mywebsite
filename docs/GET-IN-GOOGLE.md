# Get Velora Studio to Show in Google Search

Your site is set up for indexing (robots allow, meta index, sitemap). To **actually appear** when people search for "Velora Studio" or your domain, do this:

---

## 1. Add the site to Google Search Console

1. Go to **[Google Search Console](https://search.google.com/search-console)**
2. Sign in with your Google account
3. Click **Add property**
4. Choose **URL prefix** and enter: `https://www.velorastudio.design` (or `https://velorastudio.design` if that’s your main URL)
5. Verify ownership:
   - **HTML file:** Download the file, put it in your project’s `public/` folder, deploy, then click Verify
   - **DNS:** Add the TXT record they give you at your domain provider, then click Verify
   - **HTML tag:** Add the meta tag they give you to `src/app/layout.tsx` in the `<head>`, deploy, then click Verify

If you use both **www** and **non-www**, add **both** as separate properties so both get indexed.

---

## 2. Submit your sitemap

1. In Search Console, open your property
2. Go to **Sitemaps** in the left menu
3. Under “Add a new sitemap” enter: `sitemap.xml`
4. Click **Submit**

Google will then crawl the URLs in the sitemap. This can take a few days.

---

## 3. Request indexing for the homepage (optional but faster)

1. In Search Console, use **URL Inspection** (top search bar)
2. Enter `https://www.velorastudio.design` (or your main URL)
3. Click **Request indexing**

This can help the homepage show up in search within a few days instead of waiting longer.

---

## 4. Bing (optional)

1. Go to **[Bing Webmaster Tools](https://www.bing.com/webmasters)**
2. Add your site and verify (similar to Google)
3. Submit the same sitemap: `https://velorastudio.design/sitemap.xml`

---

## Why it doesn’t show yet

- **New site** – Google can take from a few days to a few weeks to index a new or low-traffic site.
- **Not submitted** – Until the site is in Search Console and the sitemap is submitted, Google may not know about it or may crawl it slowly.
- **Sitemap 500** – If `https://velorastudio.design/sitemap.xml` returns an error, fix it (check Vercel logs) and resubmit in Search Console.

---

## Check that the site is reachable

- Open `https://www.velorastudio.design` (and `https://velorastudio.design`) in a browser – both should load.
- Open `https://velorastudio.design/robots.txt` – you should see `Allow: /` and `Sitemap: ...`
- Open `https://velorastudio.design/sitemap.xml` – you should see a list of URLs, not an error page.

If the sitemap shows a 500 error, check the Vercel deployment logs for that route and fix the error so Google can read it.
