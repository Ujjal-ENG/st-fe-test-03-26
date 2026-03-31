# Candidate Decisions & Notes

Please use this file to briefly outline your technical choices and the rationale behind them.

## 1. State Management & Architecture

_Why did you structure your state the way you did? Which patterns did you choose for handling the flaky API requests, loading states, and error handling?_

- For the first step i have to make the product card with proper skelton based on the figma design you have to provide, for rendering it i used mock data.

- Refactor the Product Card with skeleton and Now for initial loading i have to show the 12 skeletons for better user experience than the real products appear.
- Since the api.ts mentioned there is category filter thats why i add it all in the app.tsx for category wise filter.

- useCallback on fetchData prevents a new function reference on every render, keeping the useEffect dependency array stable and avoiding duplicate API calls.

- since you are mentioned it is a **Flaky API Handling** thats why i wrapped the fetch call in try/catch block. if api call is failed than shown the error banner will nice message.

- Also api.ts there products count set 154, so that i have to need the pagination, for every changes also need the trigger product skeleton for better user experience.

- Also handle the empty state and when product loading is failed.
- I refactored the App.tsx file to improve readability and debugging. I created a custom hook to centralize the logic and exported only the necessary parts. I also broke the UI into smaller components to make the code easier to understand.
- Added TanStack Query because the API was slow and flaky. Implemented caching to provide a better user experience.

- Implemented debouncing to prevent API calls on every keystroke in the search bar. Since the API was slow and flaky, this significantly improved performance and user experience. Also enabled caching so repeated searches are served from cache without additional API calls.

## 2. Trade-offs and Omissions

_What did you intentionally leave out given the constraints of a take-home assignment? If you had more time, what would you prioritize next?_

- I focused on the core assignment requirements first: a responsive product grid, pagination, category filtering, search, loading skeletons, and retryable error handling for the flaky API. I intentionally left out secondary e-commerce features such as sorting, product details, wishlist and cart flows, and richer merchandising UI because they were outside the brief.

- I kept the state model simple by centralizing product-list logic inside a custom `useProducts` hook and letting React Query handle caching/retries. That made the code easier to follow for a take-home assignment, but I intentionally did not add URL synchronization for `page`, `category`, and `search`, so the current view is not preserved on refresh or shareable by link.

- The category list is currently hard-coded to match the mock data. For this exercise that was a reasonable trade-off, but in a production version I would prefer category/filter metadata to come from the API so the UI cannot drift from backend data.

- My resilience work is intentionally pragmatic rather than exhaustive. React Query retries, cached results, placeholder data, and debounced search improve the experience enough for this task, but I did not implement request cancellation, offline support, telemetry, or more advanced stale-data messaging.

- I also left out automated tests and a deeper accessibility pass due to time. The UI includes basic labels, loading states, and error handling, but I did not add unit/integration tests, screen-reader announcements for result updates, or a full keyboard/focus audit.

If I had more time, I would prioritize:

- adding test coverage for `useProducts`, pagination, debounced search, and retry/error scenarios;
- syncing search/filter/page state with the URL so the view is restorable and shareable;
- improving accessibility with live regions, stronger focus management after retries, and more explicit result-state announcements;
- replacing hard-coded categories with API-driven metadata and adding request cancellation to reduce race-condition risks during rapid input changes.

## 3. AI Usage

_How did you utilize AI tools (ChatGPT, Copilot, Cursor, etc.) during this assignment? Provide a brief summary of how they assisted you._

- For codding editor i used vs code, for AI use both **Claude and ChatGPT**, for designing and repetitive work. I just told to the AI this way you have to make this architecture than i reviewed one by one to the code after complete the task

- I used the free **Kilo Code tool and the Gemini command-line tool** to help generate commit messages during the assignment.

## 4. Edge Cases Identified

_Did you notice any edge cases or bugs that you didn't have time to fix? Please list them here._

- One edge case is the search button and Enter key behavior. Search is already working with debounce, so clicking Search or pressing Enter does not make the result come instantly. If user is already on page 1, it may feel like the button is not doing anything.

- If the API fails after some data was already loaded before, right now I show only the error banner and hide the old product list. A better experience could be keeping the old data visible and showing a smaller error message on top.

- The category list is hard coded in the frontend. If backend data changes later and a new category comes, the filter dropdown will not update automatically.

- The page, search text, and category state are not saved in the URL. So if user refreshes the page, all selected state will be lost and it will go back to default.

- I handled basic accessibility, but I did not add screen reader announcement for loading, error, or result count changes. For some users this can make the experience less clear.
