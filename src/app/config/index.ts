import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycript_saltRounds: process.env.BYCRIPT_SALTROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
};
