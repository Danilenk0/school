import Header from "../../components/Header";
import ParentForm from "../../components/ParentForm"; 
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Load from "../../components/Load";
import Cookies from "js-cookie";
import Alert from "../../components/alert";

export default function EditParent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [parent, setParent] = useState({});
  const [students, setStudents] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/parent/${id}`
        );
        if (response.status === 200) {
          setParent(response.data);
        } else {
          Cookies.set("alert", {
            type: "error",
            message: "Не удалось получить данные родителя для заполнения формы",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message:
            "Не удалось получить данные родителя для заполнения формы, ошибка сервера",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/student/findAll`
        );
        if (response.status === 200) {
          setStudents(response.data);
        } else {
          Cookies.set("alert", {
            type: "error",
            message: "Не удалось получить данные студентов для заполнения формы",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message:
            "Не удалось получить данные студентов для заполнения формы, ошибка сервера",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParentData();
    fetchStudentData();
  }, [id]);
  const handleSubmitForm = async (data) => {
    try {
      data.id = id
      const response = await axios.put(
        `http://localhost:8082/api/parent/update`,
        data
      );
      if (response.status === 200) {
        Cookies.set("alert", {
          type: "success",
          message: "Данные родителя успешно обновлены",
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
    return <Navigate to="/parents" />;
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <Load />
      ) : (
        <ParentForm
          handleSubmitForm={handleSubmitForm}
            parentData={parent} 
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
