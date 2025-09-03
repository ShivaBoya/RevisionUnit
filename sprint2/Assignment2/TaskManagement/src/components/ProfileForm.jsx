import React, { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const ref = doc(db, "users", "public_user");
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || "");
        setAvatar(data.avatar || "");
      }
    });
    return () => unsub();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    const ref = doc(db, "users", "public_user");
    await setDoc(ref, { name, avatar }, { merge: true });
    alert("Profile updated");
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-md shadow">
      <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
      <form onSubmit={save} className="space-y-3">
        <div>
          <label className="block text-sm">Name</label>
          <input
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm">Profile Picture URL</label>
          <input
            className="w-full p-2 border rounded"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <img
            src={avatar || "https://i.pravatar.cc/80"}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
