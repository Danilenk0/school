import { Link } from "react-router-dom";

export default function Paginate({ totalPages, currentPage, onPageChange }) {
  return (
    <nav
      className="w-3/4 m-auto fixed bottom-[20px] left-[20px]"
      aria-label="Page navigation example"
    >
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            className={`flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
            aria-disabled={currentPage === 1}
          >
            Предыдущая
          </Link>
        </li>

        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(index + 1);
              }}
              className={`flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 ${
                currentPage === index + 1
                  ? "bg-gray-200 font-bold"
                  : "hover:bg-gray-200 hover:text-gray-500"
              }     `}
            >
              {index + 1}
            </Link>
          </li>
        ))}

        <li>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            className={`flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
            aria-disabled={currentPage === totalPages}
          >
            Следующая
          </Link>
        </li>
      </ul>
    </nav>
  );
}
