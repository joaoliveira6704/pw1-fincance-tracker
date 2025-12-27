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

/**
 * Formats Income String
 * @param {Number} income - The money quantity to format
 * @returns {String} - String with formatted income ("Ex: 12000.00 €")
 */
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

/**
 * Processes Logs and returns Arrays with data
 * @param {Array} logs - Transactions List
 * @param {Date} referenceDate - Reference Date (today)
 * @returns {Object|null} - Object with all data lists
 */
export function processChartData(logs, referenceDate) {
  if (!logs || logs.length === 0) return null;

  const now = new Date(referenceDate);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let currentBalance = 0;
  let accumulatedExpenses = 0;
  let accumulatedObjectives = 0;

  // Order Logs by Date
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // 1. Calculate Initial Balance (Logs Before day 1 of the current month)
  sortedLogs.forEach((log) => {
    const logDate = new Date(log.date);
    if (logDate < firstDayOfMonth) {
      const amount = Number(log.amount) || 0;
      if (log.category === "wallet" && ["create", "add"].includes(log.type))
        currentBalance += amount;
      if (log.category === "expense" && log.type === "add")
        currentBalance -= amount;
      if (log.category === "expense" && log.type === "remove")
        currentBalance += amount;
      if (log.category === "objective" && log.type === "add")
        currentBalance -= amount;
    }
  });

  const labels = [];
  const dataBalance = [];
  const dataExpenses = [];
  const dataObjectives = [];

  // 2. Loop for each month day
  for (
    let d = new Date(firstDayOfMonth);
    d <= today;
    d.setDate(d.getDate() + 1)
  ) {
    const currentDateStr = d.toISOString().split("T")[0];

    // Creates Label (ex: 01 JAN)
    labels.push(
      d
        .toLocaleDateString("pt-PT", { day: "2-digit", month: "short" })
        .toUpperCase()
    );

    const daysLogs = sortedLogs.filter((l) => l.date === currentDateStr);

    daysLogs.forEach((log) => {
      const amount = Number(log.amount) || 0;

      if (log.category === "wallet") {
        if (["add", "create"].includes(log.type)) currentBalance += amount;
      } else if (log.category === "expense") {
        if (log.type === "add") {
          currentBalance -= amount;
          accumulatedExpenses += amount;
        }
        if (log.type === "remove") {
          currentBalance += amount;
          accumulatedExpenses -= amount;
        }
      } else if (log.category === "objective") {
        if (log.type === "add") {
          currentBalance -= amount;
          accumulatedObjectives += amount;
        }
      }
    });

    dataBalance.push(currentBalance);
    dataExpenses.push(accumulatedExpenses);
    dataObjectives.push(accumulatedObjectives);
  }

  if (labels.length === 0) return null;

  // Return Data
  return {
    labels,
    dataBalance,
    dataExpenses,
    dataObjectives,
  };
}
