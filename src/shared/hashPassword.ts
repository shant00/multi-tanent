import bcrypt from 'bcrypt';
import config from '../config';

export const makeHashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, config.bycrypt_salt_rounds!);
};
