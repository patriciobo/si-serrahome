import React from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { Unidad } from '@prisma/client';

interface Props {
  unidades: Unidad[];
}

export default function ImagesGallery ({ unidades }: Props) {

  // Acá estoy seteando por defecto la unidad uno porque no se como mandarle una instancia de unidad y no la lista de unidades completa.
  const unidadSeleccionada = unidades[1]
  const images = unidadSeleccionada.imagenes.map((imagen: string) => (
    {
    original: imagen,
    thumbnail: imagen,
  })) 
    
  console.log(images);
  
  return (
    <div>
      <ImageGallery 
        items={images}
        showPlayButton={false}
        showBullets={true}
      />
    </div>
  )
}

