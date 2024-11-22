import { Await, Outlet, defer, useLoaderData } from "react-router-dom";
import { mockFetch } from "../utils/api";
import { LinkButton } from "../components/LinkButton";
import { Tabs } from "../components/Tabs";
import { Suspense } from "react";
import { Loader } from "../components/Loader";

const TABS = [
  {
    path: "",
    title: "About book",
  },
  {
    path: "author",
    title: "About author",
  },
];

export const bookLoader = ({ params: { id } }) => {
  const book = mockFetch(`/books/${id}`);
  return defer({
    book,
  });
};

export const BookDetails = () => {
  const { book } = useLoaderData();

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={book}>
        {({ imageUrl, title, description }) => (
          <div className="card-container mt-10">
            <div className="flex flex-col">
              <div className="w-full">
                <img
                  className="h-[250] w-full object-cover"
                  src={imageUrl}
                  alt="book"
                />
              </div>
              <div className="p-8">
                <div className="content-type">Книга</div>
                <div className="book-title">{title}</div>
                <p className="mt-2 text-slate-500 mb-6">{description}</p>
                <Tabs tabs={TABS} />
                <Outlet />
                <LinkButton to="start-book" title="Start book" />
              </div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};
