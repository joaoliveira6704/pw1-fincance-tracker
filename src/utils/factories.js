// Gera um ID único
const generateId = () => crypto.randomUUID();

// Retorna a data atual (mm-dd-aaaa)
const todayDate = () => new Date().toISOString().slice(0, 10);

// Retorna a data atual (com horas minutos e segundos)
const todayDateTime = () => new Date().toISOString();

// Cria um Utilizador
export function createUser(username, firstName, lastName, email, password) {
  return {
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
    email: email,
    createdAt: todayDate(),
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
export function createWallet(name, color, userId) {
  return {
    id: generateId(),
    name: name,
    balance: 0,
    currency: "EUR",
    color: color,
    userId: userId,
    isArchived: false,
  };
}

// Cria um novo Objetivo
export function createGoal(
  name,
  targetAmount,
  deadline,
  status = "active",
  ownerId,
  isShared,
  memberIds,
  contributions
) {
  return {
    id: generateId(),
    name,
    targetAmount,
    deadline,
    status,
    ownerId,
    isShared,
    memberIds,
    contributions,
  };
}

// Cria um Log
export function createLog() {
  return {
    id: generateId(),
    timestamp: todayDateTime(),
    actionType: "",
    entity: "system",
    description: "",
    userId: null,
  };
}

//Cria objeto de amigo
export function createFriend(currentUserId, friendUserObj) {
  return {
    userId: currentUserId,
    friendId: friendUserObj.id,
    friendName: friendUserObj.name,
    friendUsername: friendUserObj.username,
    status: "accepted", // 'accepted' 'pending'
    addedAt: todayDate(),
  };
}
