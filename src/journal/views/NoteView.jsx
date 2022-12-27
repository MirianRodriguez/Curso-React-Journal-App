import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { ImageGallery } from '../components'
import { setActiveNote, startDeleteById, startSaveNote, startUploadFiles } from '../../store/journal'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: activeNote, messageSaved, isSaving } = useSelector(state => state.journal);

    const { title, body, date, onInputChange, formState } = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])

    const onInputFileChange = ({target}) => {
        //console.log(target.files);
        dispatch(startUploadFiles(target.files));
    }

    const inputFileRef = useRef();

    const onDelete = () => {
        dispatch(startDeleteById());
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>
                    {dateString}
                </Typography>
            </Grid>
            <Grid item>
                <input 
                    type="file" 
                    multiple 
                    onChange={onInputFileChange} 
                    hidden
                    ref={inputFileRef}/>
                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={()=>inputFileRef.current.click()}>
                    <UploadOutlined/>
                </IconButton>
                <Button
                    color='primary'
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                    disabled={isSaving}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un título'
                    label='Título'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange} />
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='¿Qué sucedió hoy?'
                    multiline
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange} />
            </Grid>
            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
            <ImageGallery images={activeNote.imageUrls}/>
        </Grid>
    )
}
