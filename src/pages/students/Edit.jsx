import Header from "../../components/Header";
import StudentForm from "../../components/StudentsForm";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Load from "../../components/Load";
import Alert from "../../components/alert";
import Cookies from "js-cookie"; 

export default function Edit() {
  const [classes, setClasses] = useState([]);
  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8083/api/group/findAll"
        );
        if (response.status === 200) {
          setClasses(response.data);
        } else {
          Cookies.set("alert", {
            type: "error",
            message: "Не удалось получить данные классов для создания формы",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message:
            "Не удалось получить данные классов для создания формы, ошибка сервера",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/student/${id}`
        );
        if (response.status === 200) {
          setStudent(response.data);
        } else {
          Cookies.set("alert", {
            type: "error",
            message: "Не удалось получить данные ученика для заполнения формы",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message:
            "Не удалось получить данные ученика для заполнения формы, ошибка сервера",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
    fetchStudentData();
  }, [id]);

  const handleSubmitForm = async (data) => {
    try {
      data.id = id;
      const response = await axios.put(
        `http://localhost:8082/api/student/update`,
        data
      );
      if (response.status === 200) {
        Cookies.set("alert", {
          type: "success",
          message: "Данные успешно обновлены",
        });
        setIsRedirect(true);
      } else {
        setAlert({
          type: "error",
          message: "Не удалось обновить данные, повторите попытку",
        });
      }
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
      setAlert({
        type: "error",
        message: "Ошибка сервера. Попробуйте позже.",
      });
    }
  };

  if (isRedirect) {
    return <Navigate to="/students" replace />;
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <Load />
      ) : (
        <StudentForm
          classes={classes}
          handleSubmitForm={handleSubmitForm}
          studentData={student}
        />
      )}
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
