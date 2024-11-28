import Header from "../../components/Header";
import EventForm from "../../components/EventForm"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Load from "../../components/Load";
import Alert from "../../components/alert";

export default function AddEvent() {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isRedirect, setIsRedirect] = useState(false);
  const [students, setStudents] = useState();

useEffect(() => {
  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/student/findAll`);
      if (response.status === 200) {
        setStudents(response.data);
      } else {
        Cookies.set("alert", {
          type: "error",
          message: "Не удалось получить данные учеников для заполнения формы",
        });
        setIsRedirect(true);
      }
    } catch (error) {
      Cookies.set("alert", {
        type: "error",
        message:
          "Не удалось получить данные учеников для заполнения формы, ошибка сервера",
      });
      setIsRedirect(true);
    } finally {
      setIsLoading(false);
    }
  };

  fetchStudentData();
}, []);

  const handleSubmitForm = async (data) => {
    try {
      console.log(data)
      const response = await axios.post(
        `http://localhost:8082/api/event/save`, 
        data
      );

      if (response.status === 201) {
        Cookies.set("alert", {
          type: "success",
          message: "Событие успешно добавлено",
        });
        setIsRedirect(true);
      } else {
        setAlert({
          type: "error",
          message: "Не удалось добавить событие, повторите попытку",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Не удалось добавить событие, ошибка сервера",
      });
    }
  };

  if (isRedirect) {
    return <Navigate to="/events" />; 
  }

  return (
    <>
      <Header />
      <EventForm handleSubmitForm={handleSubmitForm} students={students} />
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
