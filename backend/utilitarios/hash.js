import crypto from "crypto";

export function hashPassword(password) {
  const salt = process.env.PWD_SALT || "zenlife-salt";
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
}

export function comparePassword(plain, hashed) {
  return hashPassword(plain) === hashed;
}