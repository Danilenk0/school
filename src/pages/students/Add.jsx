import Header from "../../components/Header";
import StudentForm from "../../components/StudentsForm"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Load from '../../components/Load';
import Alert from "../../components/alert";

export default function Add() {
  const [classes, setClasses] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8083/api/group/findAll"
        );
        if (response.status === 200) {
          setClasses(response.data);
        } else {
          Cookies.set('alert', { type: 'error', message: 'Не удалось получить данные классов для создания формы' })
          setIsRedirect(true)
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message: "Не удалось получить данные классов для создания формы, ошибка сервера",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  

 const handleSubmitForm = async (data) => {
   try {
     const response = await axios.post(
       `http://localhost:8082/api/student/save`,
       data
     );

     if (response.status === 201) {
       Cookies.set("alert", {
         type: "success",
         message: "Данные ученика успешно добавлены",
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
    return <Navigate to="/students" />;
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <Load />
      ) : (
        <StudentForm classes={classes} handleSubmitForm={handleSubmitForm} />
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
