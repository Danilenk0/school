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

export default function Parents() {
  const [selectedIdParents, setSelectedIdParents] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [parents, setParents] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const headerKeyMap = {
    "№": "id",
    Фамилия: "lastname",
    Имя: "firstname",
    Отчество: "surname",
    Телефон: "phone",
    "Адрес работы": "workAddress",
    ученики: "studentsDTO",
  };
  const objKeys = ["firstname", "lastname", 'surname'];

  const fetchParents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/api/parent/list?page=${currentPage -1}&size=10`
      );
      console.log(response.data);
      console.log(response.data)
      const responseAll = await axios.get(
        "http://localhost:8082/api/parent/findAll"
      );
      setTotalPages(Math.ceil(responseAll.data.length / 10));
      setParents(response.data);
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
    fetchParents();
  }, [currentPage]);

  const handleRowClick = (id) => {
    setSelectedIdParents((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((selectedId) => selectedId !== id)
        : [...prevIds, id]
    );
  };

  const handleDeleteData = async () => {
    setModalVisible(false);
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/parent/delete/${selectedIdParents}`
      );
      if (response.status === 204) {
        setAlert({ type: "success", message: "Родитель успешно удален" });
        await fetchParents();
        setSelectedIdParents([]);
      } else {
        setAlert({
          type: "error",
          message: "Не удалось удалить родителя, повторите попытку",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message:
          error.response?.data?.message ||
          "Не удалось удалить родителя, ошибка сервера",
      });
    }
  };

  useEffect(() => {
    if (Array.isArray(parents)) {
      const filtered = parents.filter((parent) => {
        return Object.values(parent).some((value) => {
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
  }, [searchString, parents]);

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
            selectedIdStudents={selectedIdParents}
            addPath="/parents/"
            handleOpenModal={() => setModalVisible(true)}
            data={parents}
            headerKeyMap={headerKeyMap}
            searchString={searchString}
            setSearchString={setSearchString}
          />
          <div className="max-w-full mb-2 overflow-x-auto">
            {parents.length > 0 ? (
              <Table
                data={filteredData.length > 0 ? filteredData : parents}
                handleRowClick={handleRowClick}
                selectedId={selectedIdParents}
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
          {parents.length > 0 && (
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
