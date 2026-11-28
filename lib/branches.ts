export const gagan = { name: 'Gagan', phone: '917035000071', displayPhone: '+91 70350 00071' };
export const gurinder = { name: 'Gurinder Singh', phone: '917087878759', displayPhone: '+91 70878 78759' };

export const branches = [
  {
    mapUrl: 'https://maps.google.com/maps?q=30.528797149658203%2C76.67266082763672&z=17&hl=en',
    id: 'gian-sager', name: 'Gian Sager Medical College', short: 'Where it started',
    address: 'Gian Sager Medical College, Punjab', contact: gagan, upcoming: false,
    image: 'equipment', features: ['Strength training', 'Cardio', 'Group classes'],
    copy: 'The first Club 91 gym opened at Gian Sager Medical College. Contact Gagan for visits, training and memberships.',
  },
  {
    id: 'sviet', name: 'SVIET Campus', short: 'The second club',
    address: 'SVIET Campus, Punjab', contact: gagan, upcoming: false,
    image: 'strength', features: ['Free weights', 'Functional training', 'Personal coaching'],
    copy: 'Our second gym is on the SVIET campus. Gagan handles training and membership enquiries here.',
  },
  {
    mapUrl: 'https://maps.google.com/maps?q=30.669780731201172%2C76.82810974121094&z=17&hl=en',
    id: 'zirakpur', name: 'Zirakpur (Baltana)', short: 'The third club',
    address: 'Ram Lila Ground, Baltana, Zirakpur, Punjab', contact: gurinder, upcoming: false,
    image: 'training', features: ['Strength & cardio', 'Group classes', 'Personal coaching'],
    copy: 'Find our third club at Ram Lila Ground in Baltana. Branch manager Gurinder Singh handles visits, training and memberships.',
  },
  {
    mapUrl: 'https://maps.google.com/maps?q=30.478113174438477%2C76.5921859741211&z=17&hl=en',
    id: 'rajpura', name: 'Rajpura', short: 'The flagship',
    address: 'Kanika Garden, Rajpura, Punjab', contact: gagan, upcoming: true,
    image: 'flagship', features: ['Fitness & training', 'Luxury wellness', 'Premium lifestyle', 'HYROX training'],
    copy: 'Our fourth club is opening soon at Kanika Garden as Rajpura’s first premium fitness and wellness branch. Contact Gagan for opening and membership updates.',
  },
];
