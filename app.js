import { AIRPORTS, ORIGIN_AIRPORTS, DC_FARE_SNAPSHOTS, search } from "./search.js";

const MARKER = "gowild-tracker-dc-fares-2026-11-19";

const fromSelect = document.querySelector("#from");
const toSelect = document.querySelector("#to");
const whenSelect = document.querySelector("#when");
const stopsSelect = document.querySelector("#stops");
const form = document.querySelector("#search");
const results = document.querySelector("#results");
const summary = document.querySelector("#summary");

const city = Object.fromEntries(AIRPORTS.map((airport) => [airport.code, airport.city]));
const airportNames = {
  DCA: "Reagan National",
  IAD: "Dulles",
  BWI: "Baltimore/Washington",
};

fromSelect.append(option("DC", "DC area · all airports"));
for (const airport of ORIGIN_AIRPORTS) {
  const label = `${airport.code} · ${airport.city}`;
  fromSelect.append(option(airport.code, label));
}
for (const airport of AIRPORTS) {
  const label = `${airport.code} · ${airport.city}`;
  toSelect.append(option(airport.code, label));
}

function option(value, label) {
  const node = document.createElement("option");
  node.value = value;
  node.textContent = label;
  return node;
}

fromSelect.value = "DC";

function dayLabel(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

whenSelect.options[0].textContent = `Today · ${dayLabel(0)}`;
whenSelect.options[1].textContent = `Tomorrow · ${dayLabel(1)}`;

function seatLabel(seats) {
  if (seats <= 2) return `${seats} left · tight`;
  if (seats >= 10) return `${seats} left · open`;
  return `${seats} left`;
}

function render(items, query) {
  results.replaceChildren();
  const where = query.to === "ANY" ? "anywhere" : `${query.to} ${city[query.to] || ""}`.trim();
  summary.textContent =
    items.length === 0
      ? `No sample GoWild seats ${query.from} → ${where} on this date.`
      : `${items.length} sample itinerar${items.length === 1 ? "y" : "ies"} · ${query.from} → ${where} · not live inventory`;

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Try DEN → anywhere, or DEN → SAN with connections. Tomorrow includes DEN → CUN via MCO.";
    results.append(empty);
    return;
  }

  for (const item of items) {
    const card = document.createElement("article");
    card.className = "flight";
    const first = item.legs[0];
    const last = item.legs[item.legs.length - 1];
    const title = document.createElement("header");
    title.innerHTML = `
      <p class="route">${first.from} <span>→</span> ${last.to}</p>
      <p class="meta">${first.depart}–${last.arrive} · ${item.kind === "nonstop" ? "Nonstop" : `1 stop ${item.via} · ${item.connectMin}m`}</p>
    `;
    const seats = document.createElement("p");
    seats.className = `seats ${item.seats <= 2 ? "tight" : ""}`;
    seats.textContent = seatLabel(item.seats);
    title.append(seats);
    card.append(title);

    const list = document.createElement("ol");
    for (const leg of item.legs) {
      const row = document.createElement("li");
      row.textContent = `${leg.id}  ${leg.from} ${leg.depart} → ${leg.to} ${leg.arrive}  ·  GoWild sample  ·  ${leg.seats} seats`;
      list.append(row);
    }
    card.append(list);
    results.append(card);
  }
}

function renderDcFareLeads(query) {
  results.replaceChildren();
  const offers = DC_FARE_SNAPSHOTS.filter((offer) =>
    (query.from === "DC" || offer.from === query.from) &&
    (query.to === "ANY" || offer.to === query.to)
  ).sort((a, b) => a.date.localeCompare(b.date) || a.fare - b.fare);
  summary.textContent = `${offers.length} Frontier fare lead${offers.length === 1 ? "" : "s"} · captured Nov 19, 2026 · not GoWild inventory`;

  if (offers.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No fare lead for that airport/destination in this snapshot. Open Frontier's current origin page to search live options.";
    results.append(empty);
    return;
  }

  for (const offer of offers) {
    const card = document.createElement("article");
    card.className = "flight";
    const header = document.createElement("header");
    const route = document.createElement("p");
    route.className = "route";
    route.textContent = `${offer.from} ${airportNames[offer.from]} → ${city[offer.to] || offer.to} (${offer.to})`;
    const meta = document.createElement("p");
    meta.className = "meta";
    const date = new Date(`${offer.date}T12:00:00`);
    meta.textContent = `Frontier one-way fare card · ${date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}`;
    const fare = document.createElement("p");
    fare.className = "seats";
    fare.textContent = `From $${offer.fare} · Discount Den Basic fare snapshot*`;
    header.append(route, meta, fare);
    card.append(header);

    const source = document.createElement("a");
    source.href = offer.from === "BWI"
      ? "https://flights.flyfrontier.com/en/flights-from-baltimore"
      : "https://flights.flyfrontier.com/en/flights-from-washington";
    source.target = "_blank";
    source.rel = "noopener";
    source.textContent = "Check current options on Frontier ↗";
    card.append(source);
    results.append(card);
  }

  const caveat = document.createElement("p");
  caveat.className = "sources";
  caveat.textContent = "*Frontier's page describes these as one-way Discount Den Basic fares found by other travelers in the prior 48 hours. Price, date, and routing may have changed; these are not GoWild fares or a live booking result.";
  results.append(caveat);
}

function updateSearchMode() {
  const dcMode = ["DC", "DCA", "IAD", "BWI"].includes(fromSelect.value);
  document.querySelector("#when-label").hidden = dcMode;
  document.querySelector("#stops-label").hidden = dcMode;
  document.querySelector("#search-button").textContent = dcMode ? "Show fare leads" : "Search demo inventory";
  runSearch();
}

function runSearch(event) {
  event?.preventDefault();
  const query = {
    from: fromSelect.value,
    to: toSelect.value,
    dayOffset: Number(whenSelect.value),
    stops: stopsSelect.value,
  };
  if (["DC", "DCA", "IAD", "BWI"].includes(query.from)) {
    renderDcFareLeads(query);
    return;
  }
  render(search(query), query);
}

fromSelect.addEventListener("change", updateSearchMode);
form.addEventListener("submit", runSearch);
document.querySelector("#marker").textContent = MARKER;
updateSearchMode();
