import { createCountObject } from "./factories";

// Returns formatted date to portugal
export function formattedDate(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("pt-PT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Retorna o salário formatado em euros
export function formattedIncome(income) {
  if (!income) return "0.00 €";
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(income);
}

export function getDailyCount(data) {
  // 1. Count everything in a single pass using an Object map
  const countsMap = data.reduce((acc, item) => {
    // If date exists, add 1. If not, start at 1.
    acc[item.date] = (acc[item.date] || 0) + 1;
    return acc;
  }, {});

  // 2. Convert the map back to your array format
  return Object.keys(countsMap).map((date) => ({
    date: date,
    count: countsMap[date],
  }));
}
