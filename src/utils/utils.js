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
