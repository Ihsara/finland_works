
# Navigation Logic (User Flows)

## Overview
This folder acts as the **Interaction Design Specification**. It maps user actions (Triggers) to system responses (Destinations).

## How it Works
We map a **Source ID** (The Trigger) to a **Target View** (The Destination).

**Example:**
> `[SCENES.LANDING.BTN_CHAT]`  **goes to**  `AppView.CHAT`

**Translation:**
"When the user clicks the **Chat Button** on the **Landing Page**, the app navigates to the **Chat View**."

## Why keep this here?
By defining navigation in data rather than hiding it inside code logic, we gain several advantages:

1.  **Visualizing Flow**: We can read this file to understand the "Sitemap" of the application without running it.
2.  **Flexibility**: We can easily redirect flows (e.g., pointing a button to a new "Registration" page instead of "Login") by changing one line here.
3.  **Safety**: We can audit the app to ensure there are no "dead ends" (buttons that go nowhere).
