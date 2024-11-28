import Header from "../../components/Header";
import RecoveryForm from "../../components/RecoveryForm"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Load from "../../components/Load";
import Alert from "../../components/alert";

export default function AddRecovery() {
  const [sanatoriums, setSanatoriums] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchSanatoriums = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8084/api/sanatorium/findAll"
        );
        if (response.status === 200) {
          setSanatoriums(response.data);
        } else {
          Cookies.set("alert", {
            type: "error",
            message: "Не удалось получить данные санаториев для создания формы",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message:
            "Не удалось получить данные санаториев для создания формы, ошибка сервера",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/student/findAll"
        );
        if (response.status === 200) {
          setStudents(response.data); 
        } else {
          Cookies.set("alert", {
            type: "error",
            message: "Не удалось получить данные студентов для создания формы",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message:
            "Не удалось получить данные студентов для создания формы, ошибка сервера",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
    fetchSanatoriums();
  }, []);

  const handleSubmitForm = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8084/api/recovery/save`,
        data
      );

      if (response.status === 201) {
        Cookies.set("alert", {
          type: "success",
          message: "Данные восстановления успешно добавлены",
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
        message:
          error.response?.data?.error ||
          "Не удалось добавить данные, ошибка сервера", 
      });
    }
  };

  if (isRedirect) {
    return <Navigate to="/recoveries" />;
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <Load />
      ) : (
        <RecoveryForm
            sanatoriums={sanatoriums}
            students={students}
          handleSubmitForm={handleSubmitForm}
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
