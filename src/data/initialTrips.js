export const initialTrips = [
  {
    id: '1',
    title: 'Mountain Retreat',
    destination: 'Smoky Mountains',
    startDate: '2025-06-10',
    endDate: '2025-06-15',
    description: 'A peaceful retreat in the mountains with hiking and relaxation.',
    activities: ['Hiking', 'Meditation', 'Photography'],
    categories: ['Mountain', 'Nature', 'Relaxation'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    budget: {
      total: 1200,
      spent: 750,
      categories: [
        { name: 'Accommodation', allocated: 600, spent: 550 },
        { name: 'Transportation', allocated: 300, spent: 150 },
        { name: 'Food', allocated: 200, spent: 50 },
        { name: 'Activities', allocated: 100, spent: 0 }
      ]
    }
  },
  {
    id: '2',
    title: 'Beach Getaway',
    destination: 'Malibu, California',
    startDate: '2025-07-05',
    endDate: '2025-07-12',
    description: 'A week of sun, surf and sand along the beautiful California coast.',
    activities: ['Swimming', 'Surfing', 'Beach Yoga'],
    categories: ['Beach', 'Water', 'Relaxation'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
  },
  {
    id: '3',
    title: 'Forest Camping',
    destination: 'Redwood National Park',
    startDate: '2025-08-15',
    endDate: '2025-08-20',
    description: 'Camping beneath the ancient giant redwoods.',
    activities: ['Camping', 'Stargazing', 'Nature Walks'],
    categories: ['Forest', 'Camping', 'Nature'],
    image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];