import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { styles } from "@/styles/global-styles";
import { useNote } from "@/hooks/useNote";
import AddButton from "@/components/AddButton";
import SearchInput from "@/components/SearchInput";
import NotesList from "@/components/NotesList";

export default function index() {
  const {
    currentNote,
    filteredNotes,
    searchQuery,
    addNote,
    deleteNote,
    setSearchQuery,
    setCurrentNote,
  } = useNote();

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          
          {/* Header */}
          <View style={{ ...styles.header }}>
            <Image
              source={require("../assets/note.png")}
              style={styles.image}
            />
            <Text style={styles.headerTitle}>NoteHub</Text>
          </View>

          {/* Contenedor con ScrollView */}
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {/* Input Container */}

            {/* Lista de Notas */}
            <NotesList deleteNote={deleteNote} filteredNotes={filteredNotes} />
          </ScrollView>

          {/* Search Input */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Escribe una nota..."
                value={currentNote}
                onChangeText={setCurrentNote}
                placeholderTextColor="white"
                multiline
              />
              <AddButton addNote={addNote} currentNote={currentNote} />
            </View>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
