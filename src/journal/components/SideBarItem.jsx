import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({note}) => {

    const dispatch = useDispatch(); 

    const onClickNote = () => {
        dispatch(setActiveNote({...note}));
    }
  return (
    <ListItem 
        disablePadding
        onClick={onClickNote}>
        <ListItemButton>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid>
                <ListItemText primary={note.title}/>
                <ListItemText secondary={note.body}/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
