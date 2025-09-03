import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import ModalForm from "./components/ModalForm";
import ProfileForm from "./components/ProfileForm";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("grid"); 
  const [selectedNav, setSelectedNav] = useState("All Tasks");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      snap.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
      setTasks(arr);
    });
    return () => unsub();
  }, []);

  const openAddModal = () => {
    setEditingTask(null);
    setShowModal(true);
  };
  const openEditModal = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex text-gray-800">
      <Sidebar selected={selectedNav} onSelect={setSelectedNav} />
      <div className="flex-1 flex flex-col">
        <Header onAddTask={openAddModal} view={view} setView={setView} />
        <main className="p-6">
          {selectedNav === "Profile" ? (
            <ProfileForm />
          ) : (
            <TaskList
              tasks={tasks}
              view={view}
              filter={selectedNav}
              onEdit={openEditModal}
            />
          )}
        </main>
      </div>

      {showModal && (
        <ModalForm
          onClose={() => setShowModal(false)}
          editingTask={editingTask}
        />
      )}
    </div>
  );
}
