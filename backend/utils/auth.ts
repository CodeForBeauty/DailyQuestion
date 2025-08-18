import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import config from "./config"
import { checkUserName } from "../db"

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, config.ENCRYPT_KEY)
}

export const createToken = (name: string): string => {
  return jwt.sign(name, config.ENCRYPT_KEY)
}

export const checkToken = async (token: string): Promise<boolean> => {
  const decoded = jwt.verify(token, config.ENCRYPT_KEY)
  if (!decoded || typeof decoded !== "string") {
    return false
  }
  return await checkUserName(String(decoded))
}