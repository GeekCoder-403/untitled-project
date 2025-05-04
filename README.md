Welcome to Remix!
Remix Docs
Development
From your terminal:

npm run dev
This starts your app in development mode, rebuilding assets on file changes.

Deployment
First, build your app for production:

npm run build
Then run the app in production mode:

npm start
Now you'll need to pick a host to deploy it to.

DIY
If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of remix build

build/
public/build/
Using a Template
When you ran npx create-remix@latest there were a few choices for hosting. You can run that again to create a new project, then copy over your app/ folder to the new project that's pre-configured for your target server.

cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app



# TanStack Query API Integration Guide

Welcome! This guide helps you use our standardized API flow using **TanStack Query (React Query)** and `axios`.

---
## API Flow - Step by Step (Query + Mutation)

## For GET (Query) - Fetching Data

1️⃣ Write a hook→ 
   Create /services/businessGlossary.query.ts and write a GET hook using queryFetch.

2️⃣ Create an interface→ 
   Define your response model in /utils/interfaceCollection/businessGlossaryInterface.ts.

3️⃣ Use the hook in your page→ 
   Call useGetBusinessGlossary() inside your component to fetch data.

4️⃣ Trigger API call→ 
   When the component mounts, React Query runs the hook automatically.

5️⃣ Build API request→ 
   queryFetch builds the full URL and configures Axios for the GET request.

6️⃣ Send request→ 
   Axios sends the GET request to your backend API.

7️⃣ Attach Access Token→ 
   Axios interceptor automatically adds the token to request headers.

8️⃣ Receive response→ 
   API returns JSON data; Axios parses the result.

9️⃣ Cache the result→ 
   React Query caches the data using the ["businessGlossary"] query key.

🔟 Render data in UI→ 
   Your component displays the fetched data.

## For POST/PUT/DELETE (Mutation) - Sending Data

1️⃣ Write a hook→ 
   Create /services/businessGlossary.mutation.ts and write a hook using mutationFetch.

2️⃣ Create interfaces→ 
   Define request + response models in /utils/interfaceCollection/businessGlossaryInterface.ts.

3️⃣ Use the hook in your page→ 
   Call useCreateBusinessGlossary() (or update/delete) inside your component.

4️⃣ Trigger mutation→ 
   Call mutate({...}) when the user performs an action (e.g., clicks "Add" or "Update").

5️⃣ Build API request→ 
   mutationFetch builds the URL, sets the method (POST/PUT/DELETE), and attaches the request body.

6️⃣ Send request→ 
   Axios sends the request to the API.

7️⃣ Attach Access Token→ 
   Axios interceptor adds the token to request headers.

8️⃣ Handle response→ 
   API responds (e.g., success message); Axios parses it.

9️⃣ Update UI→ 
   You can refresh data using queryClient.invalidateQueries() to refetch the latest data automatically.

🔟 Show feedback→ 
   Show success/error toast or message to the user.

---

## 1. Set up your API URL

In your `.env` file, define the base URL for your API:

```env
URL_PLATFORM_API=https://jsonplaceholder.typicode.com/
```

We use this base URL for all API requests via `axios`.

---

## 2. Project Structure

```bash
src/
├── config/                             # Global configuration and shared utilities
│   └── query-client.ts                 # Axios setup + reusable query/mutation functions (GET, POST, PUT, DELETE)
│                                       # Includes token setup, error handling, and default React Query client

├── services/                           # Business/domain-specific API hooks grouped by feature/module
│   └── feature/
│       ├── feature.query.ts        # Contains all `useQuery` hooks (for GET requests) for this feature
│       └── feature.mutation.ts     # Contains all `useMutation` hooks (for POST/PUT/DELETE requests)

├── utils/                              # Reusable helpers, types, and utilities
│   └── interfaceCollection/            # TypeScript interfaces used across the app
│       ├── featureInterface.ts     # Request/response interfaces specific to yourFeature APIs
│       └── ClientTypeInterfaces.ts     # Shared interfaces for API error handling, standard responses, etc.

```

---

## 3. API Setup (Reusable Client)

### `query-client.ts`

✅ Centralized `axios` setup for all APIs  
✅ Handles GET (`queryFetch`) and POST/PUT/DELETE (`mutationFetch`)  
✅ Token-based Auth support built-in

---

## 📥 4. Create a GET API

### Step 1: Define the response interface

```ts
// exampleInterface.ts
export interface FeatureInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
```

### Step 2: Add your GET API hook

```ts
// feature.query.ts
import { useQuery } from "@tanstack/react-query";
import { queryFetch } from "~/config/query-client";
import { Todo } from "~/utils/interfaceCollection/yourFeatureInterface";

export function useGetTodo() {
  return useQuery({
    queryKey: ["getTodo"],
    queryFn: async () => {
      return await queryFetch<Todo>({ url: "todos/1" });
    },
  });
}
```

---

## 📝 5. Create a POST / PUT / DELETE API

### Step 1: Define request + response types

```ts
// featureInterface.ts
export interface CreateTodoInput {
  title: string;
  completed: boolean;
}

export interface ApiResponse {
  message: string;
}
```

### Step 2: Add mutation hook

```ts
// feature.mutation.ts
import { useMutation } from "@tanstack/react-query";
import { mutationFetch } from "~/config/query-client";
import { CreateTodoInput, ApiResponse } from "~/utils/interfaceCollection/yourFeatureInterface";

export function useCreateTodo() {
  return useMutation<ApiResponse, Error, CreateTodoInput>({
    mutationFn: async (body) => {
      return await mutationFetch({
        url: "todos",
        method: "POST",
        body,
      });
    },
  });
}
```

---

## 🚀 6. How to Use in a Component

### 📡 For GET:

```tsx
import { useGetTodo } from "~/services/feature/feature.query";

const TodoComponent = () => {
  const { data, isLoading, error } = useGetTodo();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <h3>{data?.title}</h3>
      <p>Completed: {data?.completed ? "Yes" : "No"}</p>
    </div>
  );
};
```

### 🧾 For POST:

```tsx
import { useCreateTodo } from "~/services/feature/feature.mutation";

const CreateTodo = () => {
  const { mutate, isLoading } = useCreateTodo();

  const handleCreate = () => {
    mutate({ title: "New Task", completed: false });
  };

  return (
    <button onClick={handleCreate} disabled={isLoading}>
      {isLoading ? "Creating..." : "Create Todo"}
    </button>
  );
};
```

---

## Tips

- ✅ Use `queryKey` for automatic caching & refetching.
- ✅ Interfaces ensure type safety and auto-complete.
- ✅ Keep your API code modular inside `services/`.

---

## Bonus

You can use `queryClient.invalidateQueries(["getTodo"])` after a mutation to auto-refresh your GET data.
Already there is an example file setup you can check with services/feature.query.ts

---

## Summary

| Task               | What to do                                      |
|--------------------|-------------------------------------------------|
| Setup Base URL     | `.env` ➜ `VITE_URL_PLATFORM_API=...`           |
| GET API            | Use `useQuery` inside `yourFeature.query.ts`   |
| POST/PUT/DELETE    | Use `useMutation` inside `yourFeature.mutation.ts` |
| Interfaces         | Define request/response types in `interfaceCollection` |
| Token support      | Use `setupToken()` in `query-client.ts` if needed |
