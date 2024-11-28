import Header from "../../components/Header";
import EventForm from "../../components/EventForm";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Load from "../../components/Load";
import Cookies from "js-cookie";
import Alert from "../../components/alert";

export default function EditEvent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [event, setEvent] = useState({});
  const [students, setStudents] = useState();
  const { id } = useParams();

  useEffect(() => {
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
             message:
               "Не удалось получить данные учеников для заполнения формы",
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

    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/event/${id}` 
        );
        if (response.status === 200) {
          setEvent(response.data);
        } else {
          Cookies.set("alert", {
            type: "error",
            message: "Не удалось получить данные события для заполнения формы",
          });
          setIsRedirect(true);
        }
      } catch (error) {
        Cookies.set("alert", {
          type: "error",
          message:
            "Не удалось получить данные события для заполнения формы, ошибка сервера",
        });
        setIsRedirect(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
    
     fetchStudentData();
  }, [id]);

  const handleSubmitForm = async (data) => {
    try {
      data.id = id; 
      const response = await axios.put(
        `http://localhost:8082/api/event/update`, 
        data
      );
      if (response.status === 200) {
        Cookies.set("alert", {
          type: "success",
          message: "Данные события успешно обновлены",
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
    return <Navigate to="/events" />; 
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <Load />
      ) : (
        <EventForm
          handleSubmitForm={handleSubmitForm}
          eventData={event} 
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
