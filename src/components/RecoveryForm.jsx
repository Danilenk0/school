import Input from "../components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";



const validationSchema = Yup.object().shape({
  startDate: Yup.date().required(" "),
  endDate: Yup.date().required(" "),
  idStudent: Yup.string().required("Необходимо выбрать ученика"),
  idSanatorium: Yup.string().required(" "),
});

export default function RecoveryForm({
  sanatoriums,
  students,
  recoveryData = null,
  handleSubmitForm,
}) {
  const [search, setSearch] = useState("");

  const formik = useFormik({
    initialValues: {
      startDate: recoveryData?.startDate || "",
      endDate: recoveryData?.endDate || "",
      idStudent: recoveryData?.idStudent || "",
      idSanatorium: recoveryData?.idSanatorium || "",
    },
    validationSchema,
    onSubmit: handleSubmitForm,
    enableReinitialize: true,
  });

  const handleSelectStudent = (studentId) => {
    formik.setFieldValue("idStudent", studentId);
    setSearch("");
  };

const selectedStudent =
  students?.find((student) => student.id === formik.values.idStudent) || null;

  const filteredStudents = Array.isArray(students)
    ? students.filter((student) =>
        `${student.firstname} ${student.lastname}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  return (
    <section className="w-3/4 m-auto mt-10 bg-white p-10 rounded-md mb-10">
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <Input
            {...formik.getFieldProps("startDate")}
            error={formik.errors.startDate}
            type="date"
          >
            Дата начала
          </Input>
          <Input
            {...formik.getFieldProps("endDate")}
            error={formik.errors.endDate}
            type="date"
          >
            Дата окончания
          </Input>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Поиск ученика
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Введите имя или фамилию"
            />
            {search && filteredStudents.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto border border-gray-300 bg-white rounded-md shadow-lg">
                {filteredStudents.map((student) => (
                  <li
                    key={student.id}
                    className="cursor-pointer hover:bg-blue-100 p-2 transition duration-150 ease-in-out"
                    onClick={() => handleSelectStudent(student.id)}
                  >
                    {student.firstname} {student.lastname}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Выбранный ученик
          </label>
          {selectedStudent ? (
            <div className="flex justify-between items-center p-2 border border-gray-300 rounded-md">
              {selectedStudent.firstname} {selectedStudent.lastname}
              <button
                type="button"
                className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
                onClick={() => handleSelectStudent("")}
              >
                <i className="bx bx-x text-lg"></i>
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Ученик не выбран</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full mt-10">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Выберите санаторий
            </label>
            <select
              name="idSanatorium"
              value={formik.values.idSanatorium}
              onChange={formik.handleChange}
              className={`block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none ${
                formik.errors.idSanatorium
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="" label="Выберите санаторий" />
              {sanatoriums.map((sanatorium) => (
                <option key={sanatorium.id} value={sanatorium.id}>
                  {sanatorium.title} {sanatorium.city}
                </option>
              ))}
            </select>
            {formik.errors.idSanatorium && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.idSanatorium}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5"
        >
          {recoveryData ? "Редактировать" : "Сохранить"}
        </button>
      </form>
    </section>
  );
}
