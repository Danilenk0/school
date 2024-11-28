import Input from "../components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Обязательное поле")
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов"),
  date: Yup.date()
    .required("Обязательное поле")
    .nullable()
    .typeError("Неверная дата"),
});

export default function EventForm({
  handleSubmitForm,
  eventData = null,
  students = [],
}) {
  const formik = useFormik({
    initialValues: {
      title: eventData?.title || "",
      date: eventData?.date || "",
      studentUUID: eventData?.studentUUID || [],
    },
    validationSchema,
    onSubmit: handleSubmitForm,
  });

  const [selectedStudents, setSelectedStudents] = useState(
    eventData?.studentUUID || []
  );

  useEffect(() => {
    if (eventData) {
      const studentsList = eventData.studentUUID || [];
      setSelectedStudents(studentsList);
      formik.setFieldValue("studentUUID", studentsList);
    }
  }, [eventData]);

  const handleSelectStudent = (studentId) => {
    if (!selectedStudents.includes(studentId)) {
      const updatedSelected = [...selectedStudents, studentId];
      setSelectedStudents(updatedSelected);
      formik.setFieldValue("studentUUID", updatedSelected);
    }
    setSearch("");
  };

  const handleRemoveStudent = (studentId) => {
    const updatedSelected = selectedStudents.filter((id) => id !== studentId);
    setSelectedStudents(updatedSelected);
    formik.setFieldValue("studentUUID", updatedSelected);
  };

  const [search, setSearch] = useState("");
  const filteredStudents = students.filter((student) =>
    `${student.firstname} ${student.lastname}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="w-3/4 m-auto mt-10 bg-white p-10 rounded-md mb-10">
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="grid md:grid-cols-1 gap-6 w-full">
          <Input {...formik.getFieldProps("title")} error={formik.errors.title}>
            Название
          </Input>
          <Input
            {...formik.getFieldProps("date")}
            error={formik.errors.date}
            type="date"
          >
            Дата
          </Input>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Поиск учеников
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
            Выбранные ученики
          </label>
          <ul className="mt-2 border border-gray-300 rounded-md">
            {selectedStudents.map((studentId) => {
              const student = students.find((s) => s.id === studentId);
              return (
                <li
                  key={studentId}
                  className="flex justify-between items-center p-2 border-b last:border-b-0 hover:bg-gray-100"
                >
                  {student?.firstname} {student?.lastname}
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
                    onClick={() => handleRemoveStudent(studentId)}
                  >
                    <i className="bx bx-x text-lg "></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="submit"
          className="self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5"
        >
          {eventData ? "Редактировать" : "Создать"}
        </button>
      </form>
    </section>
  );
}
