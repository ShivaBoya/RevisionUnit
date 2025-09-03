import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function ModalForm({ onClose, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setDueDate(editingTask.dueDate || "");
      setStatus(editingTask.status || "Pending");
    }
  }, [editingTask]);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");

    try {
      if (editingTask) {
        const ref = doc(db, "tasks", editingTask.id);
        await updateDoc(ref, { title, description, dueDate, status });
      } else {
        await addDoc(collection(db, "tasks"), {
          title,
          description,
          dueDate,
          status,
          createdAt: serverTimestamp(),
        });
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Could not save task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-md w-full max-w-md"
      >
        <h3 className="text-lg font-semibold mb-4">
          {editingTask ? "Edit Task" : "Add Task"}
        </h3>
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded mb-3"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="mb-3">
          <label className="mr-3">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-1 rounded"
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1">
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
