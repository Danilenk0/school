import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Paginate from "../../components/Paginate";
import TableControl from "../../components/TableControl";
import ActionModal from "../../components/ActionModal";
import Alert from "../../components/alert.jsx";
import Table from "../../components/Table.jsx";
import axios from "axios";
import cookie from "js-cookie";
import Load from "../../components/Load.jsx";

export default function Main() {
  const [selectedIdStudents, setSelectedIdStudents] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const headerKeyMap = {
    "№": "id",
    Имя: "firstname",
    Фамилия: "lastname",
    Отчество: "surname",
    "Дата рождения": "birthdate",
    Телефон: "phone",
    "Улица рег.": "registrationStreet",
    "Дом рег.": "registrationHouse",
    "Кв. рег.": "registrationApartment",
    "Улица прож.": "residentialStreet",
    "Дом прож.": "residentialHouse",
    "Кв. прож.": "residentialApartment",
    "Дата зачисления": "dateOfEnrollment",
    "Пионерская организация": "pioneerOrganization",
    "Семейный статус": "familyStatus",
    "Статус оздоровления (текущий год)": "sanatoriumCurrentYear",
    Класс: "classDTO",
  };

  const objKeys = ['number' , 'letter']

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/api/student/list?page=${currentPage -1}&size=10`
      );
      console.log(response.data);
      console.log(response.data)
      const resposeAll = await axios.get(
        "http://localhost:8082/api/student/findAll"
      );
      setTotalPages( Math.ceil(resposeAll.data.length / 10));
      setStudents(response.data);
    } catch (error) {
      setAlert({
        type: "error",
        message: "Не удалось получить данные с сервера",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cookie.get("alert")) {
      setAlert(cookie.get("alert"));
    }
    fetchStudents();
  }, [currentPage]);

  const handleRowClick = (id) => {
    setSelectedIdStudents((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((selectedId) => selectedId !== id)
        : [...prevIds, id]
    );
  };

  const handleDeleteData = async () => {
    setModalVisible(false);
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/student/delete/${selectedIdStudents}`
      );
      if (response.status === 204) {
        setAlert({ type: "success", message: "Ученик успешно удален" });
        await fetchStudents();
        setSelectedIdStudents([]); 
      } else {
        setAlert({
          type: "error",
          message: "Не удалось удалить ученика, повторите попытку",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message:
          error.response?.data?.message ||
          "Не удалось удалить ученика, ошибка сервера",
      });
    }
  };

  useEffect(() => {
    if (Array.isArray(students)) {
      const filtered = students.filter((student) => {
        return Object.values(student).some((value) => {
          if (value && typeof value === "string") {
            return value.toLowerCase().includes(searchString.toLowerCase());
          }
          return false;
        });
      });
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [searchString, students]);

  return (
    <>
      {alert.message && (
        <Alert
          handleClearAlert={setAlert}
          type={alert.type}
          message={alert.message}
        />
      )}

      <Header />
      {isLoading ? (
        <Load />
      ) : (
        <>
          <TableControl
            selectedIdStudents={selectedIdStudents}
            addPath="/students/"
            handleOpenModal={() => setModalVisible(true)}
            data={students}
            headerKeyMap={headerKeyMap}
            searchString={searchString}
            setSearchString={setSearchString}
          />
          <div className="max-w-full mb-2 overflow-x-auto">
            {students.length > 0 ? (
              <Table
                data={filteredData.length > 0 ? filteredData : students}
                handleRowClick={handleRowClick}
                selectedId={selectedIdStudents}
                headerKeyMap={headerKeyMap}
                objKeys={objKeys}
              />
            ) : (
              <div className="flex rounded-lg p-4 mb-4 text-sm bg-red-100 text-red-700 mx-auto w-1/2 text-center gap-2">
                <i className="bx bx-error-circle self-center"></i>
                <div>
                  Нет данных, для добавления данных нажмите на кнопку "Добавить"
                </div>
              </div>
            )}
          </div>
          {students.length > 0 && (
            <Paginate
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
          <ActionModal
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            eventIfSuccessful={handleDeleteData}
          />
        </>
      )}
    </>
  );
}
