import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  //   "atributos"
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //     id: 'ABC123',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    // }
  },
  //   "acciones"
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    addNewEmptyNote: (state, action) => {
      //agrega la nota a la lista de notas en el store
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      //la nota que quiero que esté activa
      state.active = action.payload;
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      state.isSaving = false;
      state.messageSaved = `"${action.payload.title}" actualizada correctamente.`
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    clearOnLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
  },
})
export const {
  addNewEmptyNote,
  clearOnLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions