import 'dotenv/config';

export interface AppConfig {
  REACT_APP_GOOGLE_CLIENT_ID: string;
  URI_API: string;
  SECRET_KEY: string;
}

export default {
  name: '@env',
  version: '1.0.0',
  extra: {
    REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    URI_API: process.env.URI_API,
    SECRET_KEY: process.env.SECRET_KEY,
  },
};
