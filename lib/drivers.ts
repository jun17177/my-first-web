export interface Driver {
  id: number;
  name: string;
  team: string;
  number: number;
  nationality: string;
  teamColor: string;
}

export const drivers: Driver[] = [
  { id: 1,  name: "Max Verstappen",     team: "Red Bull Racing", number: 1,  nationality: "NED", teamColor: "#3671C6" },
  { id: 2,  name: "Liam Lawson",        team: "Red Bull Racing", number: 30, nationality: "NZL", teamColor: "#3671C6" },
  { id: 3,  name: "Charles Leclerc",    team: "Ferrari",         number: 16, nationality: "MON", teamColor: "#E8002D" },
  { id: 4,  name: "Lewis Hamilton",     team: "Ferrari",         number: 44, nationality: "GBR", teamColor: "#E8002D" },
  { id: 5,  name: "Lando Norris",       team: "McLaren",         number: 4,  nationality: "GBR", teamColor: "#FF8000" },
  { id: 6,  name: "Oscar Piastri",      team: "McLaren",         number: 81, nationality: "AUS", teamColor: "#FF8000" },
  { id: 7,  name: "George Russell",     team: "Mercedes",        number: 63, nationality: "GBR", teamColor: "#27F4D2" },
  { id: 8,  name: "Kimi Antonelli",     team: "Mercedes",        number: 12, nationality: "ITA", teamColor: "#27F4D2" },
  { id: 9,  name: "Fernando Alonso",    team: "Aston Martin",    number: 14, nationality: "ESP", teamColor: "#229971" },
  { id: 10, name: "Lance Stroll",       team: "Aston Martin",    number: 18, nationality: "CAN", teamColor: "#229971" },
  { id: 11, name: "Pierre Gasly",       team: "Alpine",          number: 10, nationality: "FRA", teamColor: "#FF87BC" },
  { id: 12, name: "Jack Doohan",        team: "Alpine",          number: 7,  nationality: "AUS", teamColor: "#FF87BC" },
  { id: 13, name: "Alex Albon",         team: "Williams",        number: 23, nationality: "THA", teamColor: "#64C4FF" },
  { id: 14, name: "Carlos Sainz",       team: "Williams",        number: 55, nationality: "ESP", teamColor: "#64C4FF" },
  { id: 15, name: "Yuki Tsunoda",       team: "Racing Bulls",    number: 22, nationality: "JPN", teamColor: "#6692FF" },
  { id: 16, name: "Isack Hadjar",       team: "Racing Bulls",    number: 6,  nationality: "FRA", teamColor: "#6692FF" },
  { id: 17, name: "Esteban Ocon",       team: "Haas",            number: 31, nationality: "FRA", teamColor: "#B6BABD" },
  { id: 18, name: "Oliver Bearman",     team: "Haas",            number: 87, nationality: "GBR", teamColor: "#B6BABD" },
  { id: 19, name: "Nico Hülkenberg",    team: "Kick Sauber",     number: 27, nationality: "GER", teamColor: "#52E252" },
  { id: 20, name: "Gabriel Bortoleto",  team: "Kick Sauber",     number: 5,  nationality: "BRA", teamColor: "#52E252" },
];
