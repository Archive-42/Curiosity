import uuid from 'uuid';

const messagesData = [
  {
    id: uuid(),
    username: 'John Smith',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a posuere odio. Aliquam auctor sem sapien, vel tempus augue egestas eu.',
    created: new Date(),
  },
  {
    id: uuid(),
    username: 'Sally Jones',
    message: ' Proin hendrerit tellus sit amet nibh semper, quis tempus nulla convallis. Nunc a consequat ligula, vitae condimentum ligula. Mauris turpis tellus, finibus a lacus sed, feugiat aliquam magna. Aliquam odio enim, dictum ut nisl vel, suscipit malesuada tortor.',
    created: new Date(),
  },
  {
    id: uuid(),
    username: 'John Smith',
    message: 'Aliquam auctor, urna ut tempor molestie, nulla diam porta orci, a interdum erat lorem at sem.',
    created: new Date(),
  },
  {
    id: uuid(),
    username: 'Sally Jones',
    message: 'Nam dictum sagittis tempus. Aenean vel feugiat magna, quis consectetur neque. Praesent quis ex ut leo lacinia placerat. Pellentesque erat metus, molestie ornare nibh in, convallis tempor sapien. Maecenas ultrices leo at mauris blandit blandit. Fusce commodo erat eget leo euismod hendrerit. Phasellus id nisi ac orci pharetra mattis quis id risus.',
    created: new Date(),
  },
];

export default messagesData;
