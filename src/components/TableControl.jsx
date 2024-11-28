import React from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  AlignmentType,
} from "docx";

export default function TableControl({
  addPath,
  selectedIdStudents,
  handleOpenModal,
  data,
  headerKeyMap,
  searchString,
  setSearchString,
}) {
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: Object.values(headerKeyMap),
    });

    Object.keys(headerKeyMap).forEach((header, index) => {
      const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: index })];
      cell.v = header;
      cell.s = {
        font: { bold: true },
        alignment: { horizontal: "center" },
      };
    });

    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let r = range.s.r; r <= range.e.r; r++) {
      for (let c = range.s.c; c <= range.e.c; c++) {
        const cell = worksheet[XLSX.utils.encode_cell({ r, c })];
        if (cell) {
          cell.s = {
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
            alignment: { horizontal: "center" },
          };
        }
      }
    }

    const colWidth = [];
    for (let c = range.s.c; c <= range.e.c; c++) {
      let maxWidth = 10;
      for (let r = range.s.r; r <= range.e.r; r++) {
        const cell = worksheet[XLSX.utils.encode_cell({ r, c })];
        if (cell && cell.v) {
          const cellWidth = cell.v.toString().length;
          if (cellWidth > maxWidth) maxWidth = cellWidth;
        }
      }
      colWidth[c] = { wpx: maxWidth * 10 };
    }
    worksheet["!cols"] = colWidth;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "Students.xlsx");
  };
  // const handleExportToWord = () => {
  //   const doc = new Document({
  //     sections: [
  //       {
  //         properties: {},
  //         children: [],
  //       },
  //     ],
  //   });

  //   const rows = [];

  //   const headers = Object.keys(headerKeyMap).map(
  //     (header) =>
  //       new TableCell({
  //         children: [
  //           new Paragraph({
  //             text: header,
  //             bold: true,
  //             alignment: AlignmentType.CENTER,
  //           }),
  //         ],
  //         width: { size: 4000, type: WidthType.DXA },
  //       })
  //   );

  //   rows.push(
  //     new TableRow({
  //       children: headers,
  //     })
  //   );

  //   data.forEach((item) => {
  //     const cells = Object.values(headerKeyMap).map((key) => {
  //       return new TableCell({
  //         children: [
  //           new Paragraph({
  //             text: item[key] || "",
  //             alignment: AlignmentType.CENTER,
  //           }),
  //         ],
  //         width: { size: 4000, type: WidthType.DXA },
  //       });
  //     });
  //     rows.push(new TableRow({ children: cells }));
  //   });

  //   const table = new Table({
  //     rows: rows,
  //     width: { size: "full", type: WidthType.DXA },
  //   });

  //   doc.addSection({
  //     children: [table],
  //   });

  //   // Генерируем файл
  //   Packer.toBlob(doc).then((blob) => {
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "Students.docx";
  //     a.click();
  //     URL.revokeObjectURL(url);
  //   });
  // };

  return (
    <div className="w-3/4 m-auto mt-6 mb-2 flex align-baseline justify-between duration-200">
      <div className="flex align-baseline gap-4">
        <Link
          to={addPath + "add"}
          className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform"
        >
          Добавить <i className="bx bx-plus ml-2"></i>
        </Link>
        <div
          className={`flex gap-1 border-l-2 transition-opacity duration-300 transform ${
            selectedIdStudents.length > 0 ? "opacity-100 " : "opacity-0 "
          }`}
          style={{
            pointerEvents: selectedIdStudents.length > 0 ? "auto" : "none",
          }}
        >
          <button
            onClick={handleOpenModal}
            className={`flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white font-semibold ${
              selectedIdStudents.length > 1 ? "opacity-0 " : "opacity-100 "
            } py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform`}
          >
            Удалить <i className="bx bx-minus ml-2"></i>
          </button>
          <Link
            to={`${addPath}edit/${selectedIdStudents}`}
            className={`flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform ${
              selectedIdStudents.length > 1 ? "opacity-0 " : "opacity-100 "
            }`}
          >
            Редактировать <i className="bx bx-edit-alt ml-2"></i>
          </Link>
        </div>
      </div>
      <div className="flex align-baseline gap-2">
        {/* <button
          onClick={handleExportToWord}
          className={`flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform ${
            selectedIdStudents.length > 0 || !data.length > 0
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          WORD <i className="bx bxs-file-doc ml-2"></i>
        </button> */}
        <button
          onClick={handleExportToExcel}
          className={`flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 transform ${
            selectedIdStudents.length > 0 || !data.length > 0
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          EXCEL <i className="bx bxs-file-doc ml-2"></i>
        </button>
        <input
          type="text"
          name="searchString"
          value={searchString}
          placeholder="Поиск..."
          onChange={(e) => setSearchString(e.target.value)}
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
            data.length < 2 ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
}
