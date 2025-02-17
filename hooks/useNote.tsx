import { useState } from "react";
import { Keyboard } from "react-native";

export interface Note {
  id: string;
  text: string;
  date: string;
}

export const useNote = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addNote = () => {
    
    if (currentNote.trim().length > 0) { // si la nota no esta vacia
      const newNote: Note = {
        id: Date.now().toString(),
        text: currentNote,
        date: new Date().toLocaleDateString(),
      };

      setNotes((prevNotes) => [newNote, ...prevNotes]); // agregar nota al principio del array
      setCurrentNote("");
      Keyboard.dismiss(); // ocultar teclado
    }
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note: Note) => note.id !== id)); // nuevo array sin la nota a eliminar
  };

  const filteredNotes = notes.filter((note: Note) =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase()) // filtrar notas por query
  );

  return {
    addNote,
    deleteNote,
    setSearchQuery,
    setCurrentNote,
    filteredNotes,
    searchQuery,
    currentNote,
    notes,
  };
};
