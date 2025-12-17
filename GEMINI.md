
# GEMINI Coding Rules

## General Principles
- **Language**: TypeScript (Strict).
- **Framework**: React 18+ (Hooks).
- **Styling**: Tailwind CSS (via CDN script in HTML, className in JSX).
- **Icons**: Lucide React.
- **Data Persistence**: LocalStorage (Privacy-first).

## Content Engineering (NEW)
**Guides must be actionable manuals, not just descriptions.**
1.  **Empowerment**: Write guides so the user can perform the task *by themselves* immediately after reading.
2.  **Structure**:
    *   **The Mission**: One sentence on *why* this matters.
    *   **The Steps**: Numbered list (1, 2, 3) with concrete actions.
    *   **The Keywords**: Include the Finnish term (e.g., *Verokortti*) so they know what button to click on official sites.
    *   **The Hack**: A "Pro Tip" that locals know but immigrants usually find out the hard way.
3.  **Tone**: Nordic Pragmatism. Direct, honest, encouraging, and devoid of fluff.

## Mobile-First & Touch Optimization (PARAMOUNT)
**The phone is the PRIMARY device. Design for 360px width first.**
1.  **Vertical Space**: Screens are short. Avoid massive buttons that force scrolling on landing pages. Use compact cards (`h-24` banners or `aspect-video`) on mobile.
2.  **Touch Targets**: All interactive elements (buttons, inputs, links, icons) MUST have a minimum touch target of **44px x 44px**. 
    *   *Fix*: If a button looks small visually, increase `p-` (padding) or add `min-h-[44px] min-w-[44px]` to the container.
3.  **Touch Feedback**: Do NOT rely on `:hover`. Mobile users cannot hover.
    *   *Fix*: Always add `:active` styles (e.g., `active:scale-95`, `active:bg-gray-200`) to provide instant visual confirmation of a tap.
4.  **Input Text Size**: On mobile, input font size must be at least **16px** (`text-base`) to prevent iOS from auto-zooming. You can use `text-base md:text-sm`.
5.  **Safe Areas**: Respect `env(safe-area-inset-bottom)` for bottom fixed elements.

## Visual Design Language: "Nordic Aurora"
- **Atmosphere**: 
    - **Light Mode**: High saturation, warm, "Nordic Summer". Backgrounds should have moving blobs of Blue, Fuchsia, and Teal.
    - **Dark Mode**: "Northern Lights". Deep Navy (`bg-[#0b1021]`) background with glowing Green/Teal/Purple aurora gradients.
- **Typography**: 
    - **Headings**: `Playfair Display` (Serif) for emotional connection (Latin languages only).
    - **Body**: `Inter` (Sans-serif) for utility and readability.
- **Components**:
    - **Glassmorphism**: Heavy use of `backdrop-blur-xl` with `bg-white/80` (Light) or `bg-[#151b2e]/60` (Dark).
    - **Borders**: Thin, elegant borders (`border-white/20` or colored rings).
- **Motion**: Fluid transitions. Text elements should slide and fade.

## Unique Identifier System (UIS)
**CRITICAL**: Every major component and interactive element MUST have a unique identifier for testing and referencing.

1.  **Registry Location**: The system definition lives in `data/system/`.
    *   **Scenes**: Define component IDs in `data/system/scenes/index.ts`.
    *   **Links**: Define navigation flows in `data/system/links/index.ts`.
    *   **Aggregator**: `data/system/identifiers.ts` imports these and exports the global `APP_IDS` object.

2.  **Usage**: Always import `APP_IDS` from `data/system/identifiers.ts`. Do not hardcode strings.
    ```tsx
    import { APP_IDS } from '../../data/system/identifiers';
    // ...
    <div data-scene-id={APP_IDS.SCENES.LANDING}>
      <button data-testid={APP_IDS.VIEWS.LANDING.BTN_QUIZ} />
    </div>
    ```

## Navigation & User Flow Guidelines

### 1. The "My Plan" Loop (Guest Handling)
Views must explicitly handle the `Guest` state (`profile.id === 'guest'` or `!profile`).
*   **Authenticated User**: Show personal data, progress bars, and specific recommendations.
*   **Guest User**: Show a clear "Empty State" with a Call-To-Action (CTA) pointing to the **Quiz** (`scene_quiz`).

### 2. View Internal vs. Global Navigation
*   **Global Navigation**: The top bar (Logo, Knowledge Base, Chat, Plan) resets the view context.
*   **Internal Navigation**: Complex views (like `WikiView`) maintain their own internal history stack.

## Component Structure
- **Views**: Full-screen pages. Located in `components/views/`.
- **Widgets**: Reusable parts. Located in `components/`.
- **Services**: Logic layers. Located in `services/`.

## Data Management
- Use `storageService.ts` for all LocalStorage interactions.
- Never store API keys in plain text commits; use the `process.env` polyfill or user input storage.

## Localization
- All text must be wrapped in the `t()` function from `useLanguage()`.
- No hardcoded English strings in UI components.

## AI Integration
- Use `@google/genai` SDK.
- Always use `process.env.API_KEY` or the user-provided key.
- Handle loading states and errors gracefully.
