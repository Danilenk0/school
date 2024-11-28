import Header from "../../components/Header";
import RecoveryForm from "../../components/RecoveryForm"; 
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Load from "../../components/Load";
import Alert from "../../components/alert";
import Cookies from "js-cookie"; 

export default function EditRecovery() {
  const [sanatoriums, setSanatoriums] = useState([]);
  const [recovery, setRecovery] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const [students, setStudents] = useState([])
  const { id } = useParams();

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
            message: "Не удалось получить данные санаториев",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message: "Ошибка сервера при получении данных санаториев",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchstudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/student/findAll"
        );
        if (response.status === 200) {
          setStudents(response.data);
        } else {
          Cookies.set("alert", {
            type: "error",
            message: "Не удалось получить данные учеников",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message: "Ошибка сервера при получении данных учеников",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRecoveryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8084/api/recovery/${id}`
        );
        if (response.status === 200) {
          setRecovery(response.data);
        } else {
          Cookies.set("alert", {
            type: "error",
            message: "Не удалось получить данные восстановления",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message: "Ошибка сервера при получении данных восстановления",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };
fetchstudents();
    fetchSanatoriums();
    fetchRecoveryData();
  }, [id]);

  const handleSubmitForm = async (data) => {
    try {
      data.id = id;
      const response = await axios.put(
        `http://localhost:8084/api/recovery/update`,
        data
      );
      if (response.status === 200) {
        Cookies.set("alert", {
          type: "success",
          message: "Данные восстановления успешно обновлены",
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
    return <Navigate to="/recoveries" replace />;
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <Load />
      ) : (
        <RecoveryForm
          sanatoriums={sanatoriums}
          handleSubmitForm={handleSubmitForm}
            recoveryData={recovery}
            students={students}
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
