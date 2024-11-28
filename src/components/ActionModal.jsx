export default function ActionModal({
  isModalVisible,
  setModalVisible,
  eventIfSuccessful,
}) {
  if (!isModalVisible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50 z-10">
      <div className="bg-white rounded-lg shadow-lg w-[400px] h-[200px] p-6 z-11">
        <h2 className="text-xl font-semibold mb-4">Выберите действие</h2>
        <p className="mb-6">
          Вы не сможете восстановить данные после выполнении операции,
          продолжить?
        </p>
        <div className="flex justify-between">
          <button
            onClick={() => setModalVisible(false)}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 flex align-baseline justify-center"
          >
            отмена
            <i className="bx bx-x ms-2 text-xl"></i>
          </button>
          <button
            onClick={eventIfSuccessful}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 flex align-baseline justify-center"
          >
            Продолжить
            <i className="bx bx-check ms-2 text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
