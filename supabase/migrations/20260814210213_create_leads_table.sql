/*
# Create leads table for diagnostic form submissions

1. New Tables
- `leads`
  - `id` (uuid, primary key)
  - `business_name` (text, not null) — the business name entered in step 1
  - `industry` (text, not null) — the industry sector
  - `qb_status` (text, not null) — QuickBooks status: 'setup', 'needs_cleanup', or 'none'
  - `monthly_revenue` (text, not null) — revenue bracket string
  - `full_name` (text, not null) — contact's full name
  - `email` (text, not null) — contact email
  - `phone` (text, not null) — phone or WhatsApp number
  - `preferred_lang` (text, not null) — 'en' or 'es'
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `leads`.
- This is a no-auth public form (no sign-in screen), so the anon-key client must be able to INSERT.
- INSERT is open to anon+authenticated (the form submits leads).
- SELECT/UPDATE/DELETE are denied (no policies) — leads are private to the business owner, not readable from the frontend.
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  industry text NOT NULL,
  qb_status text NOT NULL,
  monthly_revenue text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  preferred_lang text NOT NULL DEFAULT 'en',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);
