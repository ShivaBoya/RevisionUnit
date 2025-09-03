import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function TaskCard({ task, compact = false, onEdit }) {
  const toggleStatus = async () => {
    const ref = doc(db, "tasks", task.id);
    await updateDoc(ref, {
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
  };

  const remove = async () => {
    const ref = doc(db, "tasks", task.id);
    await deleteDoc(ref);
  };

  return (
    <article
      className={`bg-white p-4 rounded-md shadow ${
        compact ? "flex items-center justify-between" : ""
      }`}
    >
      <div>
        <h3
          className={`font-semibold ${
            task.status === "Completed" ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>
        {!compact && (
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        )}

        <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
          <span>Due: {task.dueDate || "No date"}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              task.status === "Completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {task.status}
          </span>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={toggleStatus} className="px-3 py-1 border rounded-md">
          Toggle
        </button>
        <button onClick={onEdit} className="px-3 py-1 border rounded-md">
          <FaEdit />
        </button>
        <button
          onClick={remove}
          className="px-3 py-1 border rounded-md text-red-600"
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
}
