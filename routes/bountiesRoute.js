const express = require("express");
const bountiesRoute = express.Router();
const bounties = require("../model/bounty.js");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const morgan = require("morgan");
const bounty = require("../model/bounty.js");

// const bountiesArr = [
//   {
//     id: 1,
//     name: "Jupiter's Bandit",
//     location: "Jupiter",
//     bountyAmount: 45000,
//     jediSith: false,
//     living: false,
//     image: "https://i.redd.it/6iqos4yf2i351.jpg",
//     skills: ["Space Piracy", "Gas Giant Navigation"],
//     weapon: "Jupiter's Fury",
//     active: false,
//     huntersNotes: "Beware of the Bandit's electromagnetic disruptor; it can disable your ship's systems temporarily."
//   },
//   {
//     id: 2,
//     name: "Plutonian Outlaw",
//     location: "Pluto",
//     bountyAmount: 40000,
//     jediSith: false,
//     living: true,
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyjiClUb9Do3ea1ZfPUjtvTNuTnS0IlK4Iw&usqp=CAU",
//     skills: ["Smuggling", "Extreme Cold Adaptation"],
//     weapon: "Pluto's Shadow",
//     active: false,
//     huntersNotes: "The Outlaw is known to lay traps in the frozen terrains of Pluto. Stay cautious while pursuing."
//   },
//   {
//     id: 3,
//     name: "Mercurian Marauder",
//     location: "Mercury",
//     bountyAmount: 33000,
//     jediSith: false,
//     living: true,
//     image: "https://static.wikia.nocookie.net/d159b31f-b9d0-46f2-b488-c277ff8b822b/scale-to-width/755",
//     skills: ["Mercury Surface Raiding", "Solar Radiation Resistance"],
//     weapon: "Mercury's Fury",
//     active: false,
//     huntersNotes: "The Marauder is highly agile on the sunlit surface of Mercury. Watch out for surprise attacks."
//   },
//   {
//     id: 4,
//     name: "Ganymede Guardian",
//     location: "Jupiter's Moon - Ganymede",
//     bountyAmount: 36000,
//     jediSith: false,
//     living: true,
//     image: "https://i.pinimg.com/564x/45/e3/f6/45e3f6562b7d164c2a8112c075b50d9e.jpg",
//     skills: ["Guardianship", "Celestial Shielding"],
//     weapon: "Ganymede's Sentinel",
//     active: false,
//     huntersNotes: "The Guardian's shield is impervious to most conventional weapons. Find a way to disable it before engaging."
//   },
//   {
//     id: 5,
//     name: "Solar Swindler",
//     location: "Sun",
//     bountyAmount: 45000,
//     jediSith: false,
//     living: true,
//     image: "https://ih1.redbubble.net/image.4306115082.2728/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
//     skills: ["Solar Con Artistry", "Thermal Manipulation"],
//     weapon: "Star Scammer",
//     active: false,
//     huntersNotes: "The Swindler can manipulate solar energy to create blinding flashes. Use visual filters to counter it."
//   },
//   {
//     id: 6,
//     name: "Europa's Enforcer",
//     location: "Jupiter's Moon - Europa",
//     bountyAmount: 32000,
//     jediSith: false,
//     living: true,
//     image: "https://s3.eu-central-1.wasabisys.com/open3dlab-thumbs/item_thumb_next/24985/Enforcer_Small_HodDypq.detail.webp",
//     skills: ["Enforcement", "Subsurface Combat"],
//     weapon: "Europa's Justice",
//     active: false,
//     huntersNotes: "The Enforcer is most vulnerable in Europa's subsurface caverns. Exploit the environment for an advantage."
//   },
//   {
//     id: 7,
//     name: "Astro Ace",
//     location: "Interstellar",
//     bountyAmount: 43000,
//     jediSith: false,
//     living: true,
//     image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8cb20a65587017.5af9cbdb23420.jpg",
//     skills: ["Interstellar Piloting", "Space Dogfights"],
//     weapon: "Astro Ace",
//     active: false,
//     huntersNotes: "The Ace is an exceptional pilot. Engage in close-quarters combat to minimize their maneuverability advantage."
//   },
//   {
//     id: 8,
//     name: "Meteoric Marauder",
//     location: "Interstellar",
//     bountyAmount: 48000,
//     jediSith: false,
//     living: true,
//     image: "https://i2-prod.dailystar.co.uk/incoming/article26692222.ece/ALTERNATES/s615b/0_Extraterrestrial-Life.jpg",
//     skills: ["Covert Operations", "Meteor Riding"],
//     weapon: "Stellar Dagger",
//     active: false,
//     huntersNotes: "The Marauder uses meteor showers as cover to evade pursuit. Anticipate their movements to corner them."
//   },
//   {
//     id: 9,
//     name: "Comet Corsair",
//     location: "Interstellar",
//     bountyAmount: 46000,
//     jediSith: false,
//     living: true,
//     image: "https://lumiere-a.akamaihd.net/v1/images/sebulba_1f3fe180.jpeg?region=240%2C0%2C1376%2C1380",
//     skills: ["Comet Manipulation", "Celestial Maneuvering"],
//     weapon: "Comet Crusher",
//     active: false,
//     huntersNotes: "The Corsair harnesses the power of comets to unleash devastating attacks. Keep a safe distance to avoid collateral damage."
//   },
//   {
//     id: 10,
//     name: "Martian Marauder",
//     location: "Mars",
//     bountyAmount: 39000,
//     jediSith: false,
//     living: true,
//     image: "https://pbs.twimg.com/media/Fqa-ONBakAA8Kfq?format=jpg&name=large",
//     skills: ["Martian Survival", "Red Planet Raiding"],
//     weapon: "Martian Mauler",
//     active: false,
//     huntersNotes: "The Marauder is a master of guerrilla tactics on Mars. Stay vigilant in the planet's vast terrain."
//   },
//   {
//     id: 11,
//     name: "Lunar Larcenist",
//     location: "Moon",
//     bountyAmount: 37000,
//     jediSith: false,
//     living: true,
//     image: "https://www.zbrushcentral.com/uploads/default/original/3X/c/9/c97db13ecf5ed9ffc5f72f27b5e9f9b2bec61210.jpeg",
//     skills: ["Moonlight Stealth", "Lunar Vault Breaker"],
//     weapon: "Moonshadow Blade",
//     active: false,
//     huntersNotes: "The Larcenist excels in moonlit environments. Employ advanced sensors to counter their stealth abilities."
//   },
//   {
//     id: 12,
//     name: "Saturnian Saboteur",
//     location: "Saturn",
//     bountyAmount: 42000,
//     jediSith: false,
//     living: true,
//     image: "https://c4.wallpaperflare.com/wallpaper/640/149/229/starcraft-zerg-starcraft-hd-wallpaper-preview.jpg",
//     skills: ["Sabotage", "Ring Navigation"],
//     weapon: "Saturn's Wrath",
//     active: false,
//     huntersNotes: "The Saboteur specializes in sabotaging space stations near Saturn's rings. Safeguard your equipment during encounters."
//   },
//   {
//     id: 13,
//     name: "Nova Nomad",
//     location: "Interstellar",
//     bountyAmount: 47000,
//     jediSith: false,
//     living: true,
//     image: "https://creators-images.vice.com/content-images/contentimage/no-slug/1ae6e902976045ae45be7314a2e90c02.jpg",
//     skills: ["Stellar Navigation", "Solar Winds Riding"],
//     weapon: "Nova Blast",
//     active: false,
//     huntersNotes: "The Nomad channels the power of solar winds to launch devastating attacks. Take cover during solar flares."
//   },
//   {
//     id: 14,
//     name: "Neptunian Necromancer",
//     location: "Neptune",
//     bountyAmount: 43000,
//     jediSith: false,
//     living: true,
//     image: "https://ih1.redbubble.net/image.330609357.8141/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg",
//     skills: ["Dark Arts", "Neptunian Sorcery"],
//     weapon: "Neptune's Curse",
//     active: false,
//     huntersNotes: "The Necromancer's powers stem from the depths of Neptune. Beware their illusions and mind-control abilities."
//   },
//   {
//     id: 15,
//     name: "Asteroid Raider",
//     location: "Asteroid Belt",
//     bountyAmount: 38000,
//     jediSith: false,
//     living: true,
//     image: "http://myfavoritehorror.com/wp-content/uploads/2017/10/myfavoritehorror-alien-raider-02.jpg",
//     skills: ["Asteroid Mining", "Zero Gravity Combat"],
//     weapon: "Starbreaker",
//     active: false,
//     huntersNotes: "The Raider is skilled in close-quarter combat in zero gravity. Utilize magnetic boots for stability."
//   },
//   {
//     id: 16,
//     name: "Venusian Vendetta",
//     location: "Venus",
//     bountyAmount: 39000,
//     jediSith: false,
//     living: true,
//     image: "https://brobible.com/wp-content/uploads/2020/09/Signs-Of-Potential-Alien-Life-Discovered-On-Venus-By-Astronomers.jpg",
//     skills: ["Venusian Stealth", "Acidic Weapons"],
//     weapon: "Venusian Viper",
//     active: false,
//     huntersNotes: "The Vendetta employs corrosive weapons due to Venus' hostile atmosphere. Upgrade your suit's protective layers."
//   },
// ];

// the rest of the bounties the ones without pictures

/*

 {
    id: 17,
    name: "Celestial Saboteur",
    location: "Interstellar",
    bountyAmount: 46000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Galactic Espionage", "Celestial Engineering"],
    weapon: "Star Saboteur",
    active: false,
    huntersNotes: "The Saboteur targets high-tech installations across the galaxy. Expect advanced traps and security systems."
  },
  {
    id: 18,
    name: "Interstellar Infiltrator",
    location: "Interstellar",
    bountyAmount: 49000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Infiltration", "Shape-shifting"],
    weapon: "Cosmic Phantom",
    active: false,
    huntersNotes: "The Infiltrator can assume various forms, making identification difficult. Rely on enhanced biometric scans."
  },
  {
    id: 19,
    name: "Cybernetic Criminal",
    location: "Interstellar",
    bountyAmount: 48000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Hacking", "Cybernetic Augmentation"],
    weapon: "Techno Blade",
    active: false,
    huntersNotes: "The Criminal possesses cybernetic enhancements, granting superior hacking abilities. Shield your systems from intrusion."
  },
  {
    id: 20,
    name: "Ceres Cartel Leader",
    location: "Ceres",
    bountyAmount: 50000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Criminal Organization", "Tactical Genius"],
    weapon: "Ceres' Wrath",
    active: false,
    huntersNotes: "The Cartel Leader commands a vast criminal organization within the asteroid belt. Expect coordinated attacks and cunning strategies."
  },
  {
    id: 21,
    name: "Titanian Terror",
    location: "Saturn's Moon - Titan",
    bountyAmount: 42000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Terror Tactics", "Titanian Adaptation"],
    weapon: "Titan's Fury",
    active: false,
    huntersNotes: "The Terror exploits the harsh conditions of Titan for cover and surprise attacks. Prepare for extreme cold and low visibility."
  },
  {
    id: 22,
    name: "Alpha Centauri Outlaw",
    location: "Alpha Centauri",
    bountyAmount: 47000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Interstellar Banditry", "Stellar Navigation"],
    weapon: "Centauri's Scourge",
    active: false,
    huntersNotes: "The Outlaw operates on the fringes of Alpha Centauri, striking from unexpected directions. Maintain constant sensor sweeps."
  },
  {
    id: 23,
    name: "Interplanetary Assassin",
    location: "Interstellar",
    bountyAmount: 49000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Contract Killing", "Multi-Planet Tactics"],
    weapon: "Star Slayer",
    active: false,
    huntersNotes: "The Assassin specializes in eliminating high-value targets across multiple planets. Anticipate decoys and diversion tactics."
  },
  {
    id: 24,
    name: "Galactic Gladiator",
    location: "Interstellar",
    bountyAmount: 52000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Combat Mastery", "Arena Champion"],
    weapon: "Galactic Fury",
    active: false,
    huntersNotes: "The Gladiator is a renowned combatant with experience in various arenas. Expect a highly skilled and adaptable opponent."
  },
  {
    id: 25,
    name: "Pandora's Rogue",
    location: "Saturn's Moon - Pandora",
    bountyAmount: 44000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Stealth Tactics", "Pandora's Curses"],
    weapon: "Rogue's Shadow",
    active: false,
    huntersNotes: "The Rogue utilizes Pandora's mythical curses to confound pursuers. Strengthen your mental fortitude before engaging."
  },
  {
    id: 26,
    name: "Interstellar Smuggler",
    location: "Interstellar",
    bountyAmount: 50000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Contraband Trade", "Black Market Connections"],
    weapon: "Stellar Shadow",
    active: false,
    huntersNotes: "The Smuggler is adept at evading authorities across multiple star systems. Intercept their escape routes to corner them."
  },
  {
    id: 27,
    name: "Charon's Phantom",
    location: "Pluto's Moon - Charon",
    bountyAmount: 43000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Shadow Manipulation", "Void Combat"],
    weapon: "Phantom's Embrace",
    active: false,
    huntersNotes: "The Phantom can manipulate shadows to conceal their movements. Utilize wide-range scanners to track their presence."
  },
  {
    id: 28,
    name: "Exoplanetary Explorer",
    location: "Interstellar",
    bountyAmount: 51000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Planet Exploration", "Exoplanet Survival"],
    weapon: "Stellar Explorer",
    active: false,
    huntersNotes: "The Explorer possesses extensive knowledge of exoplanets and their indigenous species. Study their cultural patterns for an advantage."
  },
  {
    id: 29,
    name: "Solarian Sentinel",
    location: "Interstellar",
    bountyAmount: 49000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Solar Manipulation", "Celestial Shielding"],
    weapon: "Sol's Guardian",
    active: false,
    huntersNotes: "The Sentinel wields the power of the sun itself. Employ advanced shielding technology to withstand their solar attacks."
  },
  {
    id: 30,
    name: "Galactic Mercenary",
    location: "Interstellar",
    bountyAmount: 52000,
    jediSith: false,
    living: true,
    image: "",
    skills: ["Combat Contracts", "Interstellar Warfare"],
    weapon: "Cosmic Mercenary",
    active: false,
    huntersNotes: "The Mercenary is a battle-hardened warrior, adept in various combat scenarios. Analyze their previous engagements for weaknesses."
  }


*/

bountiesRoute.get("/", async (req, res, next) => {
  let collection = await bounties.db.collection("bounties");
  let results = await collection.find({}).limit(1000).toArray();
  res.send(results).status(200);
});

bountiesRoute.post("/", async (req, res) => {
  let collection = await bounties.db.collection("bounties");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

bountiesRoute.patch("/:id", async (req, res, next) => {
  console.log(req.params.id);
  const id = req.params.id;
  const update = req.body.huntersNotes;
  console.log(update);
  const doc = await bounty.findOneAndUpdate({ _id: id }, { huntersNotes: update }, { new: true, upsert: true });
  res.send(doc).status(204);
});

bountiesRoute.delete("/:_id", async (req, res) => {
  const query = { _id: new ObjectId(req.params._id) };
  const collection = bounties.db.collection("bounties");
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});

module.exports = bountiesRoute;
