import { CollectionConfig } from 'payload/types';

const Concerts: CollectionConfig = {
  slug: 'concerts',
  access: {
    read: () => true,  // Permet à tout le monde de lire les concerts
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom de l’artiste',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Date du concert',
    },
    {
      name: 'time',
      type: 'text',
      required: true,
      label: 'Heure du concert',
    },
    {
      name: 'scene',
      type: 'text',
      required: true,
      label: 'Scène',
    },
    {
        name: 'type',
        type: 'select',
        options: [
          { label: 'Rock', value: 'rock' },
          { label: 'Électro', value: 'electro' },
          { label: 'Funk', value: 'funk' },
          { label: 'Pop', value: 'pop' },
        ],
        required: true,
        label: 'Type de musique',
      }
  ],
};

export default Concerts;
