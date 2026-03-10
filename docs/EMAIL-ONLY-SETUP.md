# Receive inquiries by email (no database)

You can receive every **Start Your Project** submission in your inbox without using Supabase or any database. The form will send the details to you via Resend.

---

## 1. Sign up for Resend

1. Go to **[resend.com](https://resend.com)** and create an account.
2. Verify your email if prompted.

---

## 2. Get an API key

1. In Resend, go to **API Keys** (in the sidebar or account menu).
2. Click **Create API Key**.
3. Name it (e.g. `Velora Studio`) and copy the key (starts with `re_`). You won’t see it again.

---

## 3. Set the “from” address

Resend requires a verified domain or their test domain:

- **Option A – Resend test domain**  
  You can send from `onboarding@resend.dev` for testing. No extra setup.

- **Option B – Your own domain**  
  In Resend, add your domain (e.g. `velorastudio.design`) and add the DNS records they show. Then you can use e.g. `noreply@velorastudio.design` as the sender.

---

## 4. Add environment variables

**Locally** (`.env.local` in the project root):

```
RESEND_API_KEY=re_your_actual_key_here
INQUIRY_NOTIFY_EMAIL=hello@velorastudio.design
```

Use the email address where you want to receive inquiries.

**Optional** – if you’re using your own domain with Resend:

```
RESEND_FROM_EMAIL=Velora Studio <noreply@velorastudio.design>
```

If you omit this, the default is `onboarding@resend.dev`.

---

## 5. Add the same variables on Vercel

1. Go to **[vercel.com](https://vercel.com)** → your project → **Settings** → **Environment Variables**.
2. Add:
   - **RESEND_API_KEY** = your Resend API key  
   - **INQUIRY_NOTIFY_EMAIL** = the email where you want to receive inquiries (e.g. `hello@velorastudio.design`)
   - **RESEND_FROM_EMAIL** (optional) = e.g. `Velora Studio <noreply@velorastudio.design>`
3. Save and **redeploy** the project (Deployments → … → Redeploy).

---

## Done

When someone submits **Start Your Project**, you’ll get an email with:

- Name, email, company, website  
- Budget, timeline, project type  
- Full description  
- Source (e.g. quote, call) if they came from a link with `?intent=`

No database. You can add Supabase later if you want to store leads and use the admin dashboard.
