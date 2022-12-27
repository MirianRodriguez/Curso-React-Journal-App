import {collection, deleteDoc, doc, setDoc} from 'firebase/firestore/lite';
// import collection, deleteDoc, doc, setDoc from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';

export const startAddNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        //necesito el uid porque en la bd tengo una colección por cada usuario
        const {uid} = getState().auth;

        //la nueva nota que se agregará al journal del usuario autenticado
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        }

            /* EN FIREBASE */
        //construye la referencia a la colección en la base de datos donde se van a guardar las notas
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));


        //agrega la nota a al documento.
        /* Para que funcione hay que modificar las rules de la bd, estableciendo que se dejen pasar aquellas peticiones
        (request) siempre que auth!= null, es decir, siempre que haya un usuario autenticado */
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
            /* EN EL STORE */
        dispatch(addNewEmptyNote(newNote));

        dispatch(setActiveNote(newNote));

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        if(!uid) throw new Error('El uid del usuario no existe');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        const noteForFirebase = {...note};
        delete noteForFirebase.id;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);

        await setDoc(docRef, noteForFirebase, {merge:true}); //si existe el campo lo sobreescribe, si no lo crea

        dispatch(updateNote(note));
    }
}

export const startUploadFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving());

            //Para hacer la subida de un archivo
        //await dispatch(fileUpload(files[0])); 

            //para esperar las respuestas de varias promesas, en este caso subida de archivos
        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ));
    }
}

export const startDeleteById = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active: note} = getState().journal;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));
    }
}