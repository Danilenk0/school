// Breadcrumbs.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import translations from "./translations";

const isUUID = (segment) => {
  // Регулярное выражение для проверки формата UUID
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(segment);
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Фильтруем сегменты, исключая числовые и UUID
  const filteredSegments = pathSegments.filter(
    (segment) => isNaN(segment) && !isUUID(segment)
  );

  return (
    <nav aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            {translations.home}
          </Link>
        </li>
        {filteredSegments.map((segment, index) => {
          const isLast = index === filteredSegments.length - 1;
          const href = `/${filteredSegments.slice(0, index + 1).join("/")}`;

          return (
            <li key={index} className="inline-flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              {isLast ? (
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  {translations[segment] ||
                    segment.charAt(0).toUpperCase() + segment.slice(1)}
                </span>
              ) : (
                <Link
                  to={href}
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {translations[segment] ||
                    segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
