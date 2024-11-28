import Header from "../../components/Header";
import DiningroomForm from "../../components/DiningroomForm";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Load from "../../components/Load";
import Alert from "../../components/alert";
import Cookies from "js-cookie";

export default function EditDiningroom() {
  const [classes, setClasses] = useState([]);
  const [diningroom, setDiningroom] = useState({});
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

    const fetchDiningroomData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8083/api/application/${id}`
        );
        if (response.status === 200) {
          setDiningroom(response.data);
        } else {
          Cookies.set("alert", {
            type: "error",
            message: "Не удалось получить данные столовой для заполнения формы",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message:
            "Не удалось получить данные столовой для заполнения формы, ошибка сервера",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
    fetchDiningroomData();
  }, [id]);

  diningroom;

  const handleSubmitForm = async (data) => {
    try {
      data.id = id;
      const response = await axios.put(
        `http://localhost:8083/api/application/update`,
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
    return <Navigate to="/diningroom" replace />;
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <Load />
      ) : (
        <DiningroomForm
          classes={classes}
          handleSubmitForm={handleSubmitForm}
          recoveryData={diningroom}
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
