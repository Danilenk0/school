import Input from "../components/Input";
import CheckBox from "../components/CheckBox";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required(" ").min(2, " ").max(20),
  lastname: Yup.string().required(" ").min(2, " ").max(20),
  surname: Yup.string().required(" ").min(2, " ").max(20),
  birthdate: Yup.date().required(" "),
  phone: Yup.string().required(" ").min(5, " ").max(15),
  registrationStreet: Yup.string().required(" ").min(2, " ").max(20),
  registrationHouse: Yup.number().required(" ").min(1, " ").max(100),
  registrationApartment: Yup.number().required(" ").min(1, " ").max(100),
  residentialStreet: Yup.string().min(2, " ").max(20).nullable(),
  residentialHouse: Yup.number().min(1, " ").max(100).nullable(),
  residentialApartment: Yup.number().min(1, " ").max(100).nullable(),
  dateOfEnrollment: Yup.date().required(" "),
  pioneerOrganization: Yup.string().required(" "),
});

export default function StudentForm({
  classes,
  studentData = null,
  handleSubmitForm,
}) {
  const formik = useFormik({
    initialValues: {
      firstname: studentData?.firstname || "",
      lastname: studentData?.lastname || "",
      surname: studentData?.surname || "",
      birthdate:  studentData?.birthdate, 
      phone: studentData?.phone || "",
      registrationStreet: studentData?.registrationStreet || "",
      registrationHouse: studentData?.registrationHouse || "",
      registrationApartment: studentData?.registrationApartment || "",
      residentialStreet: studentData?.residentialStreet || "",
      residentialHouse: studentData?.residentialHouse || "",
      residentialApartment: studentData?.residentialApartment || "",
      dateOfEnrollment: studentData?.dateOfEnrollment || "",
      pioneerOrganization: studentData?.pioneerOrganization || "",
      sanatoriumCurrentYear: studentData?.sanatoriumCurrentYear || false,
      idClass: studentData?.idClass || "",
      familyStatus: studentData?.familyStatus || [],
    },
    validationSchema,
    onSubmit: handleSubmitForm,
    enableReinitialize: true,
  });

  const handleFamilyStatusChange = (status) => {
    const { familyStatus } = formik.values;
    const updatedFamilyStatus = familyStatus.includes(status)
      ? familyStatus.filter((item) => item !== status)
      : [...familyStatus, status];

    formik.setFieldValue("familyStatus", updatedFamilyStatus);
  };

  return (
    <section className="w-3/4 m-auto mt-10 bg-white p-10 rounded-md mb-10">
      <div className="flex gap-10">
        <div className="flex-none w-72 mr-5">
          <img
            src="/images/profile_default.png"
            alt="Profile"
            className="w-full h-auto"
          />
        </div>
        <form className="w-full justify-between" onSubmit={formik.handleSubmit}>
          <div className="grid md:grid-cols-3 gap-6 w-full">
            <Input
              {...formik.getFieldProps("firstname")}
              error={formik.errors.firstname}
            >
              Имя
            </Input>
            <Input
              {...formik.getFieldProps("lastname")}
              error={formik.errors.lastname}
            >
              Фамилия
            </Input>
            <Input
              {...formik.getFieldProps("surname")}
              error={formik.errors.surname}
            >
              Отчество
            </Input>
          </div>
          <div className="grid md:grid-cols-2 gap-6 w-full">
            <Input
              {...formik.getFieldProps("birthdate")}
              error={formik.errors.birthdate}
              type="date"
            >
              Дата рождения
            </Input>
            <Input
              {...formik.getFieldProps("phone")}
              error={formik.errors.phone}
              type="tel"
            >
              Номер телефона
            </Input>
          </div>
          <AddressSection
            title="Адрес прописки"
            formik={formik}
            prefix="registration"
          />
          <AddressSection
            title="Адрес фактического проживания"
            formik={formik}
            prefix="residential"
          />
          <div className="grid md:grid-cols-4 gap-6 w-full mt-10">
            <Input
              {...formik.getFieldProps("dateOfEnrollment")}
              error={formik.errors.dateOfEnrollment}
              type="date"
            >
              Дата поступления
            </Input>
            <SelectInput
              name="pioneerOrganization"
              value={formik.values.pioneerOrganization}
              onChange={formik.handleChange}
              title={"Пионерская организация"}
              options={["БРСМ", "Пионеры", "Октябрята"].map((org) => ({
                value: org,
                label: org,
              }))}
              placeholder="Выберите пионерскую организацию"
            />
            <CheckBox
              {...formik.getFieldProps("sanatoriumCurrentYear")}
              name="sanatoriumCurrentYear"
            >
              Оздаровлялся(ась) в текущем году
            </CheckBox>
            <SelectInput
              name="idClass"
              value={formik.values.idClass}
              onChange={formik.handleChange}
              title={"Выберите класс"}
              options={classes.map((item) => ({
                value: item.id,
                label: item.number + " " + item.letter,
              }))}
            />
          </div>
          <FamilyStatusSection
            formik={formik}
            onChange={handleFamilyStatusChange}
          />
          <button
            type="submit"
            className="self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5"
          >
            {studentData ? "Редактировать" : "Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}

const AddressSection = ({ title, formik, prefix }) => (
  <div className="flex flex-col mt-7">
    <div className="mb-7">
      <p className="font-medium text-sm text-gray-500">{title}</p>
    </div>
    <div className="grid grid-cols-3 md:gap-6">
      <Input
        {...formik.getFieldProps(`${prefix}Street`)}
        error={formik.errors[`${prefix}Street`]}
        type="text"
      >
        Улица
      </Input>
      <Input
        {...formik.getFieldProps(`${prefix}House`)}
        error={formik.errors[`${prefix}House`]}
        type="number"
      >
        Дом
      </Input>
      <Input
        {...formik.getFieldProps(`${prefix}Apartment`)}
        error={formik.errors[`${prefix}Apartment`]}
        type="number"
      >
        Квартира
      </Input>
    </div>
  </div>
);

const SelectInput = ({ name, value, onChange, options, title }) => (
  <div className="w-full mx-auto">
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

const FamilyStatusSection = ({ formik, onChange }) => (
  <div className="flex flex-col mt-4">
    <label className="text-sm font-medium text-gray-500 mb-3">
      Семейный статус
    </label>
    <div className="grid grid-cols-4">
      {[
        "Неполная семья",
        "Семья с опекунством",
        "Семья с особыми обстоятельствами",
        "Социально опасное положение",
      ].map((status) => (
        <CheckBox
          key={status}
          checked={formik.values.familyStatus.includes(status)}
          onChange={() => onChange(status)}
          name="familyStatus"
        >
          {status}
        </CheckBox>
      ))}
    </div>
  </div>
);
