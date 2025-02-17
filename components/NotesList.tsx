import { Note } from "@/hooks/useNote";
import { styles } from "@/styles/global-styles";
import { View, Text, ScrollView } from "react-native";
import DeleteButton from "./DeleteButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  deleteNote: (id: string) => void;
  filteredNotes: Note[];
}
const NotesList = ({ deleteNote, filteredNotes }: Props) => {
  return (
    <ScrollView style={styles.notesList} testID="note-list">
      
      {filteredNotes.map((note: Note) => (
        <View key={note.id} style={styles.noteItem}>
          <View style={styles.noteContent}>
            <Text style={styles.noteText}>{note.text}</Text>
            <Text style={styles.noteDate}>{note.date}</Text>
          </View>
          {/* // Delete Button */}
          <DeleteButton deleteNote={deleteNote} note={note} />
        </View>
      ))}

      {filteredNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="note-text-outline"
            size={64}
            color="#ccc"
          />
          <Text style={styles.emptyText}>No hay notas</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default NotesList;
