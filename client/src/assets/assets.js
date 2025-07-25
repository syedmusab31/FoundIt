import close_icon from "../assets/close_icon.svg";
import menu_icon from "../assets/menu_icon.svg";
import search_icon from "../assets/search_icon.svg";
import search_iconn from "../assets/search_iconn.png";
import hero_image1 from "../assets/hero_image1.jpg";
import hero_image2 from "../assets/hero_image2.jpg";
import hero_image3 from "../assets/hero_image3.jpg";
import banner_image from "../assets/banner_image.png";
import drop_icon from "../assets/drop_icon.svg";

export  const assets={
    close_icon,
    menu_icon,
    search_icon,
    search_iconn,
    hero_image1,
    hero_image2,
    hero_image3,
    banner_image,
    drop_icon
}

export const tempItems = [
  { id: 1, name: "Black Wallet", image: assets.hero_image1, date: "2025-07-20", status: "active", location: "Main Gate" },
  { id: 2, name: "Blue Umbrella", image: assets.hero_image2, date: "2025-07-15", status: "resolved", location: "Library" },
  { id: 3, name: "Silver Keychain", image: assets.hero_image3, date: "2025-07-10", status: "active", location: "Hostel Block" },
  { id: 4, name: "Red Bag", image: assets.hero_image1, date: "2025-07-05", status: "active", location: "Cafeteria" },
];

export const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Lost Items", path: "/lost" },
    { name: "Found Items", path: "/found" },
]
export const LoggedInMenuLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Lost Items", path: "/lost" },
  { name: "Found Items", path: "/found" },
  { name: "List Lost Items", path: "/lost/new" },
  { name: "List Found Items", path: "/found/new" },
]

export const categories = [
    {
        name: "Electronics"
    },
    {
        name: "Documents"
    },
    {
        name: "Keys"
    },
    {
        name: "Bags"
    },
    {
        name: "Jewelry"
    },
    {
        name: "Clothing & Accessories"
    },
    {
        name: "Pets"
    },
    {
        name: "Sports Equipment"
    },
    {
        name: "Books & Stationery"
    },
    {
        name: "Medical Items"
    },
    {
        name: "Other"
    }
];
export const provinces =[
  {
    name: "Punjab"
  },
  {
    name: "Sindh"
  },
  {
    name: "Khyber Pakhtunkhwa"
  },
  {
    name: "Balochistan"
  },
  {
    name:"Islamabad"
  }
  ,{
    name:"Kashmir"
  }
]

export const LostItems = [
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Black Leather Wallet",
    "description": "Lost a black leather wallet near Liberty Market. Contains ID and credit cards. Reward offered.",
    "category": "Personal Belongings",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-20T10:30:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Samsung Galaxy A32",
    "description": "Found a Samsung Galaxy A32 phone in a park near Model Town. Screen is slightly cracked.",
    "category": "Electronics",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-21T14:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Gold Bracelet",
    "description": "Lost a delicate gold chain bracelet with a small heart charm. Sentimental value.",
    "category": "Jewelry",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-19T09:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Blue Backpack",
    "description": "Found a blue North Face backpack near the university campus. Contains some textbooks.",
    "category": "Bags",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-22T11:45:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Prescription Glasses",
    "description": "Lost black-framed prescription glasses at a cafe in DHA Phase 5. In a hard case.",
    "category": "Eyewear",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-18T16:15:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Car Keys",
    "description": "Found a set of car keys with a Honda logo fob near Packages Mall.",
    "category": "Keys",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-23T09:30:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost USB Drive",
    "description": "Small black USB drive, 64GB, possibly lost in a university lecture hall. Contains important documents.",
    "category": "Electronics",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-17T11:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Kids Toy Car",
    "description": "Found a red toy sports car in a playground near Johar Town.",
    "category": "Toys",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-22T18:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost DSLR Camera",
    "description": "Lost a Canon DSLR camera with a standard lens in a black camera bag. Lost near Minar-e-Pakistan.",
    "category": "Electronics",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-16T15:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Wallet with Cards",
    "description": "Found a brown leather wallet near Emporium Mall. Contains various cards, no cash.",
    "category": "Personal Belongings",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-23T12:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost University ID Card",
    "description": "Lost university ID card (GCU Lahore) with my photo. Please return if found.",
    "category": "Documents",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-15T09:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Reading Book",
    "description": "Found a copy of 'The Alchemist' by Paulo Coelho near a bus stop in Gulberg.",
    "category": "Books",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-22T08:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Silver Watch",
    "description": "Lost a men's silver wristwatch, possibly in a restaurant in Defence.",
    "category": "Jewelry",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-14T17:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Pet Cat (Ginger)",
    "description": "Found a ginger cat wandering near my house in Garden Town. Very friendly.",
    "category": "Pets",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-23T06:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Black Umbrella",
    "description": "Lost a large black umbrella with a wooden handle near Mall Road.",
    "category": "Accessories",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-13T10:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Debit Card (HBL)",
    "description": "Found an HBL debit card with the name 'Ahmed Ali' near a local ATM.",
    "category": "Documents",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-23T15:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Gym Bag (Nike)",
    "description": "Lost a black Nike gym bag containing workout clothes and a water bottle at a gym in Gulshan-e-Ravi.",
    "category": "Bags",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-19T13:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Earbuds (Apple AirPods)",
    "description": "Found a pair of Apple AirPods Pro (white case) near a coffee shop in Cavalry Ground.",
    "category": "Electronics",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-21T10:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Child's Teddy Bear",
    "description": "Lost a small, brown teddy bear with a red bow. Very cherished by my child. Lost at a park.",
    "category": "Toys",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-18T09:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found School ID Card",
    "description": "Found a student ID card for Lahore Grammar School near DHA main boulevard.",
    "category": "Documents",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-22T16:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost House Keys",
    "description": "Lost a small set of house keys with a distinctive blue keychain near Packages Mall.",
    "category": "Keys",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-12T14:30:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Dog (Labrador)",
    "description": "Found a friendly male Labrador near DHA EME Sector. Wearing a blue collar, no tags.",
    "category": "Pets",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-20T20:00:00.000Z"
  }
];
export const FoundItem = [
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Black Leather Wallet",
    "description": "Lost a black leather wallet near Liberty Market. Contains ID and credit cards. Reward offered.",
    "category": "Personal Belongings",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-20T10:30:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Samsung Galaxy A32",
    "description": "Found a Samsung Galaxy A32 phone in a park near Model Town. Screen is slightly cracked.",
    "category": "Electronics",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-21T14:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Gold Bracelet",
    "description": "Lost a delicate gold chain bracelet with a small heart charm. Sentimental value.",
    "category": "Jewelry",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-19T09:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Blue Backpack",
    "description": "Found a blue North Face backpack near the university campus. Contains some textbooks.",
    "category": "Bags",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-22T11:45:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Prescription Glasses",
    "description": "Lost black-framed prescription glasses at a cafe in DHA Phase 5. In a hard case.",
    "category": "Eyewear",
    "image": "https://images.unsplash.com/photo-1611681708173-ec846062fcfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwxNXx8cHJlc2NyaXB0aW9uJTIwZ2xhc3Nlc3xlbnwwfHx8fDE3MjE4MzU1NTZ8MA&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-18T16:15:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Car Keys",
    "description": "Found a set of car keys with a Honda logo fob near Packages Mall.",
    "category": "Keys",
    "image": "https://images.unsplash.com/photo-1621255554763-8a3c8e43e742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwxNHx8Y2FyJTIwa2V5c3xlbnwwfHx8fDE3MjE4MzU3MjR8MA&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-23T09:30:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost USB Drive",
    "description": "Small black USB drive, 64GB, possibly lost in a university lecture hall. Contains important documents.",
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1594254020968-3e3e2c3e1e94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8VVNCJTIwZHJpdmV8ZW58MHx8fHwxNzIxODM1ODUwfDA&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-17T11:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Kids Toy Car",
    "description": "Found a red toy sports car in a playground near Johar Town.",
    "category": "Toys",
    "image": "https://images.unsplash.com/photo-1559869687-347492c730dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8dG95JTIwY2FyfGVufDB8fHx8MTcxMTU4NDk3M3ww&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-22T18:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost DSLR Camera",
    "description": "Lost a Canon DSLR camera with a standard lens in a black camera bag. Lost near Minar-e-Pakistan.",
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1502920917128-1aa50f780244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8RFNMUiUyMGNhbWVyYXxlbnwwfHx8fDE3MTI1NDU4OTJ8MA&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-16T15:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Wallet with Cards",
    "description": "Found a brown leather wallet near Emporium Mall. Contains various cards, no cash.",
    "category": "Personal Belongings",
    "image": "https://images.unsplash.com/photo-1582967675545-200787d55d7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8YnJvd24lMjBsZWF0aGVyJTIwd2FsbGV0fGVufDB8fHx8MTcxMTU4NDAyMnww&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-23T12:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost University ID Card",
    "description": "Lost university ID card (GCU Lahore) with my photo. Please return if found.",
    "category": "Documents",
    "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-15T09:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Reading Book",
    "description": "Found a copy of 'The Alchemist' by Paulo Coelho near a bus stop in Gulberg.",
    "category": "Books",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abdcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8Ym9vayUyMHRoZSUyMGFsY2hlbWlzdHxlbnwwfHx8fDE3MjE4MzYwMDV8MA&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-22T08:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Silver Watch",
    "description": "Lost a men's silver wristwatch, possibly in a restaurant in Defence.",
    "category": "Jewelry",
    "image": "https://images.unsplash.com/photo-1523275372-b7e615e4f479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8c2lsdmVyJTIwd2F0Y2h8ZW58MHx8fHwxNzIxODM2MTE2fDA&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-14T17:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Pet Cat (Ginger)",
    "description": "Found a ginger cat wandering near my house in Garden Town. Very friendly.",
    "category": "Pets",
    "image": "https://images.unsplash.com/photo-1623387641168-d9d548325f05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8Z2luZ2VyJTIwY2F0fGVufDB8fHx8MTcxMTU4NTY1MXww&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-23T06:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Black Umbrella",
    "description": "Lost a large black umbrella with a wooden handle near Mall Road.",
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1596791336496-e2cf44b8b603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8YmxhY2slMjB1bWJyZWxsYXxlbnwwfHx8fDE3MjE4MzYzNzF8MA&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-13T10:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Debit Card (HBL)",
    "description": "Found an HBL debit card with the name 'Ahmed Ali' near a local ATM.",
    "category": "Documents",
    "image": "https://images.unsplash.com/photo-1624996379697-f01ad7e53b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8ZGViaXQlMjBjYXJkfGVufDB8fHx8MTcxMTU4NTMyNnww&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-23T15:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Gym Bag (Nike)",
    "description": "Lost a black Nike gym bag containing workout clothes and a water bottle at a gym in Gulshan-e-Ravi.",
    "category": "Bags",
    "image": "https://images.unsplash.com/photo-1582967675545-200787d55d7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8Z3ltJTIwYmFnfGVufDB8fHx8MTcxMTU4MzYzNXww&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-19T13:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Earbuds (Apple AirPods)",
    "description": "Found a pair of Apple AirPods Pro (white case) near a coffee shop in Cavalry Ground.",
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1601924638867-3a6ff64e3f2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8YWlycG9kc3xlbnwwfHx8fDE3MjE4MzY3MTJ8MA&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-21T10:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost Child's Teddy Bear",
    "description": "Lost a small, brown teddy bear with a red bow. Very cherished by my child. Lost at a park.",
    "category": "Toys",
    "image": "https://images.unsplash.com/photo-1522814238530-57173e25b18e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwxNXx8dGVkZHklMjBiZWFyfGVufDB8fHx8MTcyMTgzNjU5Mnww&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-18T09:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found School ID Card",
    "description": "Found a student ID card for Lahore Grammar School near DHA main boulevard.",
    "category": "Documents",
    "image": "https://images.unsplash.com/photo-1596791336496-e2cf44b8b603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwyMHx8c2Nob29sJTIwaWQlMjBjYXJkfGVufDB8fHx8MTcxMTU4MzYzNXww&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-22T16:00:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Lost House Keys",
    "description": "Lost a small set of house keys with a distinctive blue keychain near Packages Mall.",
    "category": "Keys",
    "image": "https://images.unsplash.com/photo-1621255554763-8a3c8e43e742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwxNHx8aG91c2UlMjBrZXlzfGVufDB8fHx8MTcyMTgzNTcyNHww&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923001234567",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-12T14:30:00.000Z"
  },
  {
    "userId": "64e4cfc2f1d2a4f9b12e1234",
    "title": "Found Dog (Labrador)",
    "description": "Found a friendly male Labrador near DHA EME Sector. Wearing a blue collar, no tags.",
    "category": "Pets",
    "image": "https://images.unsplash.com/photo-1537119106093-6c17e3137a1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIzMzJ8MHwxfHNlYXJjaHwxNXx8bGFicmFkb3IlMjBkb2d8ZW58MHx8fHwxNzIxODM2ODQyfDA&ixlib=rb-4.0.3&q=80&w=400",
    "phone": "+923006789012",
    "location": {
      "province": "Punjab",
      "city": "Lahore"
    },
    "status": "active",
    "createdAt": "2025-07-20T20:00:00.000Z"
  }
];

export const User = [
  {
    _id: "64e4cfc2f1d2a4f9b12e1234",
    name: "John Doe1",
    email: "john1@example.com",
    password: "$2b$10$abcdefgHashedPasswordExample1234",
    phone: "+923001234567",
    isAdmin: false,
  },
  {
    _id: "64e4cfc2f1d2a4f9b12e1235",
    name: "John Doe2",
    email: "john2@example.com",
    password: "$2b$10$abcdefgHashedPasswordExample1234",
    phone: "+923001234568",
    isAdmin: false,
  },
  {
    _id: "64e4cfc2f1d2a4f9b12e1236",
    name: "John Doe3",
    email: "john3@example.com",
    password: "$2b$10$abcdefgHashedPasswordExample1234",
    phone: "+923001234569",
    isAdmin: false,
  },
];