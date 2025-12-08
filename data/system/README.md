
# Design System & Identifier Registry (UIS)

## Overview
This folder contains the **Unique Identifier System (UIS)** for "Finland Works!".

As a designer or product owner, think of this as the **Stable Contract between Design and Engineering**. It ensures that every important button, text field, and navigation element has a permanent, unique name, regardless of how it looks visually.

## Why do we need this?

1.  **Design Freedom**: You can change the label of a button (e.g., from "Start" to "Let's go") or its color without breaking the app's functionality or analytics. The code looks for the *ID* (`btn_start`), not the text.
2.  **Quality Assurance (QA)**: Automated "robots" use these IDs to click through the app and verify it works. They need a reliable map to find elements.
3.  **Traceability**: Every interactive element on your Figma mockups should ideally map to an ID here.

## Structure

*   **`scenes/`**: Defines the **Screens** (e.g., Landing, Dashboard) and the elements inside them.
*   **`links/`**: Defines the **User Flow**. Which button leads to which screen?
*   **`identifiers.ts`**: The technical file developers use to import these IDs safely.
*   **`flow.mermaid`**: A visual diagram of the application's navigation flow.

## Navigation Diagram
See `flow.mermaid` for a visual representation of how the scenes connect.
