import { styles } from "@/styles/global-styles";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

interface Props {
  currentNote: string;
  addNote: () => void;
}

const AddButton = ({ addNote, currentNote }: Props) => {
  return (
    <Pressable
      testID="add-button"
      style={[
        styles.addButton,
        currentNote.length === 0 && styles.addButtonDisabled,
      ]}
      onPress={() => {
        console.log('Botón presionado'); 
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        addNote();
      }}
      disabled={currentNote.length === 0}
    >
      <MaterialCommunityIcons
      testID="plus-icon"
        name="plus"
        size={24}
        color={currentNote.length === 0 ? "#999" : "#fff"}
      />
    </Pressable>
  );
};

export default AddButton;
