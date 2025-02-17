import { styles } from "@/styles/global-styles";
import { TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface Props {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }

const SearchInput = ({ searchQuery, setSearchQuery } : Props) => {
  return (
    <View style={styles.searchContainer} testID="search-input">
      <MaterialCommunityIcons name="magnify" size={24} color="white" />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar notas..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="white"
      />
    </View>
  );
};

export default SearchInput;
