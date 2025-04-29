import React,{ lazy, StrictMode, Suspense} from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";
import App from "./App";
import "./index.css";

// Loader component for Suspense fallback
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
  </div>
);

// Lazy load components
const Login= lazy(()=> import("./pages/Login"))
const Properties = lazy(() => import("./pages/Properties"));
const AdminDasboard = lazy(() => import("./pages/AdminDashboard"));

// Router configuration
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/properties",
        element: (
          <Suspense fallback={<Loader />}>
            <Properties />
          </Suspense>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <AdminDasboard />
          </Suspense>
        ),
      },
    ],
  },
]);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);