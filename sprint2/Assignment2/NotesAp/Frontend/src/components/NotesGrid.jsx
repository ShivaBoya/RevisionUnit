import React from 'react';
import NoteCard from './NoteCard';

export default function NotesGrid({ notes, onEdit, onDelete, onShare, canEdit }) {
  if (!notes.length) {
    return <p className="text-gray-500 text-center mt-6">No notes available</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {notes.map(note => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onShare={onShare}
          canEdit={canEdit}
        />
      ))}
    </div>
  );
}
