import { tokens } from "../theme";

// Repairs Quantity Bars
export const mockBarData = [
  {
    weekday: "Mon",
    "Laptop": 137,
    "LaptopColor": "hsl(229, 70%, 50%)",
    PC: 96,
    PCColor: "hsl(296, 70%, 50%)",
    Telefonas: 72,
    TelefonasColor: "hsl(97, 70%, 50%)",
    Spausdintuvas: 140,
    SpausdintuvasColor: "hsl(340, 70%, 50%)",
  },
  {
    weekday: "Tue",
    "Laptop": 55,
    "LaptopColor": "hsl(307, 70%, 50%)",
    PC: 28,
    PCColor: "hsl(111, 70%, 50%)",
    Telefonas: 58,
    TelefonasColor: "hsl(273, 70%, 50%)",
    Spausdintuvas: 29,
    SpausdintuvasColor: "hsl(275, 70%, 50%)",
  },
  {
    weekday: "Wen",
    "Laptop": 109,
    "LaptopColor": "hsl(72, 70%, 50%)",
    PC: 23,
    PCColor: "hsl(96, 70%, 50%)",
    Telefonas: 34,
    TelefonasColor: "hsl(106, 70%, 50%)",
    Spausdintuvas: 152,
    SpausdintuvasColor: "hsl(256, 70%, 50%)",
  },
  {
    weekday: "Th",
    "Laptop": 133,
    "LaptopColor": "hsl(257, 70%, 50%)",
    PC: 52,
    PCColor: "hsl(326, 70%, 50%)",
    Telefonas: 43,
    TelefonasColor: "hsl(110, 70%, 50%)",
    Spausdintuvas: 83,
    SpausdintuvasColor: "hsl(9, 70%, 50%)",
  },
  {
    weekday: "Fr",
    "Laptop": 81,
    "LaptopColor": "hsl(190, 70%, 50%)",
    PC: 80,
    PCColor: "hsl(325, 70%, 50%)",
    Telefonas: 112,
    TelefonasColor: "hsl(54, 70%, 50%)",
    Spausdintuvas: 35,
    SpausdintuvasColor: "hsl(285, 70%, 50%)",
  },
  {
    weekday: "St",
    "Laptop": 66,
    "LaptopColor": "hsl(208, 70%, 50%)",
    PC: 111,
    PCColor: "hsl(334, 70%, 50%)",
    Telefonas: 167,
    TelefonasColor: "hsl(182, 70%, 50%)",
    Spausdintuvas: 18,
    SpausdintuvasColor: "hsl(76, 70%, 50%)",
  },
  {
    weekday: "Sun",
    "Laptop": 80,
    "LaptopColor": "hsl(87, 70%, 50%)",
    PC: 47,
    PCColor: "hsl(141, 70%, 50%)",
    Telefonas: 158,
    TelefonasColor: "hsl(224, 70%, 50%)",
    Spausdintuvas: 49,
    SpausdintuvasColor: "hsl(274, 70%, 50%)",
  },
];
// Reason To Remember The Name Pie
export const mockPieData = [
  {
    id: "Luck",
    label: "Luck",
    value: 10,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "Skill",
    label: "Skill",
    value: 20,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "Pleasure",
    label: "Pleasure",
    value: 5,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "Pain",
    label: "Pain",
    value: 50,
    color: "hsl(344, 70%, 50%)",
  },
  {
    id: "Concentrated power of will",
    label: "Concentrated power of will",
    value: 15,
    color: "hsl(291, 70%, 50%)",
  },
];
// Nice Line 
export const mockLineData = [
  {
    id: "japan",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "plane",
        y: 101,
      },
      {
        x: "helicopter",
        y: 75,
      },
      {
        x: "boat",
        y: 36,
      },
      {
        x: "train",
        y: 216,
      },
      {
        x: "subway",
        y: 35,
      },
      {
        x: "bus",
        y: 236,
      },
      {
        x: "car",
        y: 88,
      },
      {
        x: "moto",
        y: 232,
      },
      {
        x: "bicycle",
        y: 281,
      },
      {
        x: "horse",
        y: 1,
      },
      {
        x: "skateboard",
        y: 35,
      },
      {
        x: "others",
        y: 14,
      },
    ],
  },
  {
    id: "france",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "plane",
        y: 212,
      },
      {
        x: "helicopter",
        y: 190,
      },
      {
        x: "boat",
        y: 270,
      },
      {
        x: "train",
        y: 9,
      },
      {
        x: "subway",
        y: 75,
      },
      {
        x: "bus",
        y: 175,
      },
      {
        x: "car",
        y: 33,
      },
      {
        x: "moto",
        y: 189,
      },
      {
        x: "bicycle",
        y: 97,
      },
      {
        x: "horse",
        y: 87,
      },
      {
        x: "skateboard",
        y: 299,
      },
      {
        x: "others",
        y: 251,
      },
    ],
  },
  {
    id: "us",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "plane",
        y: 191,
      },
      {
        x: "helicopter",
        y: 136,
      },
      {
        x: "boat",
        y: 91,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 211,
      },
      {
        x: "bus",
        y: 152,
      },
      {
        x: "car",
        y: 189,
      },
      {
        x: "moto",
        y: 152,
      },
      {
        x: "bicycle",
        y: 8,
      },
      {
        x: "horse",
        y: 197,
      },
      {
        x: "skateboard",
        y: 107,
      },
      {
        x: "others",
        y: 170,
      },
    ],
  },
];

