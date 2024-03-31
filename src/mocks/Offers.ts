import { Offer } from '../entities/Offer';
import { Cities } from './Cities';
import { Users } from './Users';

export const Offers: Offer[] = [
  {
    id: '6371a444-03f8-4578-a059-16ff99169d01',
    title: 'Perfectly located Castro',
    description: 'This is a place for dreamers to reset, reflect, and create. Designed with a \'slow\' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.',
    type: 'house',
    price: 415,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/12.jpg',
    images: [
      'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/10.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/7.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/6.jpg'
    ],
    city: Cities[3],
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    goods: [
      'Dishwasher',
      'Kitchen',
      'Breakfast',
      'Laptop friendly workspace',
      'Baby seat',
      'Towels',
      'Washing machine',
      'Coffee machine',
      'Air conditioning'
    ],
    host: Users[0],
    isPremium: true,
    isFavorite: true,
    rating: 4.9,
    bedrooms: 2,
    maxAdults: 6
  },
  {
    id: '2fd6a18d-dc04-4de9-8259-e78e12dac996',
    title: 'Amazing and Extremely Central Flat',
    description: 'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
    type: 'room',
    price: 257,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
    images: [
      'https://14.design.htmlacademy.pro/static/hotel/18.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/7.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/1.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/12.jpg'
    ],
    city: Cities[3],
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    goods: [
      'Dishwasher',
      'Breakfast',
      'Air conditioning',
      'Wi-Fi',
      'Towels'
    ],
    host: Users[0],
    isPremium: false,
    isFavorite: false,
    rating: 1.7,
    bedrooms: 1,
    maxAdults: 3
  },
  {
    id: '9e215c74-6801-4fa7-90b2-889fd5444620',
    title: 'Waterfront with extraordinary view',
    description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
    type: 'apartment',
    price: 453,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/10.jpg',
    images: [
      'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/12.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/3.jpg'
    ],
    city: Cities[3],
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    goods: [
      'Washing machine',
      'Cable TV',
      'Wi-Fi',
      'Washer',
      'Air conditioning',
      'Laptop friendly workspace'
    ],
    host: Users[0],
    isPremium: true,
    isFavorite: false,
    rating: 3.6,
    bedrooms: 4,
    maxAdults: 10
  },
  {
    id: '9c1a0573-6c9d-4157-971e-52aafe91bbcd',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    description: 'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
    type: 'room',
    price: 190,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
    images: [
      'https://14.design.htmlacademy.pro/static/hotel/13.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/18.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/17.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/7.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/5.jpg'
    ],
    city: Cities[3],
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    goods: [
      'Towels',
      'Coffee machine',
      'Breakfast',
      'Air conditioning',
      'Heating',
      'Fridge',
      'Wi-Fi',
      'Washing machine',
      'Baby seat',
      'Kitchen',
      'Cable TV',
      'Laptop friendly workspace'
    ],
    host: Users[0],
    isPremium: true,
    isFavorite: true,
    rating: 1.9,
    bedrooms: 1,
    maxAdults: 2
  },
];
