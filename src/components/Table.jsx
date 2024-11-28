import React, { useState } from "react";

export default function Table({
  headerKeyMap,
  data,
  selectedId,
  handleRowClick,
  objKeys
}) {
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "ascending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortConfig.direction === "ascending"
          ? aValue - bValue
          : bValue - aValue;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (header) => {
    const key = headerKeyMap[header];
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-auto mb-2">
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {Object.keys(headerKeyMap).map((item, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => requestSort(item)}
              >
                <div className="flex items-center justify-between gap-1">
                  <span>{item}</span>
                  {sortConfig.key === headerKeyMap[item] ? (
                    sortConfig.direction === "ascending" ? (
                      <i className="bx bx-chevron-up text-lg" />
                    ) : (
                      <i className="bx bx-chevron-down text-lg" />
                    )
                  ) : (
                    <i className="bx bx-chevron-up text-lg opacity-0" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={item.id}
              className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100 duration-200 ${
                selectedId.includes(item.id) ? "bg-slate-100" : ""
              }`}
              onClick={() => handleRowClick(item.id)}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              {Object.entries(headerKeyMap).map(
                ([header, key]) =>
                  key !== "id" && (
                    <td key={key} className="px-6 py-4">
                      {Array.isArray(item[key]) ? (
                        <ul className="list-disc list-inside">
                          {item[key].map((val, index) => (
                            <li key={index}>
                              {typeof val === "object" && val !== null ? (
                                <ul>
                                  <li key={key}>
                                    {objKeys.map((key, index) => (
                                      <p>{val[key]} </p>
                                    ))}
                                  </li>
                                </ul>
                              ) : (
                                val
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : typeof item[key] === "boolean" ? (
                        item[key] ? (
                          "Да"
                        ) : (
                          "Нет"
                        )
                      ) : typeof item[key] === "object" &&
                        item[key] !== null ? (
                        <ul className="list-disc list-inside">
                          <li key={key}>
                            {objKeys.map((keyItem, index) => (
                              <p>{item[key][keyItem]} </p>
                            ))}
                          </li>
                        </ul>
                      ) : (
                        item[key]
                      )}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
