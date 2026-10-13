export type Hero = {
  id: number;
  name: string;
  img: string;
  role: string[];
  lane: string[];
  spec: string[];
  wr: number;
  pr: number;
  br: number;
};

export const DATA_META = {
  patch: "2.2.16",
  season: "S42",
  snapshot: "2026-10-14",
  sourceDateStatus: "future",
  sourceUpdatedAt: "2026-10-14T01:03:52.000Z",
  fetchedAt: "2026-10-13T22:05:27.243Z",
  rank: "Mythic",
  rankLabel: "神话",
  rankId: 4,
  timeframeId: 3,
  timeframe: "近 7 日",
  source: "MLBB.io (Mythic, Past 7 days)",
} as const;

export const HEROES: Hero[] = [
  {
    "id": 109,
    "name": "Aamon",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_b3a7602fe7ffd1e54bf8ea79ceadfa72.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Magic Damage"
    ],
    "wr": 49.94,
    "pr": 0.55,
    "br": 1.26
  },
  {
    "id": 9,
    "name": "Akai",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_28f223447f0174336ff0922d364d81d3.png",
    "role": [
      "Tank"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Guard",
      "Crowd Control"
    ],
    "wr": 50.71,
    "pr": 0.36,
    "br": 1.45
  },
  {
    "id": 64,
    "name": "Aldous",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_0eb32187d08f14779585a8be53b83f01.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Burst",
      "Support"
    ],
    "wr": 50.16,
    "pr": 0.37,
    "br": 0.35
  },
  {
    "id": 4,
    "name": "Alice",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_18300163a5a912a84adb52b8d59b4618.png",
    "role": [
      "Tank",
      "Mage"
    ],
    "lane": [
      "Exp Lane",
      "Jungle"
    ],
    "spec": [
      "Charge",
      "Regen"
    ],
    "wr": 50.94,
    "pr": 0.95,
    "br": 6.87
  },
  {
    "id": 28,
    "name": "Alpha",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_86c9f91f530727db6498f920d19180d1.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Jungle",
      "Exp Lane"
    ],
    "spec": [
      "Charge",
      "Damage"
    ],
    "wr": 47.07,
    "pr": 0.94,
    "br": 0.33
  },
  {
    "id": 7,
    "name": "Alucard",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_0f51b6906e08897aa02330d65b0deeac.png",
    "role": [
      "Fighter",
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Damage"
    ],
    "wr": 47.22,
    "pr": 0.85,
    "br": 0.29
  },
  {
    "id": 55,
    "name": "Angela",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_c7e0183956b2c2fd6d3fa0b18fe46917.png",
    "role": [
      "Support"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Guard",
      "Support"
    ],
    "wr": 48.71,
    "pr": 1.83,
    "br": 9.75
  },
  {
    "id": 45,
    "name": "Argus",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_0bd96658e5b8ec578226ea1622bd7231.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Charge",
      "Burst"
    ],
    "wr": 56.12,
    "pr": 0.45,
    "br": 0.9
  },
  {
    "id": 120,
    "name": "Arlott",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_f666faa5ec6be5353f10dcd1d8997a42.png",
    "role": [
      "Fighter",
      "Assassin"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Charge",
      "Burst"
    ],
    "wr": 47.99,
    "pr": 0.44,
    "br": 0.33
  },
  {
    "id": 93,
    "name": "Atlas",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_d974ac796678180ff8724b88e192898b.png",
    "role": [
      "Tank"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Crowd Control",
      "Initiator"
    ],
    "wr": 51.65,
    "pr": 1.16,
    "br": 14.01
  },
  {
    "id": 108,
    "name": "Aulus",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_1366d775809e52ee6526b5b58d93cdff.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Jungle",
      "Exp Lane"
    ],
    "spec": [
      "Damage",
      "Charge"
    ],
    "wr": 59.93,
    "pr": 1.4,
    "br": 52.89
  },
  {
    "id": 36,
    "name": "Aurora",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_f9b2be0150361018bb98f941b9667c42.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Crowd Control",
      "Poke"
    ],
    "wr": 48.61,
    "pr": 0.48,
    "br": 0.21
  },
  {
    "id": 77,
    "name": "Badang",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_a81815e34246147b672d48209089da9c.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Roam",
      "Exp Lane"
    ],
    "spec": [
      "Charge",
      "Burst"
    ],
    "wr": 50.67,
    "pr": 1.46,
    "br": 6.76
  },
  {
    "id": 2,
    "name": "Balmond",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_df9a6990b1946d045e4d3a46c90725cf.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Damage",
      "Regen"
    ],
    "wr": 45.76,
    "pr": 0.48,
    "br": 0.23
  },
  {
    "id": 11,
    "name": "Bane",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_7e4e74bb161da0f477cc0d1819fa39e6.png",
    "role": [
      "Fighter",
      "Mage"
    ],
    "lane": [
      "Jungle",
      "Exp Lane"
    ],
    "spec": [
      "Push",
      "Burst"
    ],
    "wr": 51.32,
    "pr": 0.36,
    "br": 0.13
  },
  {
    "id": 99,
    "name": "Barats",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_6495be044c2d28106e200f6918391d54.png",
    "role": [
      "Tank",
      "Fighter"
    ],
    "lane": [
      "Exp Lane",
      "Jungle"
    ],
    "spec": [
      "Damage",
      "Crowd Control"
    ],
    "wr": 52.41,
    "pr": 0.76,
    "br": 6.35
  },
  {
    "id": 87,
    "name": "Baxia",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_80e408203869ca99302af195ac4f756c.png",
    "role": [
      "Tank"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Support",
      "Damage"
    ],
    "wr": 45.18,
    "pr": 0.05,
    "br": 0.1
  },
  {
    "id": 105,
    "name": "Beatrix",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_4687eca874feec9017b448a0b9110d65.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Damage"
    ],
    "wr": 50.85,
    "pr": 0.71,
    "br": 0.31
  },
  {
    "id": 70,
    "name": "Belerick",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_5f2a9eca0bafd4ed8dc39a93c771b3af.png",
    "role": [
      "Tank"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Crowd Control",
      "Regen"
    ],
    "wr": 51.26,
    "pr": 1.61,
    "br": 65.97
  },
  {
    "id": 97,
    "name": "Benedetta",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_b4a5e537894bdc00787e80e4d3ada5dd.png",
    "role": [
      "Assassin",
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Chase",
      "Burst"
    ],
    "wr": 52.2,
    "pr": 0.4,
    "br": 0.3
  },
  {
    "id": 100,
    "name": "Brody",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_cbb309b63cdf838fce79bd9cb95d4ed7.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Burst",
      "Finisher"
    ],
    "wr": 51.04,
    "pr": 1.11,
    "br": 2.89
  },
  {
    "id": 12,
    "name": "Bruno",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_2a733ac5b7d1f97093e82940af6f5008.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Burst"
    ],
    "wr": 53.46,
    "pr": 0.38,
    "br": 0.17
  },
  {
    "id": 92,
    "name": "Carmilla",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_6fb8f120dafdcbc1b5da2a2667016ad5.png",
    "role": [
      "Support",
      "Tank"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Crowd Control",
      "Damage"
    ],
    "wr": 53.7,
    "pr": 1.39,
    "br": 17.11
  },
  {
    "id": 91,
    "name": "Cecilion",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_045399c265021d47da6512e6de20b64f.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Poke",
      "Burst"
    ],
    "wr": 50.72,
    "pr": 0.62,
    "br": 0.1
  },
  {
    "id": 61,
    "name": "Chang'e",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_46cfe9c30e8a14f85b4d022496aca274.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Poke",
      "Burst"
    ],
    "wr": 46.94,
    "pr": 0.66,
    "br": 0.2
  },
  {
    "id": 124,
    "name": "Chip",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_79224d297f14377ad2eda8543432330d.png",
    "role": [
      "Support",
      "Tank"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Support",
      "Crowd Control"
    ],
    "wr": 46.69,
    "pr": 0.04,
    "br": 0.2
  },
  {
    "id": 26,
    "name": "Chou",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_158209b180032c4564b8f3bde8c48888.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane",
      "Roam"
    ],
    "spec": [
      "Chase",
      "Control"
    ],
    "wr": 45.15,
    "pr": 1.14,
    "br": 3.39
  },
  {
    "id": 123,
    "name": "Cici",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_60e3e11da30f404c77fff9e22d3bdc72.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Damage",
      "Regen"
    ],
    "wr": 49.46,
    "pr": 0.54,
    "br": 0.73
  },
  {
    "id": 65,
    "name": "Claude",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_e1097b9d3e1d5e9f14600d32e8b18acd.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Burst",
      "Chase"
    ],
    "wr": 49.23,
    "pr": 0.98,
    "br": 0.21
  },
  {
    "id": 13,
    "name": "Clint",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_fd120c3e9261a233442ee88a1d7c9f58.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Burst"
    ],
    "wr": 51.45,
    "pr": 0.68,
    "br": 0.64
  },
  {
    "id": 33,
    "name": "Cyclops",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_68da456f9c01b2f88d29ee320db181ed.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Damage",
      "Control"
    ],
    "wr": 51.65,
    "pr": 0.62,
    "br": 0.18
  },
  {
    "id": 48,
    "name": "Diggie",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_b1bdf46136cb8a7903dae6d58e8349cb.png",
    "role": [
      "Support"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Guard",
      "Poke"
    ],
    "wr": 53.8,
    "pr": 0.18,
    "br": 3.77
  },
  {
    "id": 85,
    "name": "Dyrroth",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_8ec13b59871b2862d773beac2d69fa3e.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane",
      "Jungle"
    ],
    "spec": [
      "Charge",
      "Burst"
    ],
    "wr": 48.17,
    "pr": 1.1,
    "br": 0.87
  },
  {
    "id": 111,
    "name": "Edith",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_daab57918de01a6d5bb2ed6f45808a7e.png",
    "role": [
      "Tank",
      "Marksman"
    ],
    "lane": [
      "Exp Lane",
      "Roam"
    ],
    "spec": [
      "Control",
      "Burst"
    ],
    "wr": 52.94,
    "pr": 0.32,
    "br": 0.23
  },
  {
    "id": 81,
    "name": "Esmeralda",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_4661a64a2c6b724e7b67032fcbface27.png",
    "role": [
      "Tank",
      "Mage"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Regen",
      "Mixed Damage"
    ],
    "wr": 47.03,
    "pr": 1.03,
    "br": 2.38
  },
  {
    "id": 34,
    "name": "Estes",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_ff4de3b0aabd1d2f6e184db1c831f6a9.png",
    "role": [
      "Support"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Regen",
      "Guard"
    ],
    "wr": 52.35,
    "pr": 0.75,
    "br": 39.66
  },
  {
    "id": 15,
    "name": "Eudora",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_87b2a655b254c136dce8976e21935a80.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Control",
      "Burst"
    ],
    "wr": 51.48,
    "pr": 1.85,
    "br": 65.46
  },
  {
    "id": 17,
    "name": "Fanny",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_3391df36d6dcc54dd1c417098e15ec59.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Finisher"
    ],
    "wr": 40.9,
    "pr": 0.89,
    "br": 1.71
  },
  {
    "id": 76,
    "name": "Faramis",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_04e575d648d7f7ac1174f4369595c3a2.png",
    "role": [
      "Support",
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Guard",
      "Charge"
    ],
    "wr": 51.38,
    "pr": 0.09,
    "br": 0.38
  },
  {
    "id": 112,
    "name": "Floryn",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_5a57b91e4914cf071a3849e352e530a5.png",
    "role": [
      "Support"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Poke",
      "Guard"
    ],
    "wr": 54.15,
    "pr": 1.02,
    "br": 15.64
  },
  {
    "id": 10,
    "name": "Franco",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_9bed3c0095335606e0ce616c6e5a8553.png",
    "role": [
      "Tank"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Initiator",
      "Control"
    ],
    "wr": 40.96,
    "pr": 0.89,
    "br": 2.98
  },
  {
    "id": 117,
    "name": "Fredrinn",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_dea170bfd5f26c41fb04e5edf72afedb.png",
    "role": [
      "Fighter",
      "Tank"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Damage",
      "Chase"
    ],
    "wr": 51.1,
    "pr": 0.48,
    "br": 1.64
  },
  {
    "id": 22,
    "name": "Freya",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_b9c34c88762ca8e66ccd4d84071bf0bc.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane",
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Damage"
    ],
    "wr": 47.85,
    "pr": 0.58,
    "br": 1.06
  },
  {
    "id": 41,
    "name": "Gatotkaca",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_96f9dbbc096e0f0a28f9b9e587d06a9c.png",
    "role": [
      "Tank",
      "Fighter"
    ],
    "lane": [
      "Roam",
      "Exp Lane"
    ],
    "spec": [
      "Crowd Control",
      "Burst"
    ],
    "wr": 43.76,
    "pr": 0.44,
    "br": 0.17
  },
  {
    "id": 104,
    "name": "Gloo",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_c472fe0233e5ef84a3ac9ba4a229d09f.png",
    "role": [
      "Tank"
    ],
    "lane": [
      "Roam",
      "Exp Lane"
    ],
    "spec": [
      "Regen",
      "Control"
    ],
    "wr": 54.37,
    "pr": 0.78,
    "br": 48.93
  },
  {
    "id": 23,
    "name": "Gord",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_9513f5e10ec33f76747732eaf2082259.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Poke",
      "Burst"
    ],
    "wr": 53.41,
    "pr": 0.55,
    "br": 0.3
  },
  {
    "id": 79,
    "name": "Granger",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_a7729262d5b4abdc34ae5181e964c235.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Burst",
      "Finisher"
    ],
    "wr": 42.21,
    "pr": 1.41,
    "br": 0.93
  },
  {
    "id": 44,
    "name": "Grock",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_f8b8c8964d3202b7b762947ac96f1ed3.png",
    "role": [
      "Tank",
      "Fighter"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Crowd Control",
      "Initiator"
    ],
    "wr": 46.38,
    "pr": 0.37,
    "br": 0.77
  },
  {
    "id": 80,
    "name": "Guinevere",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_901bdd5d4432a2c0290dfc71df615a5a.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Burst",
      "Magic Damage"
    ],
    "wr": 51.41,
    "pr": 0.93,
    "br": 2.61
  },
  {
    "id": 56,
    "name": "Gusion",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_c6cd232de60da5372a7101a203e56554.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Burst",
      "Magic Damage"
    ],
    "wr": 47.9,
    "pr": 1.43,
    "br": 3.28
  },
  {
    "id": 60,
    "name": "Hanabi",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_8a9c1966feb34e85d7bdcc1ed01ffb5d.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Damage"
    ],
    "wr": 51.07,
    "pr": 2.1,
    "br": 4.17
  },
  {
    "id": 69,
    "name": "Hanzo",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_d2d28d2fcb060726fa27553920ca1a33.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Poke",
      "Burst"
    ],
    "wr": 49.82,
    "pr": 0.41,
    "br": 16.05
  },
  {
    "id": 73,
    "name": "Harith",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_d228a823b477fdf6c458c829c2e62bcf.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Chase",
      "Damage"
    ],
    "wr": 45.55,
    "pr": 0.17,
    "br": 0.05
  },
  {
    "id": 42,
    "name": "Harley",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_3aa6964c07a70f9b125da447f320e1ac.png",
    "role": [
      "Assassin",
      "Mage"
    ],
    "lane": [
      "Jungle",
      "Mid Lane"
    ],
    "spec": [
      "Burst",
      "Poke"
    ],
    "wr": 47.76,
    "pr": 0.67,
    "br": 1.95
  },
  {
    "id": 21,
    "name": "Hayabusa",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_9cc074562291a02644a0ddae28eeaa42.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Burst"
    ],
    "wr": 48.44,
    "pr": 1.15,
    "br": 1.58
  },
  {
    "id": 51,
    "name": "Helcurt",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_6abf0c552b59b8ca4cbc1af3662ef176.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle",
      "Roam"
    ],
    "spec": [
      "Push",
      "Burst"
    ],
    "wr": 46.53,
    "pr": 0.45,
    "br": 4.6
  },
  {
    "id": 35,
    "name": "Hilda",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_acd700708dc515f5c63a08f8835a9941.png",
    "role": [
      "Fighter",
      "Tank"
    ],
    "lane": [
      "Roam",
      "Exp Lane"
    ],
    "spec": [
      "Damage",
      "Regen"
    ],
    "wr": 48.93,
    "pr": 0.52,
    "br": 4.22
  },
  {
    "id": 133,
    "name": "Hirara",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_71224844b111f09367df00e4f9b97753.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Finisher"
    ],
    "wr": 53.32,
    "pr": 0.64,
    "br": 85.1
  },
  {
    "id": 49,
    "name": "Hylos",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_195ad9af866afaab415ae23a6be13b45.png",
    "role": [
      "Tank"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Guard",
      "Initiator"
    ],
    "wr": 48.31,
    "pr": 0.34,
    "br": 0.21
  },
  {
    "id": 43,
    "name": "Irithel",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_a65d1e2ced64fbfdfcefdcfba719b3fd.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Burst"
    ],
    "wr": 53.26,
    "pr": 0.42,
    "br": 0.18
  },
  {
    "id": 121,
    "name": "Ixia",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_f070d82521ecd2e14d4ef3f25880830a.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Damage"
    ],
    "wr": 49.8,
    "pr": 0.69,
    "br": 0.55
  },
  {
    "id": 54,
    "name": "Jawhead",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_bd87c30b6c7de6ae3b5aa56162c48c8b.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane",
      "Roam"
    ],
    "spec": [
      "Charge",
      "Burst"
    ],
    "wr": 47.65,
    "pr": 0.26,
    "br": 0.19
  },
  {
    "id": 32,
    "name": "Johnson",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_85ff988c6660b4d04f8dd3d40df988bb.png",
    "role": [
      "Tank",
      "Support"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Support",
      "Crowd Control"
    ],
    "wr": 46.63,
    "pr": 0.69,
    "br": 1.26
  },
  {
    "id": 118,
    "name": "Joy",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_d3a3a55c22000ae78732fed8cba2efef.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Damage"
    ],
    "wr": 48.91,
    "pr": 0.15,
    "br": 0.21
  },
  {
    "id": 116,
    "name": "Julian",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_5511ddc0ad2789b525f32ef572b017eb.png",
    "role": [
      "Assassin",
      "Fighter"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Magic Damage"
    ],
    "wr": 50.14,
    "pr": 0.63,
    "br": 0.57
  },
  {
    "id": 75,
    "name": "Kadita",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_99c0a77d0e01b06ad3f4351f8ef2869c.png",
    "role": [
      "Mage",
      "Assassin"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Burst",
      "Charge"
    ],
    "wr": 51.51,
    "pr": 0.88,
    "br": 4.03
  },
  {
    "id": 25,
    "name": "Kagura",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_da424b020b8ac8235d64a1b8a09aa749.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Poke",
      "Finisher"
    ],
    "wr": 52.13,
    "pr": 0.75,
    "br": 1.15
  },
  {
    "id": 62,
    "name": "Kaja",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_d558bb881e18a070eaeda1e1fdc248a8.png",
    "role": [
      "Support"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Initiator",
      "Charge"
    ],
    "wr": 50.05,
    "pr": 0.63,
    "br": 23.64
  },
  {
    "id": 128,
    "name": "Kalea",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_4f3d4649e301c76daf20bd8811f3095c.png",
    "role": [
      "Support",
      "Fighter"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Control",
      "Regen"
    ],
    "wr": 45.04,
    "pr": 0.17,
    "br": 0.36
  },
  {
    "id": 8,
    "name": "Karina",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_f49394186dc0e55d545da8377be83280.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Finisher",
      "Magic Damage"
    ],
    "wr": 47.23,
    "pr": 0.85,
    "br": 3.06
  },
  {
    "id": 40,
    "name": "Karrie",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_294576f2bd0dcbcc9041031969d0eb09.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Damage"
    ],
    "wr": 49.15,
    "pr": 0.62,
    "br": 0.98
  },
  {
    "id": 98,
    "name": "Khaleed",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_540a6a9d343842674ce002082366ec9d.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Roam",
      "Exp Lane"
    ],
    "spec": [
      "Damage",
      "Regen"
    ],
    "wr": 50.97,
    "pr": 0.13,
    "br": 0.08
  },
  {
    "id": 78,
    "name": "Khufra",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_2fe99f4001211d18b3d2b95d0d3dc395.png",
    "role": [
      "Tank"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Initiator",
      "Crowd Control"
    ],
    "wr": 54.7,
    "pr": 0.33,
    "br": 1.35
  },
  {
    "id": 71,
    "name": "Kimmy",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_61295dfefd369004e5e4a7f4fc86647b.png",
    "role": [
      "Marksman",
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Damage",
      "Magic Damage"
    ],
    "wr": 48.97,
    "pr": 0.87,
    "br": 0.49
  },
  {
    "id": 47,
    "name": "Lancelot",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_dc4b821e49b904715172136017798da3.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Burst"
    ],
    "wr": 42.37,
    "pr": 0.62,
    "br": 0.24
  },
  {
    "id": 37,
    "name": "Lapu-Lapu",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_28036c4584c914c5aad4d2feeafb2452.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Chase",
      "Burst"
    ],
    "wr": 48.39,
    "pr": 0.39,
    "br": 0.19
  },
  {
    "id": 18,
    "name": "Layla",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_b2b38e9406ea0de0b866db7674feea0f.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Damage"
    ],
    "wr": 48.5,
    "pr": 1.24,
    "br": 0.77
  },
  {
    "id": 67,
    "name": "Leomord",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_554cdf13a7587fe08c5deed60132c61c.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Burst"
    ],
    "wr": 50.66,
    "pr": 0.35,
    "br": 0.37
  },
  {
    "id": 53,
    "name": "Lesley",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_08770893183018333f54a98e63c41ee3.png",
    "role": [
      "Marksman",
      "Assassin"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Burst"
    ],
    "wr": 48.41,
    "pr": 1.82,
    "br": 6.85
  },
  {
    "id": 84,
    "name": "Ling",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_017bade52b9fc94bbc12615de6d75c08.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Burst"
    ],
    "wr": 52.54,
    "pr": 0.81,
    "br": 0.91
  },
  {
    "id": 20,
    "name": "Lolita",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_474cea36a4bfdc7bf7d94530853a99b2.png",
    "role": [
      "Support",
      "Tank"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Guard",
      "Crowd Control"
    ],
    "wr": 54.25,
    "pr": 0.08,
    "br": 0.17
  },
  {
    "id": 127,
    "name": "Lukas",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_63040edd0cf15b815fcbbb8b2d08d7f7.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane",
      "Jungle"
    ],
    "spec": [
      "Regen",
      "Damage"
    ],
    "wr": 52.8,
    "pr": 1.12,
    "br": 50.2
  },
  {
    "id": 68,
    "name": "Lunox",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_e162688afdcaf3f6498af30badfe31c5.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Burst",
      "Damage"
    ],
    "wr": 48.81,
    "pr": 0.32,
    "br": 0.14
  },
  {
    "id": 96,
    "name": "Luo Yi",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_26e03fd72532d11c7b32911b95b8d559.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Support",
      "Crowd Control"
    ],
    "wr": 47.97,
    "pr": 0.18,
    "br": 0.07
  },
  {
    "id": 86,
    "name": "Lylia",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_706573f138055c3df3df94948b4f26bd.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Push",
      "Damage"
    ],
    "wr": 49.21,
    "pr": 0.48,
    "br": 0.29
  },
  {
    "id": 132,
    "name": "Marcel",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_df7603c292198bf4aa7b551d401ea5c1.png",
    "role": [
      "Support"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Crowd Control",
      "Support"
    ],
    "wr": 58.32,
    "pr": 0.32,
    "br": 41.54
  },
  {
    "id": 58,
    "name": "Martis",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_cc8124b0eb6ca22d950b000744d69fbf.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Jungle",
      "Exp Lane"
    ],
    "spec": [
      "Finisher",
      "Charge"
    ],
    "wr": 47.81,
    "pr": 0.51,
    "br": 0.27
  },
  {
    "id": 88,
    "name": "Masha",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_4d79ba6ebb0a0f2bf542917f0b19d056.png",
    "role": [
      "Fighter",
      "Tank"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Push",
      "Damage"
    ],
    "wr": 60.13,
    "pr": 0.67,
    "br": 41.46
  },
  {
    "id": 102,
    "name": "Mathilda",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_24d08ed788a9f5984bcf3b732ddcaf04.png",
    "role": [
      "Support",
      "Assassin"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Initiator",
      "Guard"
    ],
    "wr": 45.08,
    "pr": 0.16,
    "br": 0.26
  },
  {
    "id": 114,
    "name": "Melissa",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_1fa7436301fea3f13fbcd4772051d22d.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Damage"
    ],
    "wr": 48.34,
    "pr": 0.33,
    "br": 1.2
  },
  {
    "id": 19,
    "name": "Minotaur",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_3ecd2c0843df7ec85044dafff6bf4553.png",
    "role": [
      "Tank",
      "Support"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Crowd Control"
    ],
    "wr": 55.4,
    "pr": 1.19,
    "br": 7.86
  },
  {
    "id": 74,
    "name": "Minsitthar",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_c5d24a1dad6cef21de2698a4ed1d80ce.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane",
      "Roam"
    ],
    "spec": [
      "Initiator",
      "Crowd Control"
    ],
    "wr": 51.3,
    "pr": 0.59,
    "br": 5.91
  },
  {
    "id": 1,
    "name": "Miya",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_da894b37bfb5cadb32307f371f31918a.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Damage"
    ],
    "wr": 50.03,
    "pr": 2.14,
    "br": 6.3
  },
  {
    "id": 31,
    "name": "Moskov",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_a60a866ab6752a7f66766e720da987ea.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Chase"
    ],
    "wr": 50.71,
    "pr": 1.24,
    "br": 0.25
  },
  {
    "id": 5,
    "name": "Nana",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_ee1e0d80d87bb614a0c552ef028f85ce.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Poke",
      "Burst"
    ],
    "wr": 46.05,
    "pr": 1.71,
    "br": 2.32
  },
  {
    "id": 24,
    "name": "Natalia",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_fbb5065b6ff174d1a20ccf5b7f523514.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle",
      "Roam"
    ],
    "spec": [
      "Chase",
      "Finisher"
    ],
    "wr": 50.61,
    "pr": 0.21,
    "br": 1.13
  },
  {
    "id": 107,
    "name": "Natan",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_da02742f59013365923b216420bc4082.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Burst",
      "Magic Damage"
    ],
    "wr": 51.71,
    "pr": 0.28,
    "br": 0.12
  },
  {
    "id": 122,
    "name": "Nolan",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_9012ee9f73fbb4db4e1953e5fb5172e1.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Burst"
    ],
    "wr": 48.86,
    "pr": 1.5,
    "br": 5.88
  },
  {
    "id": 119,
    "name": "Novaria",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_57eeea6d5bd8d21229de8df79751db9f.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Burst",
      "Poke"
    ],
    "wr": 49.85,
    "pr": 1.48,
    "br": 4.33
  },
  {
    "id": 130,
    "name": "Obsidia",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_9c3daef5625bfade5c4cb8a219845dd3.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Damage"
    ],
    "wr": 54.02,
    "pr": 2.52,
    "br": 23.25
  },
  {
    "id": 46,
    "name": "Odette",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_d9251718a8894546ba04cfa9ca68dedc.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Burst",
      "Poke"
    ],
    "wr": 49.91,
    "pr": 0.54,
    "br": 0.23
  },
  {
    "id": 103,
    "name": "Paquito",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_5ab87805b9107b126a3bab64a8a199ad.png",
    "role": [
      "Fighter",
      "Assassin"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Chase",
      "Damage"
    ],
    "wr": 50.87,
    "pr": 1.64,
    "br": 46.83
  },
  {
    "id": 52,
    "name": "Pharsa",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_10151d43910e62f7aa9ce08df481a20f.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Burst",
      "Poke"
    ],
    "wr": 47.06,
    "pr": 0.33,
    "br": 0.1
  },
  {
    "id": 106,
    "name": "Phoveus",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_af21c0dd8b5308c27974bff900803a9a.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Regen",
      "Damage"
    ],
    "wr": 48.4,
    "pr": 0.29,
    "br": 0.4
  },
  {
    "id": 94,
    "name": "Popol and Kupa",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_1acbb23b9a50f412104047a60eb18808.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Jungle",
      "Gold Lane"
    ],
    "spec": [
      "Push",
      "Burst"
    ],
    "wr": 54.25,
    "pr": 0.38,
    "br": 0.24
  },
  {
    "id": 14,
    "name": "Rafaela",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_68277dce415742c4a98883151c693a07.png",
    "role": [
      "Support"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Regen",
      "Guard"
    ],
    "wr": 59.47,
    "pr": 1.34,
    "br": 23.45
  },
  {
    "id": 39,
    "name": "Roger",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_b40e578f13465b3ae99d0a9baac7ecc9.png",
    "role": [
      "Fighter",
      "Marksman"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Finisher",
      "Burst"
    ],
    "wr": 48.51,
    "pr": 0.31,
    "br": 0.08
  },
  {
    "id": 29,
    "name": "Ruby",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_4b96c75b136290576d849309722d4d20.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Crowd Control",
      "Regen"
    ],
    "wr": 49.83,
    "pr": 0.36,
    "br": 0.18
  },
  {
    "id": 3,
    "name": "Saber",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_6bbfac806f29d29f17fea9e98d2d2fee.png",
    "role": [
      "Assassin"
    ],
    "lane": [
      "Jungle",
      "Roam"
    ],
    "spec": [
      "Charge",
      "Finisher"
    ],
    "wr": 50.36,
    "pr": 0.76,
    "br": 18.44
  },
  {
    "id": 63,
    "name": "Selena",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_c3f967121519ae40509c5b2fdf52b19d.png",
    "role": [
      "Assassin",
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Initiator",
      "Finisher"
    ],
    "wr": 49.12,
    "pr": 1.92,
    "br": 4.98
  },
  {
    "id": 90,
    "name": "Silvanna",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_5e7b297af7c6e32a420b897aa4998071.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Initiator",
      "Magic Damage"
    ],
    "wr": 50.21,
    "pr": 0.78,
    "br": 1.14
  },
  {
    "id": 131,
    "name": "Sora",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_8143d7bbd4318d7c699908e808de885e.png",
    "role": [
      "Fighter",
      "Assassin"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Charge",
      "Burst"
    ],
    "wr": 49.69,
    "pr": 0.64,
    "br": 3.01
  },
  {
    "id": 27,
    "name": "Sun",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_117b5cdcc13232157075ce7b7f6177e9.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane",
      "Jungle"
    ],
    "spec": [
      "Push",
      "Damage"
    ],
    "wr": 51.14,
    "pr": 1.62,
    "br": 21.92
  },
  {
    "id": 126,
    "name": "Suyou",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_5e4ca70172332dde18bb1dc158ccc5c8.png",
    "role": [
      "Assassin",
      "Fighter"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Chase",
      "Burst"
    ],
    "wr": 49.59,
    "pr": 0.81,
    "br": 1.06
  },
  {
    "id": 82,
    "name": "Terizla",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_c4bb270c28c7be663f57e993b0d6d3d8.png",
    "role": [
      "Fighter",
      "Tank"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Burst",
      "Crowd Control"
    ],
    "wr": 50.75,
    "pr": 0.34,
    "br": 0.12
  },
  {
    "id": 72,
    "name": "Thamuz",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_b5ad55e408b68acf6a86e7ff76f5f569.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Chase",
      "Damage"
    ],
    "wr": 48.53,
    "pr": 0.6,
    "br": 0.75
  },
  {
    "id": 6,
    "name": "Tigreal",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_8b30576754be1a4f8bebd09df8d6bec7.png",
    "role": [
      "Tank"
    ],
    "lane": [
      "Roam"
    ],
    "spec": [
      "Crowd Control"
    ],
    "wr": 43.09,
    "pr": 2.06,
    "br": 5.95
  },
  {
    "id": 59,
    "name": "Uranus",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_2e15a0a506aaecd9b3de40a8cc9f7ec7.png",
    "role": [
      "Tank"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Regen"
    ],
    "wr": 48.82,
    "pr": 0.38,
    "br": 0.28
  },
  {
    "id": 66,
    "name": "Vale",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_2a7a8d1531a1c4f8524880413535348d.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Burst",
      "Crowd Control"
    ],
    "wr": 49.34,
    "pr": 0.43,
    "br": 0.1
  },
  {
    "id": 110,
    "name": "Valentina",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_24837021ec9d7aaf41b13fa55b6d13c9.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Burst",
      "Finisher"
    ],
    "wr": 45.29,
    "pr": 0.2,
    "br": 0.2
  },
  {
    "id": 57,
    "name": "Valir",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_bf16690876761b80822df90eb3320d69.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Damage",
      "Guard"
    ],
    "wr": 53.93,
    "pr": 1.02,
    "br": 2.03
  },
  {
    "id": 38,
    "name": "Vexana",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_743edd1702084c4ed247908d698bca77.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Poke",
      "Control"
    ],
    "wr": 49.21,
    "pr": 1.31,
    "br": 0.75
  },
  {
    "id": 89,
    "name": "Wanwan",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_44bfa1dc44deb8d7620605faaa9ffae7.png",
    "role": [
      "Marksman"
    ],
    "lane": [
      "Gold Lane"
    ],
    "spec": [
      "Finisher",
      "Burst"
    ],
    "wr": 48.55,
    "pr": 0.14,
    "br": 0.09
  },
  {
    "id": 83,
    "name": "X.Borg",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_efe9c7ed8d8f84f1bb0f88a3e08de5fc.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Regen",
      "Burst"
    ],
    "wr": 49.7,
    "pr": 0.62,
    "br": 1.33
  },
  {
    "id": 115,
    "name": "Xavier",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_df0a8dfc494f85ed9bbc4512cc1e5d3c.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Damage",
      "Burst"
    ],
    "wr": 50.49,
    "pr": 0.52,
    "br": 0.1
  },
  {
    "id": 30,
    "name": "Yi Sun-shin",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_961378be3f498d42c25b3defd1635ad1.png",
    "role": [
      "Assassin",
      "Marksman"
    ],
    "lane": [
      "Jungle"
    ],
    "spec": [
      "Finisher",
      "Chase"
    ],
    "wr": 49.42,
    "pr": 1.37,
    "br": 6.64
  },
  {
    "id": 113,
    "name": "Yin",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_ee1c12c84f49514a30e405fb5c617796.png",
    "role": [
      "Fighter",
      "Assassin"
    ],
    "lane": [
      "Jungle",
      "Exp Lane"
    ],
    "spec": [
      "Burst",
      "Control"
    ],
    "wr": 48.78,
    "pr": 0.31,
    "br": 0.71
  },
  {
    "id": 95,
    "name": "Yu Zhong",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_9823ce4fe5eb89c0082b24f6d5ea67f6.png",
    "role": [
      "Fighter"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Regen",
      "Damage"
    ],
    "wr": 49.22,
    "pr": 0.62,
    "br": 0.47
  },
  {
    "id": 101,
    "name": "Yve",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_d9b0a1d92b1c4b3643d6332fd66aa8e6.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Poke",
      "Burst"
    ],
    "wr": 51.56,
    "pr": 0.05,
    "br": 0.04
  },
  {
    "id": 129,
    "name": "Zetian",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_8d965f05f84621a51f799aeb8fb5f4c4.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Damage",
      "Crowd Control"
    ],
    "wr": 50.93,
    "pr": 1.83,
    "br": 4.34
  },
  {
    "id": 50,
    "name": "Zhask",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_d8f170087cb2d5b71bb22a0a4664a927.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Chase",
      "Damage"
    ],
    "wr": 52.41,
    "pr": 0.3,
    "br": 0.21
  },
  {
    "id": 125,
    "name": "Zhuxin",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_595f85bc90df3889c711c6b1f02dc02d.png",
    "role": [
      "Mage"
    ],
    "lane": [
      "Mid Lane"
    ],
    "spec": [
      "Damage",
      "Crowd Control"
    ],
    "wr": 49.67,
    "pr": 0.16,
    "br": 0.31
  },
  {
    "id": 16,
    "name": "Zilong",
    "img": "https://akmweb.youngjoygame.com/web/svnres/img/test/homepage_2_2_16_1232_1/100_9db57da4f0daef6d432676e4f19101ed.png",
    "role": [
      "Fighter",
      "Assassin"
    ],
    "lane": [
      "Exp Lane"
    ],
    "spec": [
      "Chase",
      "Damage"
    ],
    "wr": 44.71,
    "pr": 0.38,
    "br": 0.28
  }
];
