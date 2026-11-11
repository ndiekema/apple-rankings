# Pip

Pip is a social app for ranking apples with friends. It uses comparison-based personal rankings, public taste profiles, short ranking captions, a friends-first activity feed, and a global community leaderboard.

## Foundation included

- Expo Router app for iPhone, Android, and web
- Five-tab Pip navigation: Home, Explore, Rank, Global, and Profile
- Local curated-catalog starter data and personal-ranking activity examples
- Apple detail and comparison-ranking flows
- Supabase-ready schema for profiles, apples, friendships, rankings, captions, and feed activity

## Run locally

1. Install Node.js LTS.
2. Run `npm install`.
3. Run `npm run start`.
4. Open the project in Expo Go, an iOS Simulator, or a web browser.

## What comes next

1. Create a Supabase project and apply [schema.sql](supabase/schema.sql).
2. Add sign-in and replace the local fixture data with Supabase queries.
3. Import and editorially verify the U.S.-focused apple catalog.
4. Make the comparison flow persist rankings and create feed activity.

The ranking flow uses a simple rule: users only rank apples they say they have tried. If they have not tried one yet, the production app will save it to a private want-to-try list instead of allowing a rank.

## Connect Supabase

1. Create a new Supabase project for Pip.
2. In its **SQL Editor**, open a new query, paste the full contents of [schema.sql](supabase/schema.sql), and choose **Run**.
3. In the dashboard's **Connect** panel, copy the Project URL and the **publishable** key (not the secret key).
4. Duplicate `.env.example` as `.env`, then paste those two values after their equals signs.
5. Restart Expo after saving `.env`.

The `.env` file is intentionally excluded from Git. The publishable key is the only key that belongs in a mobile app; access is restricted by the database's row-level security policies.

### Existing Pip database

If you applied `schema.sql` before the sign-in work was added, also run [20261111212104_create_profile_on_auth_signup.sql](supabase/migrations/20261111212104_create_profile_on_auth_signup.sql) once in the Supabase SQL Editor. It creates the matching public Pip profile during account sign-up.
