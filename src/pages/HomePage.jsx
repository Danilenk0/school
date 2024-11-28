import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Header></Header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 mt-40 max-w-screen-xl mx-auto h-200">
        <Link
          to={"/students"}
          className="bg-white px-3 pb-3 rounded-md transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <h2 className="text-lg text-black text-center font-bold my-2">
            Ученики
          </h2>
          <div
            className="bg-blue-500 h-40 flex flex-col justify-between p-4 border border-gray-300 rounded-md"
            style={{
              backgroundImage: 'url("/images/students.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </Link>

        <Link to={'/recoveries'} className="bg-white px-3 pb-3 rounded-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg text-black text-center font-bold my-2">
            Оздоровление
          </h2>
          <div
            className="bg-blue-500 h-40 flex flex-col justify-between p-4 border border-gray-300 rounded-md"
            style={{
              backgroundImage: 'url("/images/recreation.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </Link>

        <Link to={'/parents'} className="bg-white px-3 pb-3 rounded-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg text-black text-center font-bold my-2">
            Родители
          </h2>
          <div
            className="bg-blue-500 h-40 flex flex-col justify-between p-4 border border-gray-300 rounded-md"
            style={{
              backgroundImage: 'url("/images/parents.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </Link>

        <Link to={'/diningroom'} className="bg-white px-3 pb-3 rounded-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg text-black text-center font-bold my-2">
            Столовая
          </h2>
          <div
            className="bg-blue-500 h-40 flex flex-col justify-between p-4 border border-gray-300 rounded-md"
            style={{
              backgroundImage: 'url("/images/canteen.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </Link>

        <Link to={'/events'} className="bg-white px-3 pb-3 rounded-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg text-black text-center font-bold my-2">
            Мероприятия
          </h2>
          <div
            className="bg-blue-500 h-40 flex flex-col justify-between p-4 border border-gray-300 rounded-md"
            style={{
              backgroundImage: 'url("/images/events.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </Link>

        <Link to={"/writ"} className="bg-white px-3 pb-3 rounded-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg text-black text-center font-bold my-2">
            Приказы
          </h2>
          <div
            className="bg-blue-500 h-40 flex flex-col justify-between p-4 border border-gray-300 rounded-md"
            style={{
              backgroundImage: 'url("/images/commands.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </Link>
      </main>
    </>
  );
}
