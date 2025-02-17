import { styles } from "@/styles/global-styles";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Note } from "@/hooks/useNote";

interface Props {
  note: Note;
  deleteNote: (id: string) => void;
}

const DeleteButton = ({ deleteNote, note } : Props) => {
    return (
      <Pressable
      testID="delete-button"
        style={styles.deleteButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          deleteNote(note.id);
        }}
      >
        <MaterialCommunityIcons name="delete-outline" size={24} color="#ff4444" />
      </Pressable>
    );
  }

  export default DeleteButton;