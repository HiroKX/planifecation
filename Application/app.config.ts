import 'dotenv/config';

export interface AppConfig {
  REACT_APP_GOOGLE_CLIENT_ID: string;
  URI_API: string;
  SECRET_KEY: string;
  ENVIRONMENT: string;
  URI_AUTHENTICATION: string;
}

export default {
  name: 'Planifécation',
  version: '1.0.0',
  extra: {
    REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    URI_API: process.env.URI_API,
    URI_AUTHENTICATION: process.env.URI_AUTHENTICATION,
    SECRET_KEY: process.env.SECRET_KEY,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
};
