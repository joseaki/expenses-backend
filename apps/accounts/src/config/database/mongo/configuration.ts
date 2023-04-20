import { registerAs } from '@nestjs/config';

export default registerAs('mongoConfig', () => ({
  uri: process.env.MONGO_URI,
}));
