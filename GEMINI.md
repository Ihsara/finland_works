
# GEMINI Coding Rules

## General Principles
- **Language**: TypeScript (Strict).
- **Framework**: React 18+ (Hooks).
- **Styling**: Tailwind CSS (via CDN script in HTML, className in JSX).
- **Icons**: Lucide React.
- **Data Persistence**: LocalStorage (Privacy-first).

## Mobile & Touch Optimization (CRITICAL)
**The application must feel native on a phone.**
1.  **Touch Targets**: All interactive elements (buttons, inputs, links, icons) MUST have a minimum touch target of **44px x 44px**. 
    *   *Fix*: If a button looks small visually, increase `p-` (padding) or add `min-h-[44px] min-w-[44px]` to the container.
2.  **Touch Feedback**: Do NOT rely on `:hover`. Mobile users cannot hover.
    *   *Fix*: Always add `:active` styles (e.g., `active:scale-95`, `active:bg-gray-200`) to provide instant visual confirmation of a tap.
3.  **Input Text Size**: On mobile, input font size must be at least **16px** (`text-base`) to prevent iOS from auto-zooming. You can use `text-base md:text-sm`.
4.  **Safe Areas**: Respect `env(safe-area-inset-bottom)` for bottom fixed elements.

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

3.  **Naming Convention**:
    *   Scenes: `scene_[name]`
    *   Elements: `[type]_[scene]_[action]` (e.g., `btn_landing_start_chat`)

4.  **Testing Requirement**:
    *   Whenever you modify `data/system/*`, you MUST run `tests/system.test.ts`.
    *   Ensure that any new ID added to `NAV_LINKS` exists in the generated Scene definitions.
    *   Ensure no duplicate IDs exist within a scene.

## Navigation & User Flow Guidelines

### 1. The "My Plan" Loop (Guest Handling)
Views must explicitly handle the `Guest` state (`profile.id === 'guest'` or `!profile`).
*   **Authenticated User**: Show personal data, progress bars, and specific recommendations.
*   **Guest User**: Show a clear "Empty State" with a Call-To-Action (CTA) pointing to the **Quiz** (`scene_quiz`).
    *   *Example*: In `ProfileView`, a guest should see "Create your plan" (links to Quiz), not an empty dashboard.

### 2. View Internal vs. Global Navigation
*   **Global Navigation**: The top bar (Logo, Knowledge Base, Chat, Plan) resets the view context.
*   **Internal Navigation**: Complex views (like `WikiView`) maintain their own internal history stack.
    *   The "Back" button within a View should traverse internal history (e.g., Article -> Category List) *before* exiting the View back to the Dashboard.
    *   Do not use browser history for internal view state; manage it via React State (e.g., `activeArticleId`).

### 3. The Hub Architecture
*   **Dashboard** is the Hub.
*   **Spokes**: Wiki, Chat, Profile.
*   **Cross-Linking**: Spokes can link to each other (e.g., Chat linking to a Wiki Article), but the "Close" or "Home" action should always return to the Dashboard (or previous Spoke if deeper context is needed).

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
