# Design Brief: STS SOFITRANS SERVICE

## Purpose & Aesthetic
Premium corporate digital platform for Senegalese enterprise (real estate, transport, agrobusiness, training). Luxury + modern startup confidence. Tricolor logo (green/black/blue) anchors all visual decisions.

## Palette (Light / Dark)
| Token | Light OKLCH | Dark OKLCH | Use |
|-------|-------------|-----------|-----|
| Primary | 0.4 0.12 136 (green) | 0.55 0.12 136 | CTAs, growth, confidence |
| Secondary | 0.42 0.15 249 (blue) | 0.62 0.15 249 | Secondary actions, accents |
| Foreground | 0.12 0 0 (black) | 0.95 0 0 | Headings, body text |
| Background | 0.98 0 0 (off-white) | 0.1 0 0 | Main surfaces |
| Muted | 0.92 0 0 | 0.25 0 0 | Subtle backgrounds |
| Border | 0.88 0 0 | 0.22 0 0 | Lines, dividers |

## Typography
- **Display:** Fraunces (serif, corporate elegance, headings H1–H3)
- **Body:** GeneralSans (geometric sans-serif, all copy and UI text)
- **Mono:** JetBrainsMono (technical credibility, code blocks)

## Shape Language
- Radius: 12px (lg), 10px (md), 8px (sm) — refined, not sharp or overly rounded
- Shadows: subtle depth (corporate 0 4px 12px / elevated 0 12px 24px)
- Spacing: generous whitespace, 8px grid base

## Structural Zones
| Zone | Treatment | Rationale |
|------|-----------|-----------|
| Header | bg-card border-b, shadow-corporate | Authority, clear separation |
| Hero | bg-background, accent elements | Breathing room for visual hierarchy |
| Content Cards | bg-card shadow-corporate hover-lift | Elevation, interactive feedback |
| CTA Section | bg-primary text-white | Confidence, call-to-action |
| Footer | bg-muted/30 border-t | Visual anchor |

## Motion & Interaction
- Transitions: 300ms ease (cubic-bezier 0.4, 0, 0.2, 1)
- Hover: shadow elevation + smooth lift
- No bounces or playful animations — refined, purposeful only

## Component Patterns
- Buttons: primary (green bg, white text), secondary (blue outline)
- Forms: clean inputs with subtle focus ring (primary color)
- Cards: shadow-corporate baseline, hover-lift on interactive
- Navigation: persistent header + mobile hamburger
- CTA Buttons: WhatsApp (green #25D366) + Call (primary color)

## Signature Detail
Logo tricolor geometry → system's RGB: green growth (primary), black authority (foreground), blue globe (secondary). All color decisions trace back to this foundational geometry, never randomized.

## Constraints
- Luxury = restraint, not decoration
- Mobile-first responsive (sm: 640px, md: 768px, lg: 1024px)
- All copy in French
- No gradients unless supporting the tricolor identity
- No generic animations or effects
