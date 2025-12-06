
# Scene Registry

## What is a Scene?
In our system, a **Scene** corresponds to a full-screen view or a major state in the application (e.g., "Landing Page", "Dashboard", "Chat Interface").

## The "Actors"
Inside each scene definition, we list the critical elements—the "actors"—that users interact with.

### Naming Convention
We use specific prefixes to make it easy to identify the role of an element in the design:

*   **`BTN_`**: A **Button** (Primary or Secondary action).
    *   *Example:* `BTN_CHAT` (The button to start a chat).
*   **`LINK_`**: A text **Link** or subtle navigation element.
    *   *Example:* `LINK_RESET` (A small "Reset" text link).
*   **`INPUT_`**: A **Text Field** where users type information.
    *   *Example:* `INPUT_API_KEY`.
*   **`HERO_`**: A major **Heading** or display area. Useful for verifying that the user has arrived at the right place.
    *   *Example:* `HERO_TITLE`.
*   **`CARD_`**: A **Container** or grouping of information that might be clickable.

## For Designers
When designing a new feature, ensure every clickable element has a corresponding ID defined here. If you remove a button from the design, please flag it so we can deprecate its ID here to keep the system clean.
