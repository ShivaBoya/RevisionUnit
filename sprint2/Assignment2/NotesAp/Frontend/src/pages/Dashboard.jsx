import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/api';
import NotesGrid from '../components/NotesGrid';
import NoteModal from '../components/NoteModal';
import ShareModal from '../components/ShareModal';

export default function Dashboard() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('my'); 

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data.myNotes);
      setSharedNotes(res.data.sharedNotes);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSaveNote = async (note) => {
    try {
      if (note._id) {
        await api.put(`/notes/${note._id}`, note);
      } else {
        await api.post('/notes', note);
      }
      fetchNotes();
      setNoteModalOpen(false);
      setSelectedNote(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async (email) => {
    try {
      await api.post(`/notes/${selectedNote._id}/share`, { email });
      setShareModalOpen(false);
      setSelectedNote(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotes =
    view === 'my'
      ? notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
      : sharedNotes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => setNoteModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Note
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-1/3"
        />
        <button
          className={`px-4 py-2 rounded ${view === 'my' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('my')}
        >
          My Notes
        </button>
        <button
          className={`px-4 py-2 rounded ${view === 'shared' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('shared')}
        >
          Shared with Me
        </button>
      </div>

      <NotesGrid
        notes={filteredNotes}
        onEdit={(note) => {
          setSelectedNote(note);
          setNoteModalOpen(true);
        }}
        onDelete={handleDelete}
        onShare={(note) => {
          setSelectedNote(note);
          setShareModalOpen(true);
        }}
        canEdit={view === 'my'}
      />

      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => {
          setNoteModalOpen(false);
          setSelectedNote(null);
        }}
        onSave={handleSaveNote}
        note={selectedNote}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          setShareModalOpen(false);
          setSelectedNote(null);
        }}
        onShare={handleShare}
      />
    </div>
  );
}
