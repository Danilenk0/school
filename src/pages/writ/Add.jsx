import Header from "../../components/Header";
import WritForm from "../../components/WritForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Load from "../../components/Load";
import Alert from "../../components/alert";

export default function AddWrit() {
  const [writTypes, setWritTypes] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    const fetchTypeWrits = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/api/typeWrit/findAll"
        );
        if (response.status === 200) {
          setWritTypes(response.data);
        } else {
          setAlert({
            type: "error",
            message: "Не удалось получить список типов записи",
          });
        }
      } catch (error) {
        setAlert({
          type: "error",
          message: "Ошибка сервера при получении списка типов записи",
        });
      }
    };

    fetchTypeWrits();
  }, []);

  const handleSubmitForm = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8085/api/writ/save`,
        data
      );

      if (response.status === 201) {
        Cookies.set("alert", {
          type: "success",
          message: "Запись успешно добавлена",
        });
        setIsRedirect(true);
      } else {
        setAlert({
          type: "error",
          message: "Не удалось добавить запись, повторите попытку",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Не удалось добавить запись, ошибка сервера",
      });
    }
  };

  if (isRedirect) {
    return <Navigate to="/writ" />;
  }

  return (
    <>
      <Header />
      <WritForm handleSubmitForm={handleSubmitForm} writTypes={writTypes} />
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
