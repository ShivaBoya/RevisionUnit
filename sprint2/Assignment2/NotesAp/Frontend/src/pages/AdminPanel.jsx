import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get('/admin');
      setUsers(res.data.users);
      setNotes(res.data.notes);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border p-2">{u.displayName}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-4">All Notes</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Owner</th>
            <th className="border p-2">Updated</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((n) => (
            <tr key={n._id}>
              <td className="border p-2">{n.title}</td>
              <td className="border p-2">{n.owner.displayName} ({n.owner.email})</td>
              <td className="border p-2">{new Date(n.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
