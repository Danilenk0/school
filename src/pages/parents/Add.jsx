import Header from "../../components/Header";
import ParentForm from "../../components/ParentForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Load from "../../components/Load";
import Alert from "../../components/alert";

export default function AddParent() {
  const [students, setStudents] = useState([]); 
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/student/findAll"
        );
        if (response.status === 200) {
          setStudents(response.data);
        } else {
          setAlert({
            type: "error",
            message: "Не удалось получить список учеников",
          });
        }
      } catch (error) {
        setAlert({
          type: "error",
          message: "Ошибка сервера при получении списка учеников",
        });
      }
    };

    fetchStudents();
  }, []);

  const handleSubmitForm = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8082/api/parent/save`,
        data
      );

      if (response.status === 201) {
        Cookies.set("alert", {
          type: "success",
          message: "Данные родителя успешно добавлены",
        });
        setIsRedirect(true);
      } else {
        setAlert({
          type: "error",
          message: "Не удалось добавить данные, повторите попытку",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Не удалось добавить данные, ошибка сервера",
      });
    }
  };

  if (isRedirect) {
    return <Navigate to="/parents" />;
  }

  return (
    <>
      <Header />
      <ParentForm
        handleSubmitForm={handleSubmitForm}
        students={students} 
      />
      {alert.message && (
        <Alert
          handleClearAlert={setAlert}
          type={alert.type}
          message={alert.message}
        />
      )}
    </>
  );
}
