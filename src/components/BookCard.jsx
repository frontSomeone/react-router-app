import { Link } from "react-router-dom";
import { ROUTES } from "../constants";

export const BookCard = ({ imageUrl, title, id, description }) => {
  return (
    <div className="card-container">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={imageUrl}
            alt="book"
          />
        </div>
        <div className="p-8">
          <div className="content-type">
            Книга
          </div>

          <Link to={`${ROUTES.books}/${id}`} className="book-link">
            {title}
          </Link>

          <p className="mt-2 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
