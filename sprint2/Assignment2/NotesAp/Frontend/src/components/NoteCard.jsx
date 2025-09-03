import React from 'react';

export default function NoteCard({ note, onEdit, onDelete, onShare, canEdit }) {
  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{note.title}</h3>
        <p className="text-gray-700 mt-2">{note.description}</p>
        <p className="text-xs text-gray-500 mt-3">
          Last updated: {new Date(note.updatedAt).toLocaleString()}
        </p>
      </div>
      {canEdit && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onEdit(note)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
          <button
            onClick={() => onShare(note)}
            className="text-green-600 hover:underline"
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
}
