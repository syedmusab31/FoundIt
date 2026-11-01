import { Camera, CheckCircle, Edit3, Search, User } from 'lucide-react';

export const WORKFLOWS = [
  {
    title: 'Lost an item?',
    steps: [
      { icon: Search, text: 'Browse found items in your area' },
      { icon: User, text: 'Create your account' },
      { icon: Camera, text: 'List your lost item with details' },
      { icon: Edit3, text: 'Track progress from your dashboard' },
      { icon: CheckCircle, text: 'Mark it resolved once recovered' },
    ],
  },
  {
    title: 'Found an item?',
    steps: [
      { icon: Search, text: 'Search for matching lost items' },
      { icon: User, text: 'Sign up in seconds' },
      { icon: Camera, text: 'Upload item details and photos' },
      { icon: Edit3, text: 'Manage it from your dashboard' },
      { icon: CheckCircle, text: 'Connect with the owner' },
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Product Designer',
    text: 'FoundIt helped me recover my lost laptop within 48 hours. The process was seamless and professional.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Software Engineer',
    text: "I found someone's wallet and returned it through FoundIt. The platform made the entire process effortless.",
  },
  {
    name: 'Emma Thompson',
    role: 'Marketing Director',
    text: 'Lost my engagement ring during travel. FoundIt connected me with the person who found it. Forever grateful.',
  },
];

export const PREVIEW_ITEMS = [
  { icon: '📱', title: 'iPhone 14 Pro', caption: 'Lost near Liberty Market', tone: 'bg-blue-100' },
  { icon: '🔑', title: 'Car keys', caption: 'Found at a coffee shop', tone: 'bg-green-100' },
  { icon: '🎒', title: 'Blue backpack', caption: 'Lost at university', tone: 'bg-purple-100' },
];
