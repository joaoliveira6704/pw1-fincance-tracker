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
export function createWallet(name, color, userId, amount) {
  return {
    name: name,
    balance: Number(amount),
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
export function createLog(
  userId,
  category,
  walletID = null,
  type,
  amount = null
) {
  return {
    userId: userId,
    category: category,
    walletID: walletID,
    type: type,
    amount: amount,
    date: todayDateTime(),
  };
}

//Cria objeto de amigo
export function createFriend(currentUserObj, friendUserObj) {
  return {
    userId: currentUserObj.id,
    userName: currentUserObj.firstName + " " + currentUserObj.lastName,
    userUsername: currentUserObj.username,
    friendId: friendUserObj.id,
    friendName: friendUserObj.firstName + " " + friendUserObj.lastName,
    friendUsername: friendUserObj.username,
    addedAt: todayDate(),
  };
}

export function createCountObject(date) {
  return { date: date, count: 0 };
}
