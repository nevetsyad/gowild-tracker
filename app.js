import { AIRPORTS, search } from "./search.js";

const MARKER = "gowild-tracker-starter-2026-11-19";

const fromSelect = document.querySelector("#from");
const toSelect = document.querySelector("#to");
const whenSelect = document.querySelector("#when");
const stopsSelect = document.querySelector("#stops");
const form = document.querySelector("#search");
const results = document.querySelector("#results");
const summary = document.querySelector("#summary");

const city = Object.fromEntries(AIRPORTS.map((airport) => [airport.code, airport.city]));

function option(value, label) {
  const node = document.createElement("option");
  node.value = value;
  node.textContent = label;
  return node;
}

for (const airport of AIRPORTS) {
  const label = `${airport.code} · ${airport.city}`;
  fromSelect.append(option(airport.code, label));
  toSelect.append(option(airport.code, label));
}
fromSelect.value = "DEN";

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

function runSearch(event) {
  event?.preventDefault();
  const query = {
    from: fromSelect.value,
    to: toSelect.value,
    dayOffset: Number(whenSelect.value),
    stops: stopsSelect.value,
  };
  render(search(query), query);
}

form.addEventListener("submit", runSearch);
document.querySelector("#marker").textContent = MARKER;
runSearch();
