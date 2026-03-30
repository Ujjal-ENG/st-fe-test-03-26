# Candidate Decisions & Notes

Please use this file to briefly outline your technical choices and the rationale behind them.

## 1. State Management & Architecture

_Why did you structure your state the way you did? Which patterns did you choose for handling the flaky API requests, loading states, and error handling?_

- For the first step i have to make the product card with proper skelton based on the figma design you have to provide, for rendering it i used mock data.

- Refactor the Product Card with skeleton and Now for initial loading i have to show the 12 skeletons for better user experience than the real products appear.
- Since the api.ts mentioned there is category filter thats why i add it all in the app.tsx for category wise filter

- useCallback on fetchData prevents a new function reference on every render, keeping the useEffect dependency array stable and avoiding duplicate API calls.

- since you are mentioned it is a **Flaky API Handling** thats why i wrapped the fetch call in try/catch block. if api call is failed than shown the error banner will nice message

- Also api.ts there products count set 154, so that i have to need the pagination, for every changes also need the trigger product skeleton for better user experience

- Also handle the empty state and when product loading is failed
- I refactored the App.tsx file to improve readability and debugging. I created a custom hook to centralize the logic and exported only the necessary parts. I also broke the UI into smaller components to make the code easier to understand.
- Added TanStack Query because the API was slow and flaky. Implemented caching to provide a better user experience.

- Implemented debouncing to prevent API calls on every keystroke in the search bar. Since the API was slow and flaky, this significantly improved performance and user experience. Also enabled caching so repeated searches are served from cache without additional API calls.

## 2. Trade-offs and Omissions

_What did you intentionally leave out given the constraints of a take-home assignment? If you had more time, what would you prioritize next?_

## 3. AI Usage

_How did you utilize AI tools (ChatGPT, Copilot, Cursor, etc.) during this assignment? Provide a brief summary of how they assisted you._

- For codding editor i used vs code, for AI use both **Claude and ChatGPT**, for designing and repetitive work. I just told to the AI this way you have to make this architecture than i reviewed one by one to the code after complete the task

I used the free Kilo Code tool and the Gemini command-line tool to help generate commit messages during the assignment.

## 4. Edge Cases Identified

_Did you notice any edge cases or bugs that you didn't have time to fix? Please list them here._

_(Your answer here)_
