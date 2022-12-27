import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startAddNote } from '../../store/journal'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {

  const {isSaving, active} = useSelector(state => state.journal);

  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch(startAddNote());
  }

  return (
    <JournalLayout>
      {(!!active)?
      (<NoteView/> ):
      (<NothingSelectedView/>)
      }
      <IconButton 
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover':{backgroundColor:'error.main', opacity:0.9},
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
        onClick={onAdd}
        disabled={isSaving}>
          <AddOutlined sx={{fontSize:30}}/>
      </IconButton>
    </JournalLayout>
  )
}
