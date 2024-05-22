import * as bcrypt from "bcrypt";

const saltRounds = 10;

export default async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
