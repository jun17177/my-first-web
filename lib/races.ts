export interface Race {
  id: number;
  round: number;
  name: string;
  circuit: string;
  country: string;
  date: string;
  status: "completed" | "upcoming";
}

export const races: Race[] = [
  { id: 1,  round: 1,  name: "Australian Grand Prix",      circuit: "Albert Park",        country: "Australia",    date: "2025-03-16", status: "completed" },
  { id: 2,  round: 2,  name: "Chinese Grand Prix",         circuit: "Shanghai",           country: "China",        date: "2025-03-23", status: "completed" },
  { id: 3,  round: 3,  name: "Japanese Grand Prix",        circuit: "Suzuka",             country: "Japan",        date: "2025-04-06", status: "completed" },
  { id: 4,  round: 4,  name: "Bahrain Grand Prix",         circuit: "Bahrain Int'l",      country: "Bahrain",      date: "2025-04-13", status: "completed" },
  { id: 5,  round: 5,  name: "Saudi Arabian Grand Prix",   circuit: "Jeddah Corniche",    country: "Saudi Arabia", date: "2025-04-20", status: "completed" },
  { id: 6,  round: 6,  name: "Miami Grand Prix",           circuit: "Miami Int'l",        country: "USA",          date: "2025-05-04", status: "completed" },
  { id: 7,  round: 7,  name: "Emilia Romagna Grand Prix",  circuit: "Imola",              country: "Italy",        date: "2025-05-18", status: "completed" },
  { id: 8,  round: 8,  name: "Monaco Grand Prix",          circuit: "Circuit de Monaco",  country: "Monaco",       date: "2025-05-25", status: "completed" },
  { id: 9,  round: 9,  name: "Spanish Grand Prix",         circuit: "Circuit de Barcelona","country": "Spain",     date: "2025-06-01", status: "completed" },
  { id: 10, round: 10, name: "Canadian Grand Prix",        circuit: "Circuit Gilles Villeneuve", country: "Canada", date: "2025-06-15", status: "upcoming" },
  { id: 11, round: 11, name: "Austrian Grand Prix",        circuit: "Red Bull Ring",      country: "Austria",      date: "2025-06-29", status: "upcoming" },
  { id: 12, round: 12, name: "British Grand Prix",         circuit: "Silverstone",        country: "UK",           date: "2025-07-06", status: "upcoming" },
  { id: 13, round: 13, name: "Belgian Grand Prix",         circuit: "Spa-Francorchamps",  country: "Belgium",      date: "2025-07-27", status: "upcoming" },
  { id: 14, round: 14, name: "Hungarian Grand Prix",       circuit: "Hungaroring",        country: "Hungary",      date: "2025-08-03", status: "upcoming" },
  { id: 15, round: 15, name: "Dutch Grand Prix",           circuit: "Zandvoort",          country: "Netherlands",  date: "2025-08-31", status: "upcoming" },
  { id: 16, round: 16, name: "Italian Grand Prix",         circuit: "Monza",              country: "Italy",        date: "2025-09-07", status: "upcoming" },
  { id: 17, round: 17, name: "Azerbaijan Grand Prix",      circuit: "Baku City Circuit",  country: "Azerbaijan",   date: "2025-09-21", status: "upcoming" },
  { id: 18, round: 18, name: "Singapore Grand Prix",       circuit: "Marina Bay",         country: "Singapore",    date: "2025-10-05", status: "upcoming" },
  { id: 19, round: 19, name: "United States Grand Prix",   circuit: "Circuit of the Americas", country: "USA",     date: "2025-10-19", status: "upcoming" },
  { id: 20, round: 20, name: "Mexico City Grand Prix",     circuit: "Autódromo Hermanos Rodríguez", country: "Mexico", date: "2025-10-26", status: "upcoming" },
  { id: 21, round: 21, name: "São Paulo Grand Prix",       circuit: "Interlagos",         country: "Brazil",       date: "2025-11-09", status: "upcoming" },
  { id: 22, round: 22, name: "Las Vegas Grand Prix",       circuit: "Las Vegas Strip",    country: "USA",          date: "2025-11-22", status: "upcoming" },
  { id: 23, round: 23, name: "Qatar Grand Prix",           circuit: "Lusail Int'l",       country: "Qatar",        date: "2025-11-30", status: "upcoming" },
  { id: 24, round: 24, name: "Abu Dhabi Grand Prix",       circuit: "Yas Marina",         country: "UAE",          date: "2025-12-07", status: "upcoming" },
];
