import { getUserId } from "./session";

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
      private: false,
      monthlyLimit: 0,
    },
  };
}

// Cria uma despesa
export function createExpense(
  userId,
  name,
  categoryId,
  date,
  amount,
  description
) {
  return {
    id: generateId(),
    userId: userId,
    name: name,
    date: date,
    amount: amount,
    categoryId: categoryId,
    walletId: 1,
    description: description,
  };
}

// Cria uma nova Carteira (Wallet)
export function createWallet(name, color, userId, amount) {
  return {
    id: generateId(),
    name: name,
    balance: Number(amount),
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
  description,
  ownerId,
  memberIds
) {
  return {
    id: generateId(),
    name,
    targetAmount,
    deadline,
    description,
    ownerId,
    memberIds,
    contributions: [],
  };
}

// Cria um Log
export function createLog(
  userId,
  category,
  typeId = null,
  type,
  amount = null
) {
  return {
    userId: userId,
    category: category,
    typeId: typeId,
    type: type,
    amount: Number(amount),
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

export function createObjectiveContribution(amount) {
  return {
    userId: getUserId(),
    amount: amount,
    timestamp: todayDateTime(),
  };
}
