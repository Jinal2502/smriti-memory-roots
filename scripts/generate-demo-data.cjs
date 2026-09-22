const fs = require("fs");
const path = require("path");

const V = {
  teaGarden:
    "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1600&q=80",
  river:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  hills:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  mountain:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  home: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
  family:
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80",
  tea: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1600&q=80",
  kitchen:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80",
  textiles:
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80",
  garden:
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80",
  market:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
  festival:
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80",
  music:
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80",
  photo:
    "https://images.unsplash.com/photo-1452587925488-aa02fd57252b?auto=format&fit=crop&w=1600&q=80",
  forest:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
  lake: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1600&q=80",
  rain: "https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=1600&q=80",
  child:
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=80",
  woman:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  woman2:
    "https://images.unsplash.com/photo-1531123897727-8f89b7e6e7e5?auto=format&fit=crop&w=900&q=80",
  man: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=900&q=80",
  man2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  elderW:
    "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=900&q=80",
  elderM:
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=80",
};

const patients = [
  {
    id: "patient_demo_001",
    demo: true,
    name: "Anima Dutta",
    preferredName: "Anima Aita",
    age: 71,
    gender: "female",
    state: "Assam",
    city: "Guwahati",
    region: "North Eastern Region",
    primaryLanguage: "Assamese",
    supportedLanguages: ["Assamese", "Hindi", "English"],
    profileSummary:
      "Fictional demonstration profile from Assam. Strong associations with family, Assam tea, Bihu, and evenings by the Brahmaputra.",
    memoryTheme: "Tea, family evenings, and the river",
    portrait: V.elderW,
    family: [
      { name: "Pradip", relationship: "husband" },
      { name: "Mitali", relationship: "daughter" },
      { name: "Arun", relationship: "son" },
      { name: "Rohan", relationship: "grandson" },
    ],
    interests: [
      "family photographs",
      "gardening",
      "Assamese music",
      "Bihu celebrations",
      "tea",
    ],
    favoriteThings: {
      food: ["til pitha", "ghila pitha", "khar", "maas tenga"],
      drink: "Assam tea",
      flower: "kopou phool",
      music: "Bihu songs",
      place: "Brahmaputra riverbank",
    },
    familiarPlaces: [
      "Guwahati",
      "Brahmaputra riverbank",
      "family home",
      "tea garden",
    ],
    memoryStrengths: ["family members", "familiar foods", "music", "festivals"],
    memoryChallenges: ["recent events", "dates", "unfamiliar names"],
    preferredInteractionStyle: {
      textSize: "large",
      interactionMode: "voice_and_tap",
      feedbackStyle: "warm_and_encouraging",
      questionComplexity: "simple",
    },
  },
  {
    id: "patient_demo_002",
    demo: true,
    name: "Lin Kharkongor",
    preferredName: "Kong Lin",
    age: 68,
    gender: "female",
    state: "Meghalaya",
    city: "Shillong",
    region: "North Eastern Region",
    primaryLanguage: "Khasi",
    supportedLanguages: ["Khasi", "English", "Hindi"],
    profileSummary:
      "Fictional demonstration profile from Meghalaya. Memories of pine hills, rain, church singing, and family kitchens in Shillong.",
    memoryTheme: "Pine rain, market mornings, and hymns",
    portrait: V.woman,
    family: [
      { name: "Bah Don", relationship: "husband" },
      { name: "Iban", relationship: "daughter" },
      { name: "Dalen", relationship: "son" },
    ],
    interests: ["church choir", "jainsem weaving", "pine walks", "kwai"],
    favoriteThings: {
      food: ["jadoh", "tungrymbai", "pukhlein"],
      drink: "sha",
      music: "Khasi hymns",
      place: "Laitlum canyon",
    },
    familiarPlaces: ["Shillong", "Police Bazaar", "Laitlum", "family kitchen"],
    memoryStrengths: ["places", "food", "music", "family"],
    memoryChallenges: ["recent conversations", "dates"],
    preferredInteractionStyle: {
      textSize: "large",
      interactionMode: "voice_and_tap",
      feedbackStyle: "warm_and_encouraging",
      questionComplexity: "simple",
    },
  },
  {
    id: "patient_demo_003",
    demo: true,
    name: "Ibemhal Sharma",
    preferredName: "Ibemhal Ima",
    age: 74,
    gender: "female",
    state: "Manipur",
    city: "Imphal",
    region: "North Eastern Region",
    primaryLanguage: "Meiteilon",
    supportedLanguages: ["Meiteilon", "Hindi", "English"],
    profileSummary:
      "Fictional demonstration profile from Manipur. Memories of Ima Keithel, Lai Haraoba, and quiet evenings with her granddaughter.",
    memoryTheme: "The women's market and festival lamps",
    portrait: V.woman2,
    family: [
      { name: "Tomba", relationship: "husband" },
      { name: "Thoibi", relationship: "daughter" },
      { name: "Leima", relationship: "granddaughter" },
    ],
    interests: ["Ima Keithel", "phanek weaving", "Lai Haraoba", "lotus ponds"],
    favoriteThings: {
      food: ["eronba", "singju", "chak-hao kheer"],
      drink: "ngari tea",
      music: "pena songs",
      place: "Loktak lake",
    },
    familiarPlaces: ["Imphal", "Ima Keithel", "Loktak", "Kangla"],
    memoryStrengths: ["market routines", "family", "festivals"],
    memoryChallenges: ["multi-step instructions", "recent events"],
    preferredInteractionStyle: {
      textSize: "large",
      interactionMode: "voice_and_tap",
      feedbackStyle: "warm_and_encouraging",
      questionComplexity: "simple",
    },
  },
  {
    id: "patient_demo_004",
    demo: true,
    name: "Palden Lama",
    preferredName: "Palden Aaju",
    age: 76,
    gender: "male",
    state: "Sikkim",
    city: "Gangtok",
    region: "North Eastern Region",
    primaryLanguage: "Nepali",
    supportedLanguages: ["Nepali", "Bhutia", "English"],
    profileSummary:
      "Fictional demonstration profile from Sikkim. Memories of monastery mornings, cardamom gardens, and walking with his grandson.",
    memoryTheme: "Monastery bells and mountain mornings",
    portrait: V.elderM,
    family: [
      { name: "Yangchen", relationship: "wife" },
      { name: "Tenzing", relationship: "son" },
      { name: "Karma", relationship: "grandson" },
    ],
    interests: ["Rumtek monastery", "prayer flags", "cardamom", "thukpa"],
    favoriteThings: {
      food: ["thukpa", "momos", "sel roti"],
      drink: "butter tea",
      music: "monastery chants",
      place: "MG Marg",
    },
    familiarPlaces: ["Gangtok", "Rumtek", "MG Marg", "cardamom garden"],
    memoryStrengths: ["places", "routines", "family"],
    memoryChallenges: ["unfamiliar names", "dates"],
    preferredInteractionStyle: {
      textSize: "large",
      interactionMode: "voice_and_tap",
      feedbackStyle: "warm_and_encouraging",
      questionComplexity: "simple",
    },
  },
  {
    id: "patient_demo_005",
    demo: true,
    name: "Reba Debbarma",
    preferredName: "Reba Didimoni",
    age: 70,
    gender: "female",
    state: "Tripura",
    city: "Agartala",
    region: "North Eastern Region",
    primaryLanguage: "Bengali",
    supportedLanguages: ["Bengali", "Kokborok", "Hindi", "English"],
    profileSummary:
      "Fictional demonstration profile from Tripura. Memories of Ujjayanta Palace walks, Garia Puja, and fish cooked at home.",
    memoryTheme: "Palace gardens and monsoon kitchens",
    portrait: V.woman,
    family: [
      { name: "Suman", relationship: "husband" },
      { name: "Rina", relationship: "daughter" },
      { name: "Ayan", relationship: "grandson" },
    ],
    interests: ["risha weaving", "Garia Puja", "palace gardens", "stories"],
    favoriteThings: {
      food: ["mui borok", "pabda fish", "pitha"],
      drink: "lemon tea",
      music: "Garia songs",
      place: "Ujjayanta Palace",
    },
    familiarPlaces: ["Agartala", "Ujjayanta Palace", "local market", "home courtyard"],
    memoryStrengths: ["family", "food", "festivals"],
    memoryChallenges: ["recent conversations", "dates"],
    preferredInteractionStyle: {
      textSize: "large",
      interactionMode: "voice_and_tap",
      feedbackStyle: "warm_and_encouraging",
      questionComplexity: "simple",
    },
  },
  {
    id: "patient_demo_006",
    demo: true,
    name: "Temjen Ao",
    preferredName: "Temjen Apa",
    age: 73,
    gender: "male",
    state: "Nagaland",
    city: "Kohima",
    region: "North Eastern Region",
    primaryLanguage: "Ao",
    supportedLanguages: ["Ao", "Nagamese", "English"],
    profileSummary:
      "Fictional demonstration profile from Nagaland. Memories of Hornbill evenings, village paths, and cooking with smoked pork.",
    memoryTheme: "Hornbill evenings and village paths",
    portrait: V.man,
    family: [
      { name: "Alemla", relationship: "wife" },
      { name: "Moa", relationship: "son" },
      { name: "Naro", relationship: "granddaughter" },
    ],
    interests: ["Hornbill Festival", "church", "bamboo crafts", "storytelling"],
    favoriteThings: {
      food: ["smoked pork", "galho", "axone"],
      drink: "black tea",
      music: "Ao folk songs",
      place: "Kohima village",
    },
    familiarPlaces: ["Kohima", "Kisama", "church courtyard", "village path"],
    memoryStrengths: ["stories", "places", "family", "music"],
    memoryChallenges: ["multi-step instructions", "recent events"],
    preferredInteractionStyle: {
      textSize: "large",
      interactionMode: "voice_and_tap",
      feedbackStyle: "warm_and_encouraging",
      questionComplexity: "simple",
    },
  },
];

function mem(patientId, i, data) {
  return {
    id: `${patientId}_memory_${String(i).padStart(3, "0")}`,
    patientId,
    importance: data.importance || "high",
    difficulty: data.difficulty || "easy",
    language: "English",
    activityTypes: data.activityTypes || ["recall", "recognition", "conversation"],
    ...data,
  };
}

const banks = {
  patient_demo_001: [
    mem("patient_demo_001", 1, {
      category: "family",
      title: "Daughter Mitali",
      content:
        "Anima Aita's daughter is named Mitali. Mitali often visits and sits with her during evening tea.",
      entities: ["Anima Aita", "Mitali"],
      image: V.family,
      caption: "Evening tea with family",
      prompt: "Who often sits with Anima Aita during evening tea?",
      choices: ["Mitali", "Arun", "Rohan"],
      correctChoice: "Mitali",
    }),
    mem("patient_demo_001", 2, {
      category: "family",
      title: "Son Arun",
      content:
        "Anima Aita's son is named Arun. He often helps with errands and household tasks.",
      entities: ["Anima Aita", "Arun"],
      image: V.man2,
      caption: "Arun helps at home",
      prompt: "Who is Anima Aita's son?",
      choices: ["Rohan", "Arun", "Pradip"],
      correctChoice: "Arun",
    }),
    mem("patient_demo_001", 3, {
      category: "family",
      title: "Grandson Rohan",
      content:
        "Anima Aita's grandson is named Rohan. She enjoys telling him small stories when he visits.",
      entities: ["Anima Aita", "Rohan"],
      image: V.child,
      caption: "Stories for Rohan",
      prompt: "Who is this?",
      choices: ["Mitali", "Arun", "Rohan"],
      correctChoice: "Rohan",
    }),
    mem("patient_demo_001", 4, {
      category: "food",
      title: "Til Pitha",
      content:
        "Anima Aita remembers til pitha as a familiar festive food of rice-flour and sesame, especially around Bihu.",
      entities: ["til pitha", "Bihu"],
      image: V.kitchen,
      caption: "Festive rice cakes",
      prompt: "Which festive food is made with rice flour and sesame?",
      choices: ["Til pitha", "Khar", "Assam tea"],
      correctChoice: "Til pitha",
    }),
    mem("patient_demo_001", 5, {
      category: "food",
      title: "Ghila Pitha",
      content:
        "Anima Aita remembers ghila pitha as a traditional sweet prepared during special occasions.",
      entities: ["ghila pitha"],
      image: V.kitchen,
      caption: "A familiar sweet",
      prompt: "Which sweet is prepared on special occasions?",
      choices: ["Ghila pitha", "Maas tenga", "Gamosa"],
      correctChoice: "Ghila pitha",
    }),
    mem("patient_demo_001", 6, {
      category: "food",
      title: "Khar",
      content: "Khar is a familiar Assamese dish in Anima Aita's memory of meals at home.",
      entities: ["khar"],
      image: V.kitchen,
      prompt: "Which dish is a familiar Assamese meal at home?",
      choices: ["Khar", "Momos", "Jadoh"],
      correctChoice: "Khar",
    }),
    mem("patient_demo_001", 7, {
      category: "food",
      title: "Maas Tenga",
      content:
        "Anima Aita remembers maas tenga as a familiar sour fish dish from family meals.",
      entities: ["maas tenga"],
      image: V.kitchen,
      prompt: "What is the familiar sour fish dish?",
      choices: ["Maas tenga", "Til pitha", "Tea"],
      correctChoice: "Maas tenga",
    }),
    mem("patient_demo_001", 8, {
      category: "routine",
      title: "Morning Assam Tea",
      content:
        "Anima Aita enjoys Assam tea in the morning. Having tea is part of her familiar daily routine.",
      entities: ["Assam tea"],
      image: V.tea,
      caption: "The first cup of the day",
      prompt: "What does Anima Aita enjoy in the morning?",
      choices: ["Assam tea", "Butter tea", "Cold milk"],
      correctChoice: "Assam tea",
    }),
    mem("patient_demo_001", 9, {
      category: "festival",
      title: "Rongali Bihu",
      content:
        "Anima Aita remembers Rongali Bihu as a joyful family celebration with new clothes, music, food and visits.",
      entities: ["Rongali Bihu"],
      image: V.festival,
      prompt: "Which spring festival brings new clothes and visits?",
      choices: ["Rongali Bihu", "Hornbill", "Lai Haraoba"],
      correctChoice: "Rongali Bihu",
      sequence: ["New clothes are chosen", "Family visits begin", "Music and food follow"],
    }),
    mem("patient_demo_001", 10, {
      category: "festival",
      title: "Magh Bihu",
      content:
        "Anima Aita remembers Magh Bihu through family feasts and traditional foods.",
      entities: ["Magh Bihu"],
      image: V.festival,
      prompt: "Which festival is remembered through family feasts?",
      choices: ["Magh Bihu", "Christmas market", "Garia Puja"],
      correctChoice: "Magh Bihu",
    }),
    mem("patient_demo_001", 11, {
      category: "music",
      title: "Bihu Songs",
      content:
        "Anima Aita enjoys listening to Bihu songs. Familiar music reminds her of celebrations and family gatherings.",
      entities: ["Bihu songs"],
      image: V.music,
      prompt: "Which songs does Anima Aita enjoy listening to?",
      choices: ["Bihu songs", "Rock songs", "Film trailers"],
      correctChoice: "Bihu songs",
    }),
    mem("patient_demo_001", 12, {
      category: "place",
      title: "Brahmaputra Riverbank",
      content:
        "Anima Aita remembers visiting the Brahmaputra riverbank with family. The river is associated with peaceful evenings.",
      entities: ["Brahmaputra"],
      image: V.river,
      caption: "An evening by the Brahmaputra",
      prompt: "What do you remember about this place?",
      choices: ["The Brahmaputra riverbank", "A snow peak", "A desert road"],
      correctChoice: "The Brahmaputra riverbank",
    }),
    mem("patient_demo_001", 13, {
      category: "routine",
      title: "Morning Garden",
      content:
        "Anima Aita enjoys looking after plants in the morning before starting the rest of her day.",
      entities: ["garden"],
      image: V.garden,
      prompt: "Where does Anima Aita like to spend quiet morning time?",
      choices: ["The garden", "The bus stop", "The office"],
      correctChoice: "The garden",
    }),
    mem("patient_demo_001", 14, {
      category: "object",
      title: "Family Photograph",
      content:
        "Anima Aita keeps an old family photograph. Looking at it helps her remember familiar faces.",
      entities: ["family photograph"],
      image: V.photo,
      prompt: "What helps Anima Aita remember familiar faces?",
      choices: ["A family photograph", "A map", "A newspaper"],
      correctChoice: "A family photograph",
    }),
    mem("patient_demo_001", 15, {
      category: "place",
      title: "Tea Garden Visit",
      content:
        "Anima Aita remembers visiting a tea garden with her family — greenery, fresh air, and drinking tea together.",
      entities: ["tea garden"],
      image: V.teaGarden,
      caption: "Walking through the tea garden",
      prompt: "Where did the family walk among green rows?",
      choices: ["A tea garden", "A railway yard", "A cinema"],
      correctChoice: "A tea garden",
    }),
    mem("patient_demo_001", 16, {
      category: "object",
      title: "Traditional Gamosa",
      content:
        "Anima Aita remembers a traditional Assamese gamosa as a familiar household and cultural object.",
      entities: ["gamosa"],
      image: V.textiles,
      prompt: "Which familiar textile is kept at home?",
      choices: ["Gamosa", "School bag", "Umbrella"],
      correctChoice: "Gamosa",
    }),
    mem("patient_demo_001", 17, {
      category: "family",
      title: "Evening With Family",
      content:
        "Anima Aita enjoys sitting with family in the evening, talking about everyday life while having tea.",
      entities: ["family", "tea"],
      image: V.home,
      prompt: "What happens in the evening at home?",
      choices: ["Family tea and talk", "A long journey", "A meeting"],
      correctChoice: "Family tea and talk",
    }),
    mem("patient_demo_001", 18, {
      category: "festival",
      title: "Bihu Music and Dance",
      content:
        "Anima Aita remembers Bihu celebrations through music, dancing and family gatherings.",
      entities: ["Bihu", "music"],
      image: V.festival,
      activityTypes: ["recognition", "conversation", "recall", "sequence"],
      sequence: ["The drums begin", "People gather to dance", "The family shares food"],
    }),
    mem("patient_demo_001", 19, {
      category: "routine",
      title: "Favorite Color",
      content:
        "Green is Anima Aita's favorite color. She especially likes seeing plants and trees around her home.",
      entities: ["green"],
      image: V.garden,
      prompt: "Which colour does Anima Aita like most?",
      choices: ["Green", "Neon pink", "Silver"],
      correctChoice: "Green",
    }),
    mem("patient_demo_001", 20, {
      category: "stories",
      title: "Family Stories",
      content:
        "Anima Aita enjoys telling her grandson Rohan small stories about family life and celebrations from earlier years.",
      entities: ["Rohan", "family"],
      image: V.child,
      prompt: "Who likes to hear Anima Aita's small stories?",
      choices: ["Rohan", "A neighbour's dog", "The postman"],
      correctChoice: "Rohan",
    }),
  ],
};

function fillBank(patient, extras) {
  return extras.map((item, i) => mem(patient.id, i + 1, item));
}

banks.patient_demo_002 = fillBank(patients[1], [
  { category: "family", title: "Daughter Iban", content: "Kong Lin's daughter is named Iban. She brings vegetables from Police Bazaar on Saturday mornings.", entities: ["Iban"], image: V.family, prompt: "Who brings vegetables on Saturday?", choices: ["Iban", "Dalen", "Bah Don"], correctChoice: "Iban" },
  { category: "family", title: "Son Dalen", content: "Kong Lin's son is named Dalen. He drives her to church when the rain is heavy.", entities: ["Dalen"], image: V.man2, prompt: "Who drives Kong Lin to church in the rain?", choices: ["Dalen", "Iban", "Karma"], correctChoice: "Dalen" },
  { category: "place", title: "Shillong Hills", content: "Kong Lin remembers the pine-covered hills around Shillong, especially after rain.", entities: ["Shillong"], image: V.hills, prompt: "Which city sits among pine hills?", choices: ["Shillong", "Guwahati", "Agartala"], correctChoice: "Shillong" },
  { category: "place", title: "Laitlum Canyon", content: "Kong Lin remembers quiet walks at Laitlum, looking across the canyon with family.", entities: ["Laitlum"], image: V.hills, prompt: "Where did the family walk across open hills?", choices: ["Laitlum", "Loktak", "Rumtek"], correctChoice: "Laitlum" },
  { category: "place", title: "Police Bazaar", content: "Police Bazaar is a familiar market where Kong Lin used to choose fresh produce.", entities: ["Police Bazaar"], image: V.market, prompt: "Which market is familiar in Shillong?", choices: ["Police Bazaar", "Ima Keithel", "MG Marg"], correctChoice: "Police Bazaar" },
  { category: "food", title: "Jadoh", content: "Kong Lin remembers jadoh as a familiar rice dish cooked for family Sundays.", entities: ["jadoh"], image: V.kitchen, prompt: "Which rice dish is cooked on Sundays?", choices: ["Jadoh", "Til pitha", "Thukpa"], correctChoice: "Jadoh" },
  { category: "food", title: "Tungrymbai", content: "Tungrymbai is a fermented soybean dish Kong Lin associates with home cooking.", entities: ["tungrymbai"], image: V.kitchen, prompt: "Which soybean dish is cooked at home?", choices: ["Tungrymbai", "Maas tenga", "Momos"], correctChoice: "Tungrymbai" },
  { category: "food", title: "Pukhlein", content: "Kong Lin remembers pukhlein as a sweet rice cake shared during visits.", entities: ["pukhlein"], image: V.kitchen, prompt: "Which sweet rice cake is shared with guests?", choices: ["Pukhlein", "Sel roti", "Galho"], correctChoice: "Pukhlein" },
  { category: "routine", title: "Morning Sha", content: "Kong Lin starts the day with a quiet cup of sha while looking at the rain.", entities: ["sha", "tea"], image: V.tea, prompt: "What does Kong Lin drink in the morning?", choices: ["Sha", "Butter tea", "Coffee soda"], correctChoice: "Sha" },
  { category: "routine", title: "Kwai After Lunch", content: "Sharing kwai after lunch is a familiar, unhurried habit in Kong Lin's home.", entities: ["kwai"], image: V.home, prompt: "What is shared after lunch at home?", choices: ["Kwai", "Ice cream", "Popcorn"], correctChoice: "Kwai" },
  { category: "music", title: "Church Hymns", content: "Kong Lin remembers singing Khasi hymns in church. The familiar tunes feel like home.", entities: ["hymns"], image: V.music, prompt: "Which music does Kong Lin remember from church?", choices: ["Khasi hymns", "Bihu songs", "Film scores"], correctChoice: "Khasi hymns" },
  { category: "object", title: "Jainsem", content: "Kong Lin keeps a jainsem folded carefully for Sundays and family occasions.", entities: ["jainsem"], image: V.textiles, prompt: "Which garment is kept for Sundays?", choices: ["Jainsem", "Gamosa", "Phanek"], correctChoice: "Jainsem" },
  { category: "festival", title: "Christmas in Shillong", content: "Kong Lin remembers Christmas in Shillong through choir practice, lights, and family meals.", entities: ["Christmas"], image: V.festival, prompt: "Which winter celebration is remembered in Shillong?", choices: ["Christmas", "Rongali Bihu", "Hornbill"], correctChoice: "Christmas" },
  { category: "place", title: "Pine Walk After Rain", content: "After rain, Kong Lin likes a slow walk among pine trees near home.", entities: ["pine", "rain"], image: V.forest, prompt: "Where does Kong Lin walk after rain?", choices: ["Among pine trees", "Along a desert", "Inside a mall"], correctChoice: "Among pine trees" },
  { category: "family", title: "Bah Don", content: "Kong Lin's husband is Bah Don. They used to listen to the radio together in the evening.", entities: ["Bah Don"], image: V.elderM, prompt: "Who listened to the radio with Kong Lin?", choices: ["Bah Don", "Rohan", "Temjen"], correctChoice: "Bah Don" },
  { category: "stories", title: "Stories of the Hills", content: "Kong Lin tells Iban stories about walking to school through mist.", entities: ["Iban", "stories"], image: V.rain, prompt: "Who hears Kong Lin's school-day stories?", choices: ["Iban", "Rohan", "Leima"], correctChoice: "Iban" },
  { category: "object", title: "Family Photograph", content: "A small framed photograph sits near the window in Kong Lin's room.", entities: ["photograph"], image: V.photo, prompt: "What sits near the window?", choices: ["A family photograph", "A bicycle", "A radio tower"], correctChoice: "A family photograph" },
  { category: "routine", title: "Saturday Market", content: "Saturday mornings mean choosing greens at the market, then cooking slowly at home.", entities: ["market"], image: V.market, activityTypes: ["recall", "sequence", "conversation"], sequence: ["Walk to the market", "Choose fresh greens", "Cook slowly at home"] },
]);

banks.patient_demo_003 = fillBank(patients[2], [
  { category: "family", title: "Daughter Thoibi", content: "Ibemhal Ima's daughter is named Thoibi. She walks with her to Ima Keithel on market days.", entities: ["Thoibi"], image: V.family, prompt: "Who walks with Ibemhal Ima to the market?", choices: ["Thoibi", "Tomba", "Leima"], correctChoice: "Thoibi" },
  { category: "family", title: "Granddaughter Leima", content: "Leima sits beside Ibemhal Ima in the evening and asks for old stories.", entities: ["Leima"], image: V.child, prompt: "Who asks for old stories in the evening?", choices: ["Leima", "Rohan", "Karma"], correctChoice: "Leima" },
  { category: "place", title: "Ima Keithel", content: "Ima Keithel, the women's market, is one of Ibemhal Ima's strongest familiar places.", entities: ["Ima Keithel"], image: V.market, prompt: "Which market is run by women in Imphal?", choices: ["Ima Keithel", "Police Bazaar", "MG Marg"], correctChoice: "Ima Keithel" },
  { category: "place", title: "Loktak Lake", content: "Ibemhal Ima remembers quiet hours looking across Loktak Lake.", entities: ["Loktak"], image: V.lake, prompt: "Which lake is familiar to Ibemhal Ima?", choices: ["Loktak", "Brahmaputra", "Laitlum"], correctChoice: "Loktak" },
  { category: "place", title: "Kangla", content: "Walks near Kangla are associated with cooler air and family outings.", entities: ["Kangla"], image: V.hills, prompt: "Where did the family walk in cooler air?", choices: ["Kangla", "Kisama", "Tea garden"], correctChoice: "Kangla" },
  { category: "food", title: "Eronba", content: "Eronba is a mashed vegetable dish Ibemhal Ima associates with home meals.", entities: ["eronba"], image: V.kitchen, prompt: "Which mashed dish is cooked at home?", choices: ["Eronba", "Khar", "Jadoh"], correctChoice: "Eronba" },
  { category: "food", title: "Singju", content: "Singju is a fresh salad Ibemhal Ima likes to share when guests arrive.", entities: ["singju"], image: V.kitchen, prompt: "What fresh salad is shared with guests?", choices: ["Singju", "Thukpa", "Pitha"], correctChoice: "Singju" },
  { category: "food", title: "Chak-hao Kheer", content: "Black rice kheer is remembered from festival evenings.", entities: ["chak-hao"], image: V.kitchen, prompt: "Which sweet uses black rice?", choices: ["Chak-hao kheer", "Til pitha", "Pukhlein"], correctChoice: "Chak-hao kheer" },
  { category: "festival", title: "Lai Haraoba", content: "Lai Haraoba is remembered through dance, lamps, and gathering with neighbours.", entities: ["Lai Haraoba"], image: V.festival, prompt: "Which festival includes dance and lamps?", choices: ["Lai Haraoba", "Magh Bihu", "Christmas"], correctChoice: "Lai Haraoba", sequence: ["Lamps are lit", "Dance begins", "Neighbours gather"] },
  { category: "music", title: "Pena Songs", content: "Ibemhal Ima enjoys the sound of pena songs from earlier celebrations.", entities: ["pena"], image: V.music, prompt: "Which instrument's songs feel familiar?", choices: ["Pena songs", "Electric guitar", "Bihu dhol only"], correctChoice: "Pena songs" },
  { category: "object", title: "Phanek", content: "A woven phanek is kept for festival days and family photographs.", entities: ["phanek"], image: V.textiles, prompt: "Which woven cloth is kept for festival days?", choices: ["Phanek", "Gamosa", "Jainsem"], correctChoice: "Phanek" },
  { category: "routine", title: "Early Market Day", content: "On market mornings Ibemhal Ima likes to leave while the lanes are still quiet.", entities: ["market"], image: V.market, prompt: "When does Ibemhal Ima like to go to market?", choices: ["Early, while lanes are quiet", "At midnight", "After the market closes"], correctChoice: "Early, while lanes are quiet" },
  { category: "family", title: "Tomba", content: "Ibemhal Ima's husband is Tomba. They used to sit by the courtyard after dinner.", entities: ["Tomba"], image: V.elderM, prompt: "Who sat in the courtyard after dinner?", choices: ["Tomba", "Arun", "Moa"], correctChoice: "Tomba" },
  { category: "stories", title: "Lotus Pond Stories", content: "Ibemhal Ima tells Leima about lotus ponds near home in the rainy months.", entities: ["lotus", "Leima"], image: V.lake, prompt: "Who hears stories about lotus ponds?", choices: ["Leima", "Rohan", "Iban"], correctChoice: "Leima" },
  { category: "routine", title: "Evening Courtyard", content: "Evenings are for sitting in the courtyard and listening to the neighbourhood.", entities: ["courtyard"], image: V.home, prompt: "Where does the evening usually happen?", choices: ["In the courtyard", "On a train", "In an office"], correctChoice: "In the courtyard" },
  { category: "object", title: "Old Photograph", content: "A photograph from a family wedding sits on a low shelf.", entities: ["photograph"], image: V.photo, prompt: "What sits on the low shelf?", choices: ["A wedding photograph", "A kettle", "A bicycle"], correctChoice: "A wedding photograph" },
  { category: "place", title: "Imphal Home", content: "The family home in Imphal is associated with the smell of cooking and woven mats.", entities: ["Imphal"], image: V.home, prompt: "Which city is home?", choices: ["Imphal", "Gangtok", "Kohima"], correctChoice: "Imphal" },
  { category: "festival", title: "Neighbour Lamps", content: "During festivals, Ibemhal Ima remembers lamps appearing along the lane.", entities: ["lamps"], image: V.festival, activityTypes: ["recall", "conversation", "sequence"], sequence: ["Dusk arrives", "Lamps are placed along the lane", "People come out to talk"] },
]);

banks.patient_demo_004 = fillBank(patients[3], [
  { category: "family", title: "Wife Yangchen", content: "Palden Aaju's wife is Yangchen. They drink butter tea together in the early morning.", entities: ["Yangchen"], image: V.family, prompt: "Who drinks butter tea with Palden Aaju?", choices: ["Yangchen", "Karma", "Tenzing"], correctChoice: "Yangchen" },
  { category: "family", title: "Son Tenzing", content: "Tenzing visits on weekends and walks with Palden Aaju along MG Marg.", entities: ["Tenzing"], image: V.man2, prompt: "Who walks with Palden Aaju on weekends?", choices: ["Tenzing", "Arun", "Dalen"], correctChoice: "Tenzing" },
  { category: "family", title: "Grandson Karma", content: "Karma likes to hold Palden Aaju's hand on the monastery steps.", entities: ["Karma"], image: V.child, prompt: "Who holds Palden Aaju's hand on the steps?", choices: ["Karma", "Rohan", "Ayan"], correctChoice: "Karma" },
  { category: "place", title: "Rumtek Monastery", content: "Morning visits to Rumtek are among Palden Aaju's calmest memories.", entities: ["Rumtek"], image: V.mountain, prompt: "Which monastery is visited in the morning?", choices: ["Rumtek", "Kangla", "Kisama"], correctChoice: "Rumtek" },
  { category: "place", title: "MG Marg", content: "MG Marg is a familiar stretch for slow evening walks.", entities: ["MG Marg"], image: V.home, prompt: "Where are the slow evening walks?", choices: ["MG Marg", "Police Bazaar", "Ima Keithel"], correctChoice: "MG Marg" },
  { category: "place", title: "Cardamom Garden", content: "Palden Aaju remembers the smell of cardamom gardens after rain.", entities: ["cardamom"], image: V.forest, prompt: "Which garden is remembered after rain?", choices: ["Cardamom garden", "Tea garden", "Lotus pond"], correctChoice: "Cardamom garden" },
  { category: "food", title: "Thukpa", content: "A bowl of thukpa on a cold evening is a familiar comfort.", entities: ["thukpa"], image: V.kitchen, prompt: "Which soup is comforting on cold evenings?", choices: ["Thukpa", "Maas tenga", "Singju"], correctChoice: "Thukpa" },
  { category: "food", title: "Momos", content: "Momos are associated with family gatherings in Gangtok.", entities: ["momos"], image: V.kitchen, prompt: "Which food is associated with family gatherings?", choices: ["Momos", "Til pitha", "Jadoh"], correctChoice: "Momos" },
  { category: "food", title: "Sel Roti", content: "Sel roti is prepared during festivals and shared with neighbours.", entities: ["sel roti"], image: V.kitchen, prompt: "Which ring-shaped bread is shared at festivals?", choices: ["Sel roti", "Pukhlein", "Ghila pitha"], correctChoice: "Sel roti" },
  { category: "routine", title: "Butter Tea", content: "Palden Aaju starts most mornings with butter tea.", entities: ["butter tea"], image: V.tea, prompt: "What does Palden Aaju drink in the morning?", choices: ["Butter tea", "Assam tea", "Sha"], correctChoice: "Butter tea" },
  { category: "music", title: "Monastery Chants", content: "Chants from the monastery feel familiar and settling.", entities: ["chants"], image: V.music, prompt: "Which sound feels familiar in the morning?", choices: ["Monastery chants", "Bihu dhol", "Traffic horns"], correctChoice: "Monastery chants" },
  { category: "object", title: "Prayer Flags", content: "Prayer flags outside the window move with the mountain wind.", entities: ["prayer flags"], image: V.textiles, prompt: "What moves with the mountain wind?", choices: ["Prayer flags", "A gamosa", "A jainsem"], correctChoice: "Prayer flags" },
  { category: "festival", title: "Losar Morning", content: "Losar is remembered through early visits, warm food, and new clothes.", entities: ["Losar"], image: V.festival, prompt: "Which new-year morning is remembered?", choices: ["Losar", "Rongali Bihu", "Hornbill"], correctChoice: "Losar", sequence: ["Early visit", "Warm food is shared", "New clothes are worn"] },
  { category: "place", title: "Gangtok Home", content: "The family home in Gangtok looks toward the hills.", entities: ["Gangtok"], image: V.mountain, prompt: "Which town is home?", choices: ["Gangtok", "Kohima", "Imphal"], correctChoice: "Gangtok" },
  { category: "stories", title: "Walking Stories", content: "Palden Aaju tells Karma about walking to school before the roads were wide.", entities: ["Karma"], image: V.hills, prompt: "Who hears the walking-to-school stories?", choices: ["Karma", "Leima", "Rohan"], correctChoice: "Karma" },
  { category: "routine", title: "Quiet Afternoon", content: "Afternoons are for sitting near the window and watching clouds move.", entities: ["window"], image: V.home, prompt: "What happens on quiet afternoons?", choices: ["Watching clouds from the window", "A football match", "A long flight"], correctChoice: "Watching clouds from the window" },
  { category: "object", title: "Wooden Bowl", content: "A wooden bowl used for tea sits on the shelf.", entities: ["bowl"], image: V.photo, prompt: "What sits on the shelf?", choices: ["A wooden tea bowl", "A bicycle bell", "A school bag"], correctChoice: "A wooden tea bowl" },
  { category: "family", title: "Evening Together", content: "Evenings are slow: tea, a short walk, and talking with Yangchen.", entities: ["Yangchen", "tea"], image: V.home, activityTypes: ["conversation", "recall", "sequence"], sequence: ["Tea is poured", "A short walk", "Talking together"] },
]);

banks.patient_demo_005 = fillBank(patients[4], [
  { category: "family", title: "Daughter Rina", content: "Reba Didimoni's daughter is Rina. She visits with flowers from the market.", entities: ["Rina"], image: V.family, prompt: "Who visits with flowers?", choices: ["Rina", "Ayan", "Suman"], correctChoice: "Rina" },
  { category: "family", title: "Grandson Ayan", content: "Ayan likes to sit in the courtyard and listen to Reba Didimoni's stories.", entities: ["Ayan"], image: V.child, prompt: "Who listens to courtyard stories?", choices: ["Ayan", "Rohan", "Karma"], correctChoice: "Ayan" },
  { category: "family", title: "Suman", content: "Reba Didimoni's husband is Suman. They used to walk near the palace gardens.", entities: ["Suman"], image: V.elderM, prompt: "Who walked near the palace gardens?", choices: ["Suman", "Tomba", "Bah Don"], correctChoice: "Suman" },
  { category: "place", title: "Ujjayanta Palace", content: "Walks around Ujjayanta Palace are among Reba Didimoni's calmest memories.", entities: ["Ujjayanta Palace"], image: V.garden, prompt: "Which palace gardens are familiar?", choices: ["Ujjayanta Palace", "Rumtek", "Kangla"], correctChoice: "Ujjayanta Palace" },
  { category: "place", title: "Agartala Home", content: "The courtyard at home in Agartala is where evenings usually begin.", entities: ["Agartala"], image: V.home, prompt: "Which city is home?", choices: ["Agartala", "Shillong", "Guwahati"], correctChoice: "Agartala" },
  { category: "place", title: "Local Market", content: "The local market is where Reba Didimoni chose fish and greens.", entities: ["market"], image: V.market, prompt: "Where were fish and greens chosen?", choices: ["The local market", "The monastery", "The tea garden"], correctChoice: "The local market" },
  { category: "food", title: "Pabda Fish", content: "Pabda fish cooked at home is a familiar monsoon meal.", entities: ["pabda"], image: V.kitchen, prompt: "Which fish is a familiar monsoon meal?", choices: ["Pabda fish", "Maas tenga", "Momos"], correctChoice: "Pabda fish" },
  { category: "food", title: "Mui Borok", content: "Mui borok is associated with family tables and slow cooking.", entities: ["mui borok"], image: V.kitchen, prompt: "Which dish is cooked slowly for family?", choices: ["Mui borok", "Jadoh", "Thukpa"], correctChoice: "Mui borok" },
  { category: "food", title: "Pitha", content: "Pitha is prepared when relatives visit.", entities: ["pitha"], image: V.kitchen, prompt: "What is prepared when relatives visit?", choices: ["Pitha", "Axone", "Sel roti"], correctChoice: "Pitha" },
  { category: "routine", title: "Lemon Tea", content: "Reba Didimoni enjoys lemon tea in the late afternoon.", entities: ["lemon tea"], image: V.tea, prompt: "What is drunk in the late afternoon?", choices: ["Lemon tea", "Butter tea", "Black coffee"], correctChoice: "Lemon tea" },
  { category: "festival", title: "Garia Puja", content: "Garia Puja is remembered through songs, gathering, and familiar food.", entities: ["Garia Puja"], image: V.festival, prompt: "Which festival is remembered through songs?", choices: ["Garia Puja", "Losar", "Lai Haraoba"], correctChoice: "Garia Puja" },
  { category: "music", title: "Garia Songs", content: "Garia songs remind Reba Didimoni of courtyard evenings.", entities: ["Garia songs"], image: V.music, prompt: "Which songs belong to courtyard evenings?", choices: ["Garia songs", "Bihu songs", "Rock songs"], correctChoice: "Garia songs" },
  { category: "object", title: "Risha", content: "A woven risha is kept folded for festival photographs.", entities: ["risha"], image: V.textiles, prompt: "Which woven cloth is kept for photographs?", choices: ["Risha", "Gamosa", "Prayer flags"], correctChoice: "Risha" },
  { category: "stories", title: "Monsoon Stories", content: "Reba Didimoni tells Ayan about rains that filled the courtyard.", entities: ["Ayan", "rain"], image: V.rain, prompt: "Who hears the monsoon stories?", choices: ["Ayan", "Leima", "Naro"], correctChoice: "Ayan" },
  { category: "routine", title: "Courtyard Evening", content: "Evenings begin in the courtyard with tea and unhurried talk.", entities: ["courtyard"], image: V.home, prompt: "Where do evenings begin?", choices: ["In the courtyard", "On a highway", "In a studio"], correctChoice: "In the courtyard" },
  { category: "object", title: "Old Photograph", content: "A photograph of Rina as a child sits beside the window.", entities: ["photograph", "Rina"], image: V.photo, prompt: "Whose childhood photograph sits by the window?", choices: ["Rina", "Mitali", "Iban"], correctChoice: "Rina" },
  { category: "place", title: "Palace Garden Path", content: "A shaded path near the palace is used for slow morning walks.", entities: ["garden"], image: V.garden, activityTypes: ["recall", "sequence", "recognition"], sequence: ["Leave home early", "Walk the shaded path", "Sit for a while"] },
  { category: "festival", title: "Relatives Visiting", content: "Festival weeks mean extra plates, familiar songs, and relatives at the door.", entities: ["family", "festival"], image: V.festival, prompt: "What happens in festival weeks?", choices: ["Relatives visit", "The market closes forever", "The hills disappear"], correctChoice: "Relatives visit" },
]);

banks.patient_demo_006 = fillBank(patients[5], [
  { category: "family", title: "Wife Alemla", content: "Temjen Apa's wife is Alemla. They share black tea before the house wakes.", entities: ["Alemla"], image: V.family, prompt: "Who shares black tea with Temjen Apa?", choices: ["Alemla", "Naro", "Moa"], correctChoice: "Alemla" },
  { category: "family", title: "Son Moa", content: "Moa visits from town and helps repair small things around the house.", entities: ["Moa"], image: V.man2, prompt: "Who helps repair things around the house?", choices: ["Moa", "Arun", "Tenzing"], correctChoice: "Moa" },
  { category: "family", title: "Granddaughter Naro", content: "Naro likes sitting beside Temjen Apa while he tells village stories.", entities: ["Naro"], image: V.child, prompt: "Who sits beside Temjen Apa for stories?", choices: ["Naro", "Rohan", "Leima"], correctChoice: "Naro" },
  { category: "place", title: "Kohima Village", content: "The village path in Kohima is one of Temjen Apa's most familiar walks.", entities: ["Kohima"], image: V.hills, prompt: "Which village path is most familiar?", choices: ["Kohima village", "MG Marg", "Police Bazaar"], correctChoice: "Kohima village" },
  { category: "place", title: "Kisama", content: "Kisama is remembered from Hornbill evenings with music and gathering.", entities: ["Kisama"], image: V.festival, prompt: "Where are Hornbill evenings remembered?", choices: ["Kisama", "Rumtek", "Loktak"], correctChoice: "Kisama" },
  { category: "place", title: "Church Courtyard", content: "Sunday mornings are associated with the church courtyard.", entities: ["church"], image: V.home, prompt: "Where are Sunday mornings spent?", choices: ["The church courtyard", "A tea garden", "Ima Keithel"], correctChoice: "The church courtyard" },
  { category: "food", title: "Smoked Pork", content: "Smoked pork cooked at home is a familiar family meal.", entities: ["smoked pork"], image: V.kitchen, prompt: "Which meat dish is familiar at home?", choices: ["Smoked pork", "Maas tenga", "Pabda fish"], correctChoice: "Smoked pork" },
  { category: "food", title: "Galho", content: "Galho is a rice and vegetable dish Temjen Apa associates with quiet evenings.", entities: ["galho"], image: V.kitchen, prompt: "Which rice dish belongs to quiet evenings?", choices: ["Galho", "Jadoh", "Thukpa"], correctChoice: "Galho" },
  { category: "food", title: "Axone", content: "Axone is a fermented soybean flavour that belongs to home cooking.", entities: ["axone"], image: V.kitchen, prompt: "Which flavour belongs to home cooking?", choices: ["Axone", "Til pitha", "Sel roti"], correctChoice: "Axone" },
  { category: "routine", title: "Black Tea", content: "Temjen Apa starts the day with strong black tea.", entities: ["black tea"], image: V.tea, prompt: "What does Temjen Apa drink in the morning?", choices: ["Black tea", "Butter tea", "Lemon soda"], correctChoice: "Black tea" },
  { category: "festival", title: "Hornbill Evening", content: "Hornbill Festival evenings are remembered through dance, firelight, and gathering.", entities: ["Hornbill"], image: V.festival, prompt: "Which festival evening is remembered?", choices: ["Hornbill", "Rongali Bihu", "Losar"], correctChoice: "Hornbill", sequence: ["People gather", "Dance and music begin", "Stories are shared"] },
  { category: "music", title: "Ao Folk Songs", content: "Ao folk songs remind Temjen Apa of earlier village nights.", entities: ["Ao folk songs"], image: V.music, prompt: "Which songs belong to village nights?", choices: ["Ao folk songs", "Bihu songs", "Film songs"], correctChoice: "Ao folk songs" },
  { category: "object", title: "Bamboo Basket", content: "A bamboo basket hangs near the door and is used for small errands.", entities: ["bamboo"], image: V.textiles, prompt: "What hangs near the door?", choices: ["A bamboo basket", "A gamosa", "Prayer flags"], correctChoice: "A bamboo basket" },
  { category: "stories", title: "Village Path Stories", content: "Temjen Apa tells Naro about walking the village path before sunrise.", entities: ["Naro"], image: V.forest, prompt: "Who hears the village path stories?", choices: ["Naro", "Ayan", "Karma"], correctChoice: "Naro" },
  { category: "routine", title: "Morning Path", content: "A slow walk on the village path happens before breakfast.", entities: ["path"], image: V.hills, prompt: "When is the village path walked?", choices: ["Before breakfast", "At midnight", "During a flight"], correctChoice: "Before breakfast" },
  { category: "object", title: "Family Photograph", content: "A photograph from a church gathering sits on the shelf.", entities: ["photograph"], image: V.photo, prompt: "What sits on the shelf?", choices: ["A church gathering photograph", "A kettle", "A map"], correctChoice: "A church gathering photograph" },
  { category: "place", title: "Evening Firelight", content: "Cool evenings are associated with sitting near firelight and talking slowly.", entities: ["firelight"], image: V.home, prompt: "What are cool evenings associated with?", choices: ["Firelight and slow talk", "A crowded station", "An airport"], correctChoice: "Firelight and slow talk" },
  { category: "family", title: "Sunday Together", content: "Sundays are for church, a shared meal, and sitting with Alemla.", entities: ["Alemla", "church"], image: V.family, activityTypes: ["conversation", "recall", "sequence"], sequence: ["Walk to church", "Share a meal", "Sit together at home"] },
]);

const root = path.join(process.cwd(), "data");
fs.mkdirSync(path.join(root, "patients"), { recursive: true });
fs.mkdirSync(path.join(root, "memories"), { recursive: true });

for (const p of patients) {
  fs.writeFileSync(path.join(root, "patients", `${p.id}.json`), JSON.stringify(p, null, 2));
  fs.writeFileSync(path.join(root, "memories", `${p.id}.json`), JSON.stringify(banks[p.id], null, 2));
}

fs.writeFileSync(
  path.join(root, "memories", "demo-memory-bank.json"),
  JSON.stringify(banks.patient_demo_001, null, 2)
);

console.log("Wrote", patients.length, "patients");
