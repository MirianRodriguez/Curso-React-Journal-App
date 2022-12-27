import { ImageList, ImageListItem } from '@mui/material'
import React from 'react'

//ejemplo de mui.com

export const ImageGallery = ({images}) => {
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="imagen de la nota"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    )
}



