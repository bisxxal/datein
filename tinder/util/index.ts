import moment from "moment";

export const interestsData = [
  "Poetry",
  "Music",
  "Traveling",
  "Hiking",
  "Photography",
  "Dancing",
  "Cooking",
  "Reading",
  "Movies",
  "Fitness",
  "Yoga",
  "Gaming",
  "Drawing",
  "Writing",
  "Painting",
  "Cycling",
  "Camping",
  "Swimming",
  "Running",
  "Tech",
  "Fashion",
  "Meditation",
  "Crafting",
  "Volunteering",
  "Gardening",
  "Sports",
  "Skiing",
  "Snowboarding",
  "Skateboarding",
  "Animals",
  "Astrology",
  "Karaoke",
  "Podcasts",
  "Comedy",
  "Theater",
  "Languages",
  "Coffee Lover",
  "Foodie",
  "Live Music"
];


export const dummyMessages = [
    { id: 1, content: "Hello everyone!", senderId: "user1", createdAt: new Date() },
    { id: 2, content: "Welcome to the group chat!", senderId: "user2", createdAt: new Date() },
    { id: 3, content: "Feel free to share your thoughts.", senderId: "user1", createdAt: new Date() },
    { id: 3, content: "Feel free to share your thoughts.", senderId: "user", createdAt: new Date() },
    { id: 3, content: "Feel free to share your thoughts.", senderId: "user3", createdAt: new Date() },
    { id: 3, content: "Feel free to share your thoughts.", senderId: "user1", createdAt: new Date() },
    { id: 3, content: "Feel free to share your thoughts.", senderId: "user", createdAt: new Date() },

  ];

export   const dummyUserId = "user1";

export const formatDateLabel = (dateStr: string): string => {
    const date = moment(dateStr);
    if (date.isSame(moment(), 'day')) return 'Today';
    if (date.isSame(moment().subtract(1, 'day'), 'day')) return 'Yesterday';
    return date.format('D MMMM');
  };

export const demoMessages = [
  "Hii 👋🏻",
  "What up?",
  "Hello?",
  "Do you have any plans for the weekend?",
  "What's your favorite hobby?",
  "Have you read any good books recently?",
  "Do you like to travel? Where have you been?",
]