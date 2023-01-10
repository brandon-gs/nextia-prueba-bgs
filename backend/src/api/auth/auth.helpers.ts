import bcrypt from "bcryptjs";

export async function getHashedPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function matchPassword(hashPassword: string, password: string) {
  const matches = await bcrypt.compare(password, hashPassword);
  return matches;
}
