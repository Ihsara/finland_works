
# GEMINI Coding Rules

## General Principles
- **Language**: TypeScript (Strict).
- **Framework**: React 18+ (Hooks).
- **Styling**: Tailwind CSS (via CDN script in HTML, className in JSX).
- **Icons**: Lucide React.
- **Data Persistence**: LocalStorage (Privacy-first).

## Unique Identifier System (UIS)
**CRITICAL**: Every major component and interactive element MUST have a unique identifier for testing and referencing.

1.  **Registry**: Always use `data/system/identifiers.ts` (imported as `APP_IDS`). Do not hardcode strings if a constant exists.
2.  **Scenes**: Every top-level View component (e.g., `LandingView`) MUST have a `data-scene-id` attribute on its root `div`.
    ```tsx
    <div data-scene-id={APP_IDS.SCENES.LANDING} className="...">
    ```
3.  **Interactive Elements**: All Buttons, Inputs, and Links MUST have a `data-testid` attribute derived from `APP_IDS`.
    ```tsx
    <button data-testid={APP_IDS.VIEWS.LANDING.BTN_QUIZ} onClick={...}>
    ```
4.  **Dynamic Lists**: For generated lists, use the ID generation functions in `APP_IDS` (e.g., `APP_IDS.VIEWS.WIKI.CARD_CATEGORY(cat.id)`).

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
