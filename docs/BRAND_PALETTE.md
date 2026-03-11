# Velora Studio – Brand palette (from logo)

## Logo analysis

**Sources:** `src/components/brand/VeloraIcon.tsx`, `public/icon.svg`

The logo uses:
- A **linear gradient** on the circle stroke and center triangle: `#A78BFA` → `#7C3AED`
- **Path fills:** `#FFFFFF` (white), `#EDE9FE` (pale violet, Tailwind violet-100)
- **Animated variant** also cycles through: `#7DD3FC`, `#38BDF8`, `#0EA5E9` (sky/cyan)

No amber or orange appears in the logo; the identity is **violet-first** with optional cool blue in motion.

## Extracted palette → UI system

| Role | Hex | Source / use |
|------|-----|----------------|
| **Primary** | `#7C3AED` | Logo gradient end, main brand |
| **Primary light (accent)** | `#A78BFA` | Logo gradient start, links, glow |
| **Primary pale** | `#EDE9FE` | Logo path fill, soft surfaces |
| **Primary darker** | `#6D28D9` | Hover, depth |
| **Primary lighter** | `#C4B5FD` | Soft glow, highlights |
| **Cool accent** | `#38BDF8` | From icon animation, used sparingly |
| **Base** | `#0C0B10` | Deep violet-black (not pure black) |
| **Base elevated** | `#121118` | Slightly lighter base |
| **Surface** | `#18161E` | Cards, panels |
| **Surface elevated** | `#1E1C26` | Raised panels |
| **White** | `#FFFFFF` | Text, icons |

All UI colors are derived from the logo; no conflicting hues introduced.
