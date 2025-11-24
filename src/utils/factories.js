// Gera um ID único
const generateId = () => crypto.randomUUID();

// Cria um Utilizador
export function createUser(username, firstName, lastName, email, password) {
  return {
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
    email: email,
    createdAt: new Date().toISOString().slice(0, 10),
    isAdmin: false,
    income: 0,
    preferences: {
      currency: "EUR",
      theme: "light",
    },
  };
}

// Cria uma despesa
export function createExpense(userId, name, date, amount, description) {
  return {
    userId: userId,
    name: name,
    date: date,
    amount: amount,
    categoryId: 2,
    walletId: 1,
    description: description,
  };
}

/* id: "log_001",
  userId: "user_tiago",
  actionType: "CREATE",
  entity: "transaction",
  entityId: "txn_55",
  
  amount: -25.50,               // Negativo para indicar saída visualmente fácil
  currency: "EUR",
  
  description: "Jantar no McDonald's",
  details: {
    category: "Alimentação",
    wallet: "Dinheiro Vivo"
  },
  
  timestamp: "2023-11-23T20:15:00Z"
} */

// Cria uma nova Carteira (Wallet)
export function createWallet() {
  return {
    id: generateId(),
    name: "Nova Carteira",
    balance: 0,
    currency: "EUR",
    color: "#000000",
    isArchived: false,
  };
}

// Cria um novo Objetivo
export function createGoal(data = {}) {
  return {
    id: generateId(),
    name: "Novo Objetivo",
    targetAmount: 0,
    deadline: null,
    status: "active",
    ownerId: null,
    isShared: false,
    memberIds: [],
    contributions: [],
  };
}

// Cria um Log
export function createLog() {
  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
    actionType: "",
    entity: "system",
    description: "",
    userId: null,
  };
}
