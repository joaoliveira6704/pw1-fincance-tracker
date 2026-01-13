import bcrypt from "bcryptjs";

let passwordHash;

export async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    passwordHash = await bcrypt.hash(password, salt);
    console.log("Hash gerado:", passwordHash);
    return passwordHash;
  } catch (error) {
    console.error("Erro ao criptografar:", error);
  }
}

export async function comparePassword(userInputPassword, storedHashedPassword) {
  bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
    if (err) {
      // Handle error
      console.error("Error comparing passwords:", err);
      return;
    }

    if (result) {
      // Passwords match, authentication successful
      console.log("Passwords match! User authenticated.");
      return true;
    } else {
      // Passwords don't match, authentication failed
      console.log("Passwords do not match! Authentication failed.");
      return true;
    }
  });
}
