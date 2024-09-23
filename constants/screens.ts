export const screens = [
  { name: 'index', icon: { regular: 'home-outline', focused: 'home' }, options: { href: '/' } },
  {
    name: 'group',
    icon: { regular: 'people-outline', focused: 'people' },
    options: {
      // href: '/group',
    },
  },
  { name: 'post', icon: { regular: 'add-circle-outline', focused: 'add-circle' } },
  { name: 'profile', icon: { regular: 'person-circle-outline', focused: 'person-circle' } },
];

export const options = [
  { name: 'Login', icon: 'lock-open-outline', href: '/login' },
  { name: 'Lahelu Plus', icon: 'add-circle-outline', href: '/plus' },
  { name: 'Download Aplikasi', icon: 'logo-google-playstore', href: '/download' },
  { name: 'Pengaturan', icon: 'settings-outline', href: '/settings' },
  { name: 'Hubungi Kami', icon: 'mail-outline', href: '/contact' },
];

export const postCategories = [
  { name: 'Home', icon: 'home-outline', href: '/' },
  { name: 'Fresh', icon: 'time-outline', href: '/fresh' },
  { name: 'Trending', icon: 'trending-up-outline', href: '/trending' },
  { name: 'Topik', icon: 'people-outline', href: '/topic' },
];

export const memeCategories = [
  {
    content: 'Peringkat',
    href: '/leaderboard',
    icon: 'trophy-outline',
  },
  {
    content: 'Tersimpan',
    href: '/saved',
    icon: 'bookmark',
  },
  {
    content: 'Acak',
    href: '/shuffle',
    icon: 'image-outline',
  },
];

export const exploreCategories = [
  {
    content: 'Donatur',
    href: '/donator',
    icon: 'wallet-outline',
  },
  {
    content: 'Medali',
    href: '/bagdes',
    icon: 'medal-outline',
  },
  {
    content: 'Toko koin',
    href: '/coin',
    icon: 'logo-bitcoin',
  },
  {
    content: 'Discord',
    href: '/discord',
    icon: 'logo-discord',
  },
];
