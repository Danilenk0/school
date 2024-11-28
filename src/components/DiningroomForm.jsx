import React from "react";
import Input from "../components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  date: Yup.date().required("Дата обязательна"),
  countExtendedDay: Yup.number()
    .required("Количество продленных дней обязательно")
    .min(0, "Не может быть меньше 0"),
  countDiet: Yup.number()
    .required("Количество диет обязательно")
    .min(0, "Не может быть меньше 0"),
  totalCount: Yup.number()
    .required("Общее количество обязательно")
    .min(0, "Не может быть меньше 0"),
  groupUUID: Yup.string().required("Группа обязательна"),
});

export default function RecoveryForm({
  classes,
  recoveryData = null,
  handleSubmitForm,
}) {
  const formik = useFormik({
    initialValues: {
      date: recoveryData?.date || "",
      countExtendedDay: recoveryData?.countExtendedDay || 0,
      countDiet: recoveryData?.countDiet || 0,
      totalCount: recoveryData?.totalCount || 0,
      groupUUID: recoveryData?.groupUUID || "",
    },
    validationSchema,
    onSubmit: handleSubmitForm,
    enableReinitialize: true,
  });

  return (
    <section className="w-3/4 m-auto mt-10 bg-white p-10 rounded-md mb-10">
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <Input
            {...formik.getFieldProps("date")}
            error={formik.errors.date}
            type="date"
          >
            Дата
          </Input>
          <Input
            {...formik.getFieldProps("countExtendedDay")}
            error={formik.errors.countExtendedDay}
            type="number"
          >
            Количество продленных дней
          </Input>
          <Input
            {...formik.getFieldProps("countDiet")}
            error={formik.errors.countDiet}
            type="number"
          >
            Количество диет
          </Input>
          <Input
            {...formik.getFieldProps("totalCount")}
            error={formik.errors.totalCount}
            type="number"
          >
            Общее количество
          </Input>
        </div>

        <SelectInput
          name="groupUUID"
          value={formik.values.groupUUID}
          onChange={formik.handleChange}
          title={"Выберите группу"}
          options={classes.map((item) => ({
            value: item.id,
            label: item.letter + item.number,
          }))}
        />

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

const SelectInput = ({ name, value, onChange, options, title }) => (
  <div className="w-full mx-auto mt-4">
    <select
      className="block py-2.5 px-3 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300"
      name={name}
      onChange={onChange}
      value={value}
    >
      <option value="" disabled>
        {title}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
