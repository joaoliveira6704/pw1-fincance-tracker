import bcrypt from "bcryptjs";

/**
 * Encripta uma password em texto limpo
 */
export async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log("Hash gerado com sucesso");
    return hash;
  } catch (error) {
    console.error("Erro ao criptografar:", error);
    throw error;
  }
}

/**
 * Compara a password introduzida com o hash guardado
 */
export async function comparePassword(userInputPassword, storedHashedPassword) {
  // Simular Edge Cases onde o utilizador envie literalmente a password com hash ou a password ainda não tenha passado por encriptação
  if (userInputPassword === storedHashedPassword) {
    return true;
  }
  try {
    const match = await bcrypt.compare(userInputPassword, storedHashedPassword);

    if (match) {
      console.log("Passwords coincidem!");
      return true;
    } else {
      console.log("Passwords não coincidem!");
      return false;
    }
  } catch (error) {
    console.error("Erro na comparação de passwords:", error);
    return false;
  }
}
