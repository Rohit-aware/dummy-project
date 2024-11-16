import color from '../../constants/colors';
import { Header } from '../../components';
import { View, StyleSheet } from 'react-native';
import NotesList from './components/notes-list';
import NotesTitle from './components/notes-title';
import { useNotesListingHook } from './notes-listing-hook';


const Notes = () => {

  const {
    page,
    loading,
    refresh,
    isFinish,
    notesData,
    onRefresh,
    onEndReached,
  } = useNotesListingHook();
  
  return (
    <View style={styles.container}>
      <Header title={'Notes'} />
      <NotesTitle />
      <NotesList
        data={notesData}
        finish={isFinish}
        loading={loading}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        page={page}
        refresh={refresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
export default Notes;