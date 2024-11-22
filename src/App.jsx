import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { BaseLayout } from "./components/BaseLayout";
import { AboutPage } from "./pages/AboutPage";
import { BookDetails, bookLoader } from "./pages/BookDeatilsPage";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import { ROUTES } from "./constants";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserPage } from "./pages/UserPage";
import { Loader } from "./components/Loader";
import { BookDescription } from "./components/BookDescription";
import { BookAuthor } from "./components/BookAuthor";
import { StartBookPage, startBookAction } from "./pages/StartBookPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />

      <Route
        path="books/:id"
        element={<BookDetails />}
        loader={bookLoader}
      >
        <Route index element={<BookDescription />} />
        <Route path="author" element={<BookAuthor />} />
      </Route>

      <Route
        path="books/:id/start-book"
        element={<StartBookPage />}
        action={startBookAction}
      />

      <Route
        path="books"
        fallbackElement={<Loader />}
        lazy={() =>
          import("./pages/BooksPage").then((module) => ({
            Component: module.BooksPage,
            loader: module.booksLoader,
          }))
        }
      />

      <Route
        path={ROUTES.user}
        element={
          <ProtectedRoute isAllowed={false}>
            <UserPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

export default App;
