# Engineering & Architecture Guidelines

## 1. Tech Stack
* **Framework:** React + Vite
* **Language:** TypeScript (Relaxed strictness: avoid `any` where possible, use sensible interfaces, but prioritize functionality over complex generic gymnastics).
* **Styling:** Tailwind CSS (Light Mode ONLY. Do not implement Dark Mode toggles or dark variants).
* **Routing:** `react-router-dom`
* **Local/Global UI State:** Zustand
* **Server State & Data Fetching:** TanStack Query (React Query)
* **Real-time:** WebSockets using STOMP protocol (e.g., `@stomp/stompjs`)

## 2. Project Architecture
Use a **Feature-Based** folder structure with global fallbacks for shared code.
Enforce the following structure:
/src
  /assets
  /components     (Global shared UI components: Buttons, Modals, Inputs)
  /hooks          (Global shared hooks: useTheme, useClickOutside)
  /lib            (Configuration: Axios instances, STOMP client setup, TanStack setup)
  /routes         (Route definitions and main Page layouts/composition)
  /store          (Global Zustand stores, e.g., global UI state, active workspace ID)
  /features
    /auth
      /api        (TanStack Query mutations/queries for auth)
      /components (Login/Register forms)
    /workspace
      /api        (TanStack Query functions for fetching boards, tasks, sending messages)
      /components (Kanban Board, Chat Interface)
      /hooks      (Domain-specific hooks, e.g., useDragAndDrop, useStompChat)

## 3. Authentication & API Flow
* **JWT Handling:** The backend issues JWTs via `HttpOnly` cookies. The frontend must NEVER attempt to read, write, or store JWTs in JS memory, Zustand, or localStorage.
* **API Client Setup:** Configure the global Axios instance (or `fetch`) with `withCredentials: true` so the browser automatically attaches the `HttpOnly` cookie to all requests.

## 4. Feature Logic & State Management
* **Multiple Workspaces:** A single user can belong to multiple workspaces. The UI must read the user's available workspaces and allow them to switch. The currently active `workspaceId` should be stored in Zustand or read from the URL route (e.g., `/workspaces/:workspaceId`).
* **Roles & Permissions:** Enforce role-based UI rendering. 
  * "Observers" cannot render components for dragging tasks, editing tasks, or typing in the chat.
  * "Leaders" are the only ones who can see/render Workspace Settings and Invitation forms.
* **Real-Time (WebSockets):** Initialize the STOMP client *only* when a user enters a specific workspace route. Ensure the WebSocket connection is cleanly disconnected when the user navigates away from the workspace or logs out.

## 5. Strict Coding Rules
* **Formatting:** Adhere to standard Prettier and ESLint rules. 
* **Async Functions:** **STRICT RULE:** Always use `async/await` with `try/catch` blocks for asynchronous functions. You are strictly forbidden from using `.then().catch()` promise chains.