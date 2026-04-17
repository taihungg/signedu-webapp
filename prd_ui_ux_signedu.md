# Product Requirements Document (PRD): SignEdu Web Application UI/UX Design

## 1. Executive Summary
This document outlines the UI/UX design requirements and architecture for the **SignEdu Web Application**. SignEdu is a digital platform designed to bridge the communication gap between the Deaf community and the hearing world through sign language education (via short videos), community building, and inclusive corporate services. The platform must embody the core values of inclusivity, accessibility, and modern aesthetics.

## 2. Target Audience
The application caters to three distinct user groups, requiring distinct onboarding and UI adaptations:
1. **Deaf & Hard of Hearing Individuals:** Seeking community resources, specialized job boards, and accessible services.
2. **Hearing Individuals (Learners):** Seeking to learn Vietnamese Sign Language (VSL) through engaging, short-form video content.
3. **Organizations & Enterprises (B2B):** Seeking CSR partnerships, staff training, and inclusive hiring resources.

## 3. Design Principles & Aesthetics (The "SignEdu" Vibe)
The design must be **vibrant, empathetic, and highly accessible**.

### 3.1. Design System Tokens
- **Color Palette:**
  - **Primary Navy:** `#00105b` (Used for primary text, deep headings, solid trust elements)
  - **Primary Cyan:** `#83daf2` (Used for highlights, energetic accents, active states)
  - **Primary Yellow/Gold:** `#f1d577` (Used for primary CTA buttons, warnings, and badges)
  - **Backgrounds:** `#ffffff` (Cards), `slate-50` / `#f8fafc` (App canvas)
- **Typography:**
  - **Headings (Display):** `Poppins` or `Outfit` (Bold, friendly, rounded geometric) with high `leading` (1.3+) to accommodate Vietnamese diacritics.
  - **Body / Interface:** `Inter` or `Roboto` (Highly legible, neutral, scalable).
- **Styling Motifs:**
  - **Shapes:** Generous rounded corners (`rounded-2xl` to `rounded-3xl` / `1.5rem` - `2rem`) to feel welcoming and soft.
  - **Depth:** Soft, diffused drop shadows (e.g., `shadow-[0_10px_40px_rgba(0,16,91,0.04)]`) rather than harsh borders.
  - **Interactions:** Subtle vertical translates (`-translate-y-1`) and scaling on hover. Micro-animations for feedback.

### 3.2. Accessibility (A11y) - CRITICAL
Because the core user base includes individuals with varying abilities, UI must adhere strictly to WCAG 2.1 AA standards:
- **Visual Cues over Audio:** System feedback (success, error, loading) must rely entirely on visual indicators, animations, or haptics—never solely on sound.
- **High Contrast:** Ensure text over backgrounds (especially over `#83daf2` and `#f1d577`) passes minimum contrast ratios.
- **Touch Targets:** Minimum 48x48px for all interactive elements (buttons, video controls) on mobile devices.
- **Focus States:** Clearly defined, high-contrast focus rings (`focus:ring-[#83daf2]/50`) for keyboard navigation.

---

## 4. Key UI/UX User Flows

### 4.1. Onboarding & Personalization
- **Goal:** Route users to the optimized dashboard based on their persona.
- **UI Element:** Full-screen split-choice modal or stepping-stone cards (glassmorphism UI).
- **Flow:** User signs up -> Selects Persona (Learner / Community Member / Enterprise) -> UI adapts the bottom navigation / sidebar items instantly.

### 4.2. Learning Module (The "Edu" core)
- **Goal:** Deliver bite-sized VSL lessons.
- **UI Architecture:** 
  - **Mobile:** Vertical scrolling "Reel/TikTok" style interface for vocabulary. Swipe up for the next sign.
  - **Desktop:** Horizontal carousel or grid of "Flashcards" containing silent looping videos.
- **Video Player UX:** Custom wrapper focusing on clarity. No audio track needed. Large, highly legible captions synchronized with the signs. Adjustable playback speed (0.5x, 1x).

### 4.3. Community & Ecosystem Directory
- **Goal:** Connect users to disability support organizations (HAD, BVD, Green Hands) and inclusive employers.
- **UI Architecture:** Masonry grid or card-based list. 
- **Interactions:** Clicking a card opens a sliding right-drawer (Desktop) or a bottom-sheet (Mobile) with contact info and integration with map services.

### 4.4. Corporate Services & CSR Dashboard
- **Goal:** Allow B2B users to book workshops and consults.
- **UI Architecture:** Premium, data-driven dashboard layout. Tables for past training sessions, progress trackers for corporate inclusive badges, and a streamlined contact form (reusing the existing optimized `/contacts` form layout).

---

## 5. Global Interface Components

### 5.1. Navigation
- **Desktop:** Sticky top navbar with a prominent "Action" button (e.g., "Bắt đầu học").
- **Mobile/Tablet App:** Bottom navigation bar (App-like feel) containing: `Trang chủ` (Home) | `Học tập` (Learn) | `Cộng đồng` (Community) | `Hồ sơ` (Profile).

### 5.2. Empty States & Loading
- **Loading:** Use skeleton screens featuring a subtle pulsing gradient across the brand colors (`#83daf2` to `#f1d577`). 
- **Empty States:** Friendly custom illustrations depicting inclusive communication, encouraging the user to take their first action.

### 5.3. Modals & Drawers
- Heavy use of animated overlays (`backdrop-blur-sm`). 
- Drawers sliding in from the right for details (e.g., viewing a specific sign's context or viewing a partner's details) to prevent losing context of the underlying list.

---

## 6. Technical Design Constraints (For Developers)

1. **Responsive First:** The web app must feel like a native mobile app on viewports < 768px (using bottom sheets, full-width buttons, and swipe gestures).
2. **Framework:** Next.js with Tailwind CSS contexts.
3. **Component Reusability:** Establish a core UI library before building pages:
   - `<Button variant="primary|secondary|ghost" />`
   - `<VideoCard src="..." label="..." />`
   - `<EcosystemCard org="..." />`
4. **Performance:** Videos must be aggressively lazy-loaded or stream-optimized, as the "Learn" section will be media-heavy. Use blurred placeholders while video frames load.

## 7. Next Steps for Design Handoff
- [ ] Construct high-fidelity Figma mockups for the **Video Learning Player**.
- [ ] Build interactive prototypes for the **Onboarding Persona flow**.
- [ ] Audit the `#83daf2` and `#f1d577` colors against pure white to formulate accessible button text colors (usually `#00105b` on active backgrounds).
