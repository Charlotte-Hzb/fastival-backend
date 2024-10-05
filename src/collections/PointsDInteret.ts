import { CollectionConfig } from 'payload/types';

const PointsDInteret: CollectionConfig = {
  slug: 'points-d-interet',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'lat',
      type: 'number',
      required: true,
    },
    {
      name: 'lng',
      type: 'number',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Accueil', value: 'Accueil' },
        { label: 'WC', value: 'WC' },
        { label: 'Scène', value: 'Scène' },
        { label: 'Buvette', value: 'Buvette' },
        { label: 'Shop', value: 'Shop' },
      ],
      required: true,
    },
  ],
};

export default PointsDInteret;
