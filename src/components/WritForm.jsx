import Input from "../components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const validationSchema = Yup.object().shape({
  date: Yup.date().required("Обязательное поле"),
  idTypeWrit: Yup.string().required("Обязательное поле"),
});

export default function WritForm({
  handleSubmitForm,
  writData = null,
  writTypes = [],
}) {
  const formik = useFormik({
    initialValues: {
      date: writData?.date || "",
      idTypeWrit: writData?.idTypeWrit || "",
    },
    validationSchema,
    onSubmit: handleSubmitForm,
  });

  return (
    <section className="w-3/4 m-auto mt-10 bg-white p-10 rounded-md mb-10">
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-full">
          <Input
            {...formik.getFieldProps("date")}
            error={formik.errors.date}
            type="date"
          >
            Дата
          </Input>

          <div className="mt-4">
            <label
              htmlFor="idTypeWrit"
              className="block text-sm font-medium text-gray-700"
            >
              Тип записи
            </label>
            <select
              id="idTypeWrit"
              {...formik.getFieldProps("idTypeWrit")}
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 focus:outline-none ${
                formik.errors.idTypeWrit ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" label="Выберите тип записи" />
              {writTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.title}
                </option>
              ))}
            </select>
            {formik.errors.idTypeWrit && (
              <div className="text-red-500 text-sm">
                {formik.errors.idTypeWrit}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5"
        >
          {writData ? "Редактировать" : "Сохранить"}
        </button>
      </form>
    </section>
  );
}
