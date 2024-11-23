import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../constants";

export const MainNavigation = () => {
  return (
    <header className="flex justify-center bg-slate-500 p-6 text-gray-100 w-full">
      <nav className="flex">
        {NAV_ITEMS.map((navItem) => (
          <div className="px-3" key={navItem.path}>
            <NavLink className={({isActive}) => isActive ? 'text-amber-300':""} to={navItem.path}>{navItem.title}</NavLink>
          </div>
        ))}
      </nav>
    </header>
  );
};
