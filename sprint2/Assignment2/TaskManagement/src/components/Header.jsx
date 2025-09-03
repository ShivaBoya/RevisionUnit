import React, { useEffect, useState } from "react";
import { FaPlus, FaThLarge, FaList } from "react-icons/fa";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Header({ onAddTask, view, setView }) {
  const [user, setUser] = useState({ name: "Guest User", avatar: "" });

  useEffect(() => {
    const userDoc = doc(db, "users", "public_user"); 
    const unsub = onSnapshot(userDoc, (snap) => {
      if (snap.exists()) setUser(snap.data());
    });
    return () => unsub();
  }, []);

  return (
    <header className="flex items-center justify-between bg-white p-4 border-b">
      <div className="flex items-center gap-4">
        <button
          onClick={onAddTask}
          className="bg-indigo-600 text-white px-3 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Add Task
        </button>

        <div className="flex items-center gap-2 border rounded-md overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={`p-2 ${view === "grid" ? "bg-gray-100" : ""}`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 ${view === "list" ? "bg-gray-100" : ""}`}
          >
            <FaList />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right mr-4">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-xs text-gray-500">Member</div>
        </div>
        <img
          src={user.avatar || "https://i.pravatar.cc/40"}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </header>
  );
}
