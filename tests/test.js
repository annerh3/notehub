import { renderHook, act } from "@testing-library/react-hooks";
import { useNote } from "@/hooks/useNote";
import { render, fireEvent } from "@testing-library/react-native";
import AddButton from "../components/AddButton";
import DeleteButton from "../components/DeleteButton";
import NotesList from "../components/NotesList";
import SearchInput from "../components/SearchInput";
import * as Haptics from "expo-haptics";
import { MaterialCommunityIcons } from 'react-native-vector-icons';

let useNoteResult;

describe("useNote Hook", () => {
  beforeEach(() => {
    useNoteResult = renderHook(() => useNote());
  });

  it("Renderiza correctamente", () => {
    expect(useNoteResult.result.current.notes).toBeDefined();
    expect(useNoteResult.result.current.currentNote).toBeDefined();
    expect(useNoteResult.result.current.searchQuery).toBeDefined();
    expect(useNoteResult.result.current.filteredNotes).toBeDefined();

    expect(useNoteResult.result.current.setCurrentNote).toBeInstanceOf(Function);
    expect(useNoteResult.result.current.setSearchQuery).toBeInstanceOf(Function);
    expect(useNoteResult.result.current.deleteNote).toBeInstanceOf(Function);
    expect(useNoteResult.result.current.addNote).toBeInstanceOf(Function);
  });

  it("Agrega una nota correctamente", () => {
    act(() => {
      useNoteResult.result.current.setCurrentNote("Esta es mi primer Nota");
    });

    act(() => {
      useNoteResult.result.current.addNote();
    });

    // Accedemos al estado actualizado después de los cambios
    const hookState = useNoteResult.result.current;

    console.log("currentNote => ", hookState.currentNote);
    console.log("notes => ", hookState.notes);

    expect(hookState.notes.length).toBe(1);
    expect(hookState.notes[0].text).toBe("Esta es mi primer Nota");
  });

  it("Elimina una nota correctamente", () => {
    act(() => {
      useNoteResult.result.current.setCurrentNote("Nota a eliminar");
    });

    act(() => {
      useNoteResult.result.current.addNote();
    });
    console.log("Array de Notas: ", useNoteResult.result.current.notes);

    const noteId = useNoteResult.result.current.notes[0].id;

    act(() => {
      useNoteResult.result.current.deleteNote(noteId);
    });

    expect(useNoteResult.result.current.notes.length).toBe(0);
  });

  it("filtrar notas por búsqueda", () => {
    act(() => {
      useNoteResult.result.current.setCurrentNote("React Native es genial");
    });

    act(() => {
      useNoteResult.result.current.addNote();
    });
    act(() => {
      useNoteResult.result.current.setCurrentNote("Aprendiendo Jest");
    });

    act(() => {
      useNoteResult.result.current.addNote();
    });

    act(() => {
      useNoteResult.result.current.setSearchQuery("jest");
    });

    expect(useNoteResult.result.current.filteredNotes.length).toBe(1);
    expect(useNoteResult.result.current.filteredNotes[0].text).toBe(
      "Aprendiendo Jest"
    );
  });
});

jest.mock("expo-haptics");
jest.mock("expo-font");

describe("AddButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Limpia todos los mocks antes de cada prueba
  });

  
  it("debe renderizar correctamente", () => {
    const { getByTestId } = render(
      <AddButton currentNote="" addNote={() => {}} />
    );
    expect(getByTestId("add-button")).toBeTruthy();
  });

  it("debe deshabilitar el pressable cuando no hay texto en el input", () => {
    const { getByTestId } = render(
      <AddButton addNote={() => {}} currentNote="" />
    );

    const button = getByTestId("add-button");
    console.log("botón --> ", button);

    // Verifica si el Pressable está deshabilitado
    expect(button).toHaveProp("accessible", true);
  });

  it("debe habilitar el pressable cuando hay texto en el input", () => {
    const { getByTestId } = render(
      <AddButton addNote={() => {}} currentNote="Esta es la Nota." />
    );

    const button = getByTestId("add-button");
    console.log("botón --> ", button);

    // Verifica si el Pressable está deshabilitado
    expect(button).toHaveProp("accessible", true);
  });

  it("debe llamar a la funcion addNote cuando se le da tap al Pressable", () => {
    // Renderizamos el hook useNote
    useNoteResult = renderHook(() => useNote());

    // Monitorear el comportamiento de la fn addNote
    const addNoteSpy = jest.spyOn(useNoteResult.result.current, "addNote");

    // Renderizamos el componente con la función addNote real
    const { getByTestId } = render(
      <AddButton
        currentNote="Test"
        addNote={useNoteResult.result.current.addNote}
      />
    );

    // simular tap
    fireEvent.press(getByTestId("add-button"));

    // verificar que addNote se haya llamado exactamente una vez
    expect(addNoteSpy).toHaveBeenCalledTimes(1);
  });

  it('debe llamar a Haptics.impactAsync al hacer tap', () => {
    const addNoteMock = jest.fn();
    const { getByTestId } = render(<AddButton currentNote="Test" addNote={addNoteMock} />);

    fireEvent.press(getByTestId('add-button'));
    expect(Haptics.impactAsync).toHaveBeenCalledTimes(1);
  });

  it('el icono deberia mostrar el color gris-suave cuando NO haya texto en el input', () => {
    const {  UNSAFE_getByType } = render(<AddButton currentNote="" addNote={() => {}} />);    
    const icon = UNSAFE_getByType(MaterialCommunityIcons);
    // Verifica el color del ícono
    expect(icon.props.color).toBe('#999'); // O el valor esperado cuando `currentNote` está vacío
  });

  it('el color de fondo deberia ser gris cuando NO haya texto en el input', () => {
    const {  getByTestId } = render(<AddButton currentNote="" addNote={() => {}} />);
     const btn = getByTestId('add-button')
    // Verifica el color del boton
    expect(btn.props.style[1].backgroundColor).toBe('#333'); 
  });

  it('el icono deberia ser blanco cuando SI haya texto en el input', () => {
    const {  UNSAFE_getByType } = render(<AddButton currentNote="Test" addNote={() => {}} />);    
    const icon = UNSAFE_getByType(MaterialCommunityIcons);
    // Verifica el color del ícono
    expect(icon.props.color).toBe('#fff'); 
  });


  it('el color de fondo deberia ser morado-oscuro cuando SI haya texto en el input', () => {
    const {  getByTestId } = render(<AddButton currentNote="Test" addNote={() => {}} />);
    const btn = getByTestId('add-button')
    // Verifica el color del boton
    expect(btn.props.style[0].backgroundColor).toBe('#301E60'); 
  });
  
});

describe("DeleteButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Limpia todos los mocks antes de cada prueba
  });

  const deleteNote = jest.fn();
  const note = { id: 10, text: "Nota de prueba" };

  it("debe renderizar correctamente", () => {
    const { getByTestId } = render(<DeleteButton deleteNote={deleteNote} note={note}  />);
    expect(getByTestId("delete-button")).toBeTruthy();
  });

  it("debería llamar a deleteNote cuando se hace tap", () => {
    const { getByTestId } = render(<DeleteButton deleteNote={deleteNote} note={note} />);
    const button = getByTestId("delete-button");
    fireEvent.press(button);
    expect(Haptics.impactAsync).toHaveBeenCalledTimes(1);
    
    // Verificamos que deleteNote fue llamado 
    expect(deleteNote).toHaveBeenCalled();
  });

});


describe("NotesList", () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Limpia todos los mocks antes de cada prueba
  });
  
  it("debe renderizar correctamente", () => {
    const deleteNote = jest.fn();
    const filteredNotes = [{ id: 1, text: "Nota de prueba" }, { id: 2, text: "Otra nota de prueba" }];
    const { getByTestId } = render(
      <NotesList deleteNote={deleteNote} filteredNotes={filteredNotes}  />
    );
    expect(getByTestId("note-list")).toBeTruthy();
  });
});

describe("SearchInput", () => {
  it("deberíia renderizar correctamente", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchInput searchQuery="" setSearchQuery={() => {}} />
    );

    // Verificamos que el input está presente
    expect(getByPlaceholderText("Buscar notas...")).toBeTruthy();
    expect(getByTestId("search-input")).toBeTruthy();
  });

  it("debería mostrar el valor del input correctamente", () => {
    const { getByPlaceholderText } = render(
      <SearchInput searchQuery="Nota de prueba" setSearchQuery={() => {}} />
    );

    // Verificamos que el input contiene el valor correcto
    expect(getByPlaceholderText("Buscar notas...").props.value).toBe("Nota de prueba");
  });

  it("debería llamar a setSearchQuery cuando se escribe en el input", () => {
    const setSearchQueryMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput searchQuery="" setSearchQuery={setSearchQueryMock} />
    );

    const input = getByPlaceholderText("Buscar notas...");

    // Simulamos escribir en el input
    fireEvent.changeText(input, "Nueva búsqueda");

    // Verificamos que la función fue llamada con el valor correcto
    expect(setSearchQueryMock).toHaveBeenCalledWith("Nueva búsqueda");
  });
});
