# Pip product and design brief

## Product

Pip is a social ranking app for people with strong opinions about apples. People rank only apples they have tried, compare their lists with friends, and see where each variety lands globally.

The first release should make one loop delightful: try an apple, place it in your personal order, and see how your taste compares with people you know.

## Product principles

- Ranking, not scoring. Pip asks comparative questions and derives a score from each apple's position in a person's list.
- One shared catalog. Only approved apple varieties can be ranked. A canonical record and aliases prevent duplicate entries from splitting the global result.
- Public taste profiles, friend-first activity. Profiles, rankings, and captions are public by default. The home feed remains focused on friends so it feels personal rather than noisy.
- Clear community signal. Global scores are simple averages of current user scores and always show the number of people who ranked the apple.
- Taste is personal. Pip should celebrate disagreement, not imply that one person's list is objectively correct.

## Ranking system

When someone ranks a new apple, Pip uses a small comparison flow to insert it into their ordered list. For example: “Do you prefer Honeycrisp or Pink Lady?” A binary-search-like sequence needs only a few choices even for a long list.

Each personal position becomes a derived 0–10 score:

- A single ranked apple receives `10.0`.
- For lists with two or more apples, the first apple is `10.0` and the last is `2.0`; the positions between them are evenly distributed.
- An apple's global score is the arithmetic mean of all current personal scores for that apple.
- The global leaderboard requires at least five rankings before showing a public score. Apples with fewer rankings show `Not enough rankings yet` and their rating count.

Derived scores update when a person changes their ordering. This is intentional and should be explained in a small “How scoring works” sheet.

## MVP

### People and relationships

- Email or Apple sign-in
- Display name, username, short bio, optional profile photo
- Search for people, send/accept/decline friend requests, remove friends
- Public profile and ranking visibility by default, with a private-profile setting for people who want it

### Catalog and ranking

- Searchable, admin-curated apple catalog
- Apple details with origin, peak season, flavor traits, aliases, and a licensed image
- Comparison-based ranking flow
- Personal ordered list with a visible derived score
- An optional short caption for each personal ranking; public by default and editable or removable by its author

### Social surfaces

- Friends feed, newest first
- Activity events for a first-time rank and for a rank change
- Friend profile pages with personal rankings
- Global leaderboard with global score, rating count, and rank

## Navigation

The main tab bar is: Home, Explore, Rank, Global, Profile.

- **Home:** recent activity from friends. Public profile activity is visible on a person's profile but is not injected into this feed by default.
- **Explore:** catalog search and apple discovery.
- **Rank:** start a ranking from the catalog or a recent apple.
- **Global:** community leaderboard.
- **Profile:** personal list, friend list, and settings.

## Screens for the first prototype

1. Welcome and sign-in
2. Lightweight profile setup
3. Home feed
4. Explore/catalog search
5. Apple detail
6. Comparison-based rank flow
7. My rankings
8. Friend profile
9. Global leaderboard

## Visual direction: Modern Orchard

Pip should look like considered farmstand packaging, not a themed farm game.

- **Background:** warm cream `#FAF6ED`
- **Ink:** near-black `#1D1C19`
- **Primary action:** orchard red `#C94736`
- **Supporting color:** leaf green `#587354`
- **Secondary accent:** golden apple `#DDAA3C`
- **Type:** an editorial serif for apple names and big rankings; a crisp sans-serif for controls, metadata, and lists
- **Layout:** generous white space, soft card corners, thin warm-gray dividers, large ranking numbers
- **Playfulness:** tiny seed/leaf details and friendly copy. Never use a busy illustrated orchard or visual clutter as decoration.

Example UI copy: `Your orchard is growing.` `Honeycrisp moved up 3 spots.` `A very serious ranking decision.`

## Catalog policy

Every apple has a stable `apple_id`, canonical name, aliases, and an active/hidden status. People cannot create catalog records. They may suggest a missing variety, which creates an admin review item only.

The launch catalog is focused on the U.S. market: familiar supermarket varieties, U.S. regional and heritage apples, and apples commonly grown or sold in the country. A variety may have originated elsewhere and still belong if it is meaningfully available to U.S. users. It is a curated launch set, not a claim to contain all cultivars. New records require a source check, duplicate/alias review, and a usable licensed image before they become active.

## Data and safety defaults

- Keep profiles, rankings, and ranking captions public by default. Offer a private-profile setting that limits them to approved friends.
- Do not expose email addresses or friend-request history publicly.
- Store ranking events and captions separately from the current ranking so the feed is an auditable history. Let authors edit or delete their own captions.
- Keep images in managed storage with source/licensing attribution.
- Support account deletion and a way to hide a catalog record without deleting historical data.

## Not in the MVP

Comments, reactions, direct messages, map views, apple purchase/location tracking, algorithmic recommendations, user-created apples, and taste-match scores. These can follow only after the basic ranking and friend loop is working.

## Build order

1. Confirm brand name availability and the catalog data model.
2. Set up authentication, profile, catalog, friendship, ranking, and activity tables.
3. Build catalog search and personal comparison ranking.
4. Add profiles, friendships, and privacy rules.
5. Add the friends feed and global aggregation.
6. Seed the catalog, license images, and test with a small TestFlight group.
