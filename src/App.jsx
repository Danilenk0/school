import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import StudentsPage from "./pages/students/Main.jsx";
import StudentsAddPage from "./pages/students/Add.jsx";
import StudentEditPage from "./pages/students/Edit.jsx";
import Notfound from "./pages/404.jsx";
import ParentPage from './pages/parents/Main.jsx'
import ParentsAddPage from './pages/parents/Add.jsx'
import ParentsEditPage from './pages/parents/Edit.jsx'
import RecoveryPage from "./pages/recovery/Main.jsx";
import RecoveryAddPage from "./pages/recovery/Add.jsx";
import RecoveryEditPage from "./pages/recovery/Edit.jsx";
import DiningroomPage from "./pages/diningroo/Main.jsx";
import DiningroomAddPage from "./pages/diningroo/Add.jsx";
import DiningroomEdit from "./pages/diningroo/Edit.jsx";
import EventPage from "./pages/events/Main.jsx";
import EventAddPage from "./pages/events/Add.jsx";
import EventEditPage from "./pages/events/Edit.jsx";
import WritPage from "./pages/writ/Main.jsx";
import WritAddPage from "./pages/writ/Add.jsx";
import WritEditPage from "./pages/writ/Edit.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/students" element={<StudentsPage />}></Route>
        <Route path="/students/add" element={<StudentsAddPage />}></Route>
        <Route path="/students/edit/:id" element={<StudentEditPage />} />
        <Route path="*" element={<Notfound />}></Route>
        <Route path="/parents" element={<ParentPage />}></Route>
        <Route path="/parents/add" element={<ParentsAddPage />}></Route>
        <Route path="/parents/edit/:id" element={<ParentsEditPage />} />

        <Route path="/recoveries" element={<RecoveryPage />}></Route>
        <Route path="/recoveries/add" element={<RecoveryAddPage />}></Route>
        <Route path="/recoveries/edit/:id" element={<RecoveryEditPage />} />

        <Route path="/diningroom" element={<DiningroomPage />}></Route>
        <Route path="/diningroom/add" element={<DiningroomAddPage />}></Route>
        <Route path="/diningroom/edit/:id" element={<DiningroomEdit />} />

        <Route path="/events" element={<EventPage />}></Route>
        <Route path="/events/add" element={<EventAddPage />}></Route>
        <Route path="/events/edit/:id" element={<EventEditPage />} />

        <Route path="/writ" element={<WritPage />}></Route>
        <Route path="/writ/add" element={<WritAddPage />}></Route>
        <Route path="/writ/edit/:id" element={<WritEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
