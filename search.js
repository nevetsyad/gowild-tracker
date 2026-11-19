export const AIRPORTS = [
  { code: "DEN", city: "Denver" },
  { code: "LAS", city: "Las Vegas" },
  { code: "PHX", city: "Phoenix" },
  { code: "AUS", city: "Austin" },
  { code: "DFW", city: "Dallas" },
  { code: "MCO", city: "Orlando" },
  { code: "ATL", city: "Atlanta" },
  { code: "ORD", city: "Chicago" },
  { code: "SAN", city: "San Diego" },
  { code: "CUN", city: "Cancun" },
  { code: "DCA", city: "Washington, DC · Reagan National" },
  { code: "IAD", city: "Washington, DC · Dulles" },
  { code: "BWI", city: "Baltimore/Washington · BWI" },
  { code: "MIA", city: "Miami" },
  { code: "IAH", city: "Houston" },
  { code: "MSY", city: "New Orleans" },
  { code: "SJU", city: "San Juan" },
  { code: "TPA", city: "Tampa" },
  { code: "PUJ", city: "Punta Cana" },
  { code: "GUA", city: "Guatemala City" },
  { code: "SAL", city: "San Salvador" },
  { code: "RSW", city: "Fort Myers" },
  { code: "DTW", city: "Detroit" },
  { code: "LAX", city: "Los Angeles" },
  { code: "SFO", city: "San Francisco" },
  { code: "ONT", city: "Ontario, CA" },
  { code: "SLC", city: "Salt Lake City" },
  { code: "SEA", city: "Seattle" },
  { code: "ELP", city: "El Paso" },
];

export const ORIGIN_AIRPORTS = AIRPORTS.filter(({ code }) =>
  ["DEN", "LAS", "PHX", "AUS", "DFW", "MCO", "ATL", "ORD", "DCA", "IAD", "BWI"].includes(code)
);

// Snapshot of Frontier's public "flights from" deal cards fetched Nov 19, 2026.
// These are regular/Discount Den fare leads, not GoWild prices or seat inventory.
export const DC_FARE_SNAPSHOTS = [
  { from: "DCA", to: "DEN", date: "2027-01-13", fare: 143 },
  { from: "IAD", to: "MCO", date: "2027-02-20", fare: 32 },
  { from: "IAD", to: "SJU", date: "2027-01-11", fare: 84 },
  { from: "IAD", to: "MIA", date: "2027-01-01", fare: 35 },
  { from: "IAD", to: "LAS", date: "2027-02-02", fare: 90 },
  { from: "DCA", to: "DFW", date: "2027-01-16", fare: 109 },
  { from: "DCA", to: "LAS", date: "2027-01-20", fare: 128 },
  { from: "DCA", to: "LAX", date: "2027-01-05", fare: 118 },
  { from: "DCA", to: "PHX", date: "2027-01-09", fare: 139 },
  { from: "IAD", to: "IAH", date: "2027-01-12", fare: 55 },
  { from: "DCA", to: "SFO", date: "2027-02-10", fare: 169 },
  { from: "DCA", to: "IAH", date: "2027-01-11", fare: 133 },
  { from: "DCA", to: "SAN", date: "2027-01-24", fare: 138 },
  { from: "DCA", to: "SLC", date: "2027-01-28", fare: 129 },
  { from: "DCA", to: "SEA", date: "2027-01-14", fare: 158 },
  { from: "IAD", to: "PHX", date: "2026-12-22", fare: 195 },
  { from: "DCA", to: "ONT", date: "2026-12-21", fare: 175 },
  { from: "IAD", to: "MSY", date: "2027-01-20", fare: 60 },
  { from: "IAD", to: "ORD", date: "2027-02-17", fare: 70 },
  { from: "DCA", to: "ELP", date: "2027-03-14", fare: 248 },
  { from: "BWI", to: "MCO", date: "2027-03-03", fare: 25 },
  { from: "BWI", to: "ATL", date: "2027-01-16", fare: 22 },
  { from: "BWI", to: "SJU", date: "2027-01-19", fare: 84 },
  { from: "BWI", to: "DFW", date: "2027-01-13", fare: 59 },
  { from: "BWI", to: "TPA", date: "2027-02-26", fare: 38 },
  { from: "BWI", to: "MIA", date: "2027-01-01", fare: 35 },
  { from: "BWI", to: "IAH", date: "2027-01-16", fare: 55 },
  { from: "BWI", to: "ORD", date: "2027-02-02", fare: 70 },
  { from: "BWI", to: "LAS", date: "2027-01-20", fare: 90 },
  { from: "BWI", to: "LAX", date: "2027-02-09", fare: 128 },
  { from: "BWI", to: "DEN", date: "2027-02-03", fare: 80 },
  { from: "BWI", to: "MSY", date: "2027-02-09", fare: 65 },
  { from: "BWI", to: "PUJ", date: "2027-02-01", fare: 166 },
  { from: "BWI", to: "PHX", date: "2027-02-17", fare: 145 },
  { from: "BWI", to: "DTW", date: "2027-01-06", fare: 67 },
  { from: "BWI", to: "SFO", date: "2026-12-22", fare: 239 },
  { from: "BWI", to: "CUN", date: "2027-01-15", fare: 209 },
  { from: "BWI", to: "GUA", date: "2027-02-01", fare: 111 },
  { from: "BWI", to: "RSW", date: "2026-12-21", fare: 143 },
  { from: "BWI", to: "SAL", date: "2027-01-02", fare: 203 },
];

// Sample inventory only. dayOffset 0 = today, 1 = tomorrow, in the browser's local date.
// Times are wall-clock labels, not a live Frontier feed.
export const LEGS = [
  { id: "F9-234", from: "DEN", to: "LAS", depart: "06:00", arrive: "07:15", seats: 8, dayOffset: 0 },
  { id: "F9-418", from: "LAS", to: "SAN", depart: "09:30", arrive: "10:45", seats: 4, dayOffset: 0 },
  { id: "F9-118", from: "DEN", to: "PHX", depart: "08:10", arrive: "09:20", seats: 14, dayOffset: 0 },
  { id: "F9-902", from: "DEN", to: "MCO", depart: "11:00", arrive: "16:40", seats: 2, dayOffset: 0 },
  { id: "F9-640", from: "DEN", to: "AUS", depart: "14:20", arrive: "17:05", seats: 11, dayOffset: 0 },
  { id: "F9-221", from: "ATL", to: "MCO", depart: "07:00", arrive: "08:30", seats: 6, dayOffset: 0 },
  { id: "F9-775", from: "MCO", to: "CUN", depart: "13:00", arrive: "15:10", seats: 3, dayOffset: 0 },
  { id: "F9-330", from: "PHX", to: "LAS", depart: "12:00", arrive: "13:05", seats: 9, dayOffset: 0 },
  { id: "F9-331", from: "LAS", to: "DEN", depart: "15:40", arrive: "18:50", seats: 1, dayOffset: 0 },
  { id: "F9-510", from: "ORD", to: "DEN", depart: "09:15", arrive: "10:50", seats: 7, dayOffset: 0 },
  { id: "F9-236", from: "DEN", to: "LAS", depart: "06:20", arrive: "07:35", seats: 5, dayOffset: 1 },
  { id: "F9-420", from: "LAS", to: "SAN", depart: "10:00", arrive: "11:15", seats: 12, dayOffset: 1 },
  { id: "F9-904", from: "DEN", to: "MCO", depart: "09:40", arrive: "15:20", seats: 6, dayOffset: 1 },
  { id: "F9-777", from: "MCO", to: "CUN", depart: "17:30", arrive: "19:40", seats: 4, dayOffset: 1 },
  { id: "F9-642", from: "DEN", to: "AUS", depart: "13:05", arrive: "15:50", seats: 9, dayOffset: 1 },
  { id: "F9-119", from: "DEN", to: "PHX", depart: "16:15", arrive: "17:25", seats: 3, dayOffset: 1 },
  { id: "F9-223", from: "ATL", to: "DFW", depart: "08:45", arrive: "10:20", seats: 10, dayOffset: 1 },
  { id: "F9-224", from: "DFW", to: "CUN", depart: "12:10", arrive: "14:55", seats: 2, dayOffset: 1 },
];

export const MIN_CONNECT_MINUTES = 75;

export function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function search({ from, to = "ANY", dayOffset = 0, stops = "any" }) {
  const legs = LEGS.filter((leg) => leg.dayOffset === dayOffset && leg.from);
  const nonstops = legs
    .filter((leg) => leg.from === from && (to === "ANY" || leg.to === to))
    .map((leg) => ({
      kind: "nonstop",
      via: null,
      legs: [leg],
      seats: leg.seats,
      connectMin: 0,
    }));

  if (stops === "nonstop") {
    return nonstops.sort(byDepart);
  }

  const connections = [];
  for (const first of legs) {
    if (first.from !== from) continue;
    for (const second of legs) {
      if (second.from !== first.to) continue;
      if (second.to === from) continue;
      if (to !== "ANY" && second.to !== to) continue;
      const gap = toMinutes(second.depart) - toMinutes(first.arrive);
      if (gap < MIN_CONNECT_MINUTES) continue;
      connections.push({
        kind: "connection",
        via: first.to,
        legs: [first, second],
        seats: Math.min(first.seats, second.seats),
        connectMin: gap,
      });
    }
  }

  return [...nonstops, ...connections].sort(byDepart);
}

function byDepart(a, b) {
  return toMinutes(a.legs[0].depart) - toMinutes(b.legs[0].depart);
}
