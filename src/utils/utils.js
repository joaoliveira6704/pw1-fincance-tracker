/**
 * Formats Date
 * @param {Date} date - The date to format
 * @returns {String} - String with formatted date ("Ex: 1 de Janeiro de 2026")
 */
export function formattedDate(date) {
  if (!date) return "";
  return new Date(date)
    .toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
}

/**
 * Formats Value String
 * @param {Number} value - The money quantity to format
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
  // Contagem com normalização de data
  const countsMap = data.reduce((acc, item) => {
    if (!item.date) return acc;

    // Converte a data (seja ela YYYY-MM-DD ou ISO Timestamp) para apenas YYYY-MM-DD
    const d = new Date(item.date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateKey = `${year}-${month}-${day}`;

    // Se a data já existe, soma. Se não, começa em 1.
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});

  // Converte o mapa de volta para o formato de array que o heatmap espera
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
/**
 * Processes Logs and returns Arrays with data
 */
export function processChartData(logs, referenceDate) {
  if (!logs || logs.length === 0) return null;

  const now = new Date(referenceDate);
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const today = new Date();

  // Define o fim do gráfico
  const endPoint =
    month === today.getMonth() && year === today.getFullYear()
      ? new Date(today.getFullYear(), today.getMonth(), today.getDate())
      : new Date(year, month + 1, 0);

  let currentBalance = 0;
  let accumulatedObjectives = 0;

  const sortedLogs = [...logs].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Cálculo do Saldo Inicial
  sortedLogs.forEach((log) => {
    const logDate = new Date(log.date);
    if (logDate < firstDayOfMonth) {
      const amount = Number(log.amount) || 0;
      if (log.category === "wallet") {
        if (["create", "add"].includes(log.type)) currentBalance += amount;
        if (log.type === "remove") currentBalance -= amount;
      }
      // Calcular objetivos
      if (log.category === "objective" && log.type === "add") {
        accumulatedObjectives += amount;
      }
    }
  });

  const labels = [];
  const dataBalance = [];
  const dataExpenses = [];
  const dataObjectives = [];

  // Loop Diário
  let d = new Date(firstDayOfMonth);
  while (d <= endPoint) {
    const yearStr = d.getFullYear();
    const monthStr = String(d.getMonth() + 1).padStart(2, "0");
    const dayStr = String(d.getDate()).padStart(2, "0");
    const currentDateStr = `${yearStr}-${monthStr}-${dayStr}`;

    labels.push(
      d
        .toLocaleDateString("pt-PT", { day: "2-digit", month: "short" })
        .toUpperCase()
    );

    // As Despesas passam a 0 a cada dia
    let dailyExpenses = 0;

    const daysLogs = sortedLogs.filter((l) => {
      const dLog = new Date(l.date);
      const dLogStr = `${dLog.getFullYear()}-${String(
        dLog.getMonth() + 1
      ).padStart(2, "0")}-${String(dLog.getDate()).padStart(2, "0")}`;
      return dLogStr === currentDateStr;
    });

    daysLogs.forEach((log) => {
      const amount = Number(log.amount) || 0;

      // Saldo Total carteiras acumuladas
      if (log.category === "wallet") {
        if (["add", "create"].includes(log.type)) currentBalance += amount;
        if (log.type === "remove") currentBalance -= amount;
      }

      // Despesas
      else if (log.category === "expense") {
        if (log.type === "add") dailyExpenses += amount;
        if (log.type === "remove") dailyExpenses -= amount;
      }

      // Objetivos acumulados
      else if (log.category === "objective" && log.type === "add") {
        accumulatedObjectives += amount;
      }
    });

    dataBalance.push(currentBalance);
    dataExpenses.push(dailyExpenses);
    dataObjectives.push(accumulatedObjectives);

    d.setDate(d.getDate() + 1);
  }

  return { labels, dataBalance, dataExpenses, dataObjectives };
}

/**
 * Retorna os dados de um objetivo individual
 */
export function getObjectiveData(objective) {
  const contributions = objective.contributions || [];

  const sum = contributions.reduce(
    (acc, contribution) => acc + Number(contribution.amount || 0),
    0
  );

  const target = Number(objective.targetAmount) || 1;
  const progress = (sum / target) * 100;

  // Arredonda e limita a 100%
  const finalProgress = Math.min(Math.round(progress), 100);

  return {
    sum,
    progress: finalProgress,
  };
}

/**
 * Processa uma lista de objetivos
 */
export function processObjectivesData(objectives) {
  // Retorna o objeto com zeros
  if (!objectives || objectives.length === 0) {
    return {
      percentage: 0,
      sum: 0,
    };
  }

  let objectivesProgress = [];
  let totalSum = 0;

  objectives.forEach((objective) => {
    let data = getObjectiveData(objective);
    totalSum += data.sum;
    objectivesProgress.push(data.progress);
  });

  // Cálculo da média das percentagens
  const totalPercentage =
    objectivesProgress.reduce((acc, progress) => acc + Number(progress), 0) /
    objectivesProgress.length;

  return {
    percentage: totalPercentage,
    sum: totalSum,
  };
}
