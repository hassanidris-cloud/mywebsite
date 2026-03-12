# Database & inquiry setup – receive project inquiries

Your site already saves inquiries when users submit the **Start Your Project** form. You only need to create the database and set env vars. Then you can view leads at **/admin/leads**.

---

## 1. Create a Supabase project

1. Go to **[supabase.com](https://supabase.com)** and sign in (or create an account).
2. Click **New project**.
3. Choose an organization (or create one), set a **name** (e.g. `velora-studio`), set a **database password** (save it somewhere safe), pick a **region** near you.
4. Click **Create new project** and wait until it’s ready.

---

## 2. Create the `leads` table

1. In the Supabase dashboard, open your project.
2. In the left sidebar click **SQL Editor**.
3. Click **New query**.
4. Paste this SQL and run it (Run button):

```sql
-- Table for Start Your Project form submissions
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  website text,
  budget text,
  timeline text,
  project_type text,
  description text not null,
  source text,
  is_high_value boolean not null default false,
  created_at timestamptz not null default now()
);

-- Only your app (using the service_role key) can read/write. No public access.
alter table public.leads enable row level security (rls);
```

5. You should see “Success”. The `leads` table is now ready.

---

## 3. Get your Supabase URL and key

1. In Supabase, go to **Project Settings** (gear icon in the sidebar).
2. Open **API**.
3. Copy:
   - **Project URL** (e.g. `https://xxxx.supabase.co`)
   - **service_role** key (under “Project API keys”) – **keep this secret**; it’s a server-only key.

---

## 4. Add environment variables locally

1. In your project root (`e:\velora\mywebsite`) create or edit `.env.local`.
2. Add (use your real URL and key):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

3. Save the file. **Do not commit `.env.local`** (it should be in `.gitignore`).

---

## 5. Add environment variables on Vercel

1. Go to **[vercel.com](https://vercel.com)** → your project → **Settings** → **Environment Variables**.
2. Add:
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`  
     **Value:** your Supabase project URL  
     **Environment:** Production (and Preview if you want).
   - **Name:** `SUPABASE_SERVICE_ROLE_KEY`  
     **Value:** your Supabase service_role key  
     **Environment:** Production (and Preview if you want).
3. Save. Then trigger a **new deployment** (Deployments → … → Redeploy) so the new env vars are used.

---

## 6. (Optional) Email notifications on each new lead

1. Sign up at **[resend.com](https://resend.com)** and get an API key.
2. Add in `.env.local` (local) and in Vercel (production):

```
RESEND_API_KEY=re_xxxxxxxxxxxx
INQUIRY_NOTIFY_EMAIL=hello@velorastudio.design
RESEND_FROM_EMAIL=Velora Studio <noreply@yourdomain.com>
```

Use an email/domain you’re allowed to send from in Resend. After this, each new inquiry will be saved to the database **and** a summary email sent to `INQUIRY_NOTIFY_EMAIL`.

---

## 7. (Optional) Admin dashboard – view leads in the browser

1. Choose a strong password only you know.
2. Add in `.env.local` and in Vercel:

```
ADMIN_PASSWORD=your-secure-password
```

Optionally set `ADMIN_SECRET` to the same value (or leave it unset; the app will use `ADMIN_PASSWORD`).

3. Redeploy if you only added this on Vercel.
4. Open **https://velorastudio.design/admin/leads** (or your domain).
5. Enter the password. You’ll see a table of all leads (name, email, company, budget, timeline, date, high-value flag).

`/admin/` is already disallowed in `robots.txt`, so search engines won’t index it.

---

## Summary

| What                         | Where / how |
|-----------------------------|-------------|
| User submits Start Project  | Form posts to server action → saved to Supabase `leads` table (and optional email via Resend). |
| You view inquiries         | Go to **/admin/leads**, log in with `ADMIN_PASSWORD`. |
| Required for saving leads   | Supabase project + `leads` table + `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` in env. |
| Optional                    | Resend (email per lead), Admin (dashboard password). |

After steps 1–5 (and a redeploy on Vercel), new submissions will be stored in Supabase. Add steps 6–7 when you want email alerts and the admin dashboard.
