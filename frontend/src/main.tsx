import { ClerkProvider } from "@clerk/clerk-react";
import { PrimeReactProvider } from "primereact/api";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Finances from "./screens/finances/finances.tsx";

const router = createBrowserRouter([
  { path: "/finances", element: <Finances /> },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <PrimeReactProvider>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </ClerkProvider>
  </StrictMode>
);
