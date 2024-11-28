import Header from "../../components/Header";
import WritForm from "../../components/WritForm";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Load from "../../components/Load";
import Cookies from "js-cookie";
import Alert from "../../components/alert";

export default function EditWrit() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [writ, setWrit] = useState({});
  const [writTypes, setWritTypes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchWritData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8085/api/writ/${id}`
        );
        if (response.status === 200) {
          setWrit(response.data);
        } else {
          Cookies.set("alert", {
            type: "error",
            message: "Не удалось получить данные записи для заполнения формы",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message:
            "Не удалось получить данные записи для заполнения формы, ошибка сервера",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTypeWrits = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8085/api/typeWrit/findAll`
        );
        if (response.status === 200) {
          setWritTypes(response.data);
        } else {
          Cookies.set("alert", {
            type: "error",
            message:
              "Не удалось получить данные типов записи для заполнения формы",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message:
            "Не удалось получить данные типов записи для заполнения формы, ошибка сервера",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWritData();
    fetchTypeWrits();
  }, [id]);

  const handleSubmitForm = async (data) => {
    try {
      data.id = id; 
      const response = await axios.put(
        `http://localhost:8085/api/writ/update`,
        data
      );
      if (response.status === 200) {
        Cookies.set("alert", {
          type: "success",
          message: "Данные записи успешно обновлены",
        });
        setIsRedirect(true);
      } else {
        setAlert({
          type: "error",
          message: "Не удалось обновить данные, повторите попытку",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Не удалось обновить данные, ошибка сервера",
      });
    }
  };

  if (isRedirect) {
    return <Navigate to="/writ" />;
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <Load />
      ) : (
        <WritForm
          handleSubmitForm={handleSubmitForm}
          writData={writ}
          writTypes={writTypes}
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
