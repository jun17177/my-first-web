export interface Team {
  id: number;
  name: string;
  color: string;
  base: string;
  championships: number;
  drivers: string[];
}

export const teams: Team[] = [
  { id: 1, name: "Red Bull Racing", color: "#3671C6", base: "Milton Keynes, UK", championships: 6, drivers: ["Max Verstappen", "Liam Lawson"] },
  { id: 2, name: "Ferrari", color: "#E8002D", base: "Maranello, Italy", championships: 16, drivers: ["Charles Leclerc", "Lewis Hamilton"] },
  { id: 3, name: "McLaren", color: "#FF8000", base: "Woking, UK", championships: 8, drivers: ["Lando Norris", "Oscar Piastri"] },
  { id: 4, name: "Mercedes", color: "#27F4D2", base: "Brackley, UK", championships: 8, drivers: ["George Russell", "Kimi Antonelli"] },
  { id: 5, name: "Aston Martin", color: "#229971", base: "Silverstone, UK", championships: 0, drivers: ["Fernando Alonso", "Lance Stroll"] },
  { id: 6, name: "Alpine", color: "#FF87BC", base: "Enstone, UK", championships: 2, drivers: ["Pierre Gasly", "Jack Doohan"] },
  { id: 7, name: "Williams", color: "#64C4FF", base: "Grove, UK", championships: 7, drivers: ["Alex Albon", "Carlos Sainz"] },
  { id: 8, name: "Racing Bulls", color: "#6692FF", base: "Faenza, Italy", championships: 0, drivers: ["Yuki Tsunoda", "Isack Hadjar"] },
  { id: 9, name: "Haas", color: "#B6BABD", base: "Kannapolis, USA", championships: 0, drivers: ["Esteban Ocon", "Oliver Bearman"] },
  { id: 10, name: "Kick Sauber", color: "#52E252", base: "Hinwil, Switzerland", championships: 0, drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"] },
];
