import 'dotenv/config';

export interface AppConfig {
    REACT_APP_GOOGLE_CLIENT_ID: string,
}

export default {
  name: 'Planifecation',
  version: '1.0.0',
  extra: {
    REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  },
};