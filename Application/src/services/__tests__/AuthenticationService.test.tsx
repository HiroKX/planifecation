import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { CreateUser, LogUser } from '../AuthenticationService';
import fetch from 'cross-fetch';
import { URI_API } from '@env';

describe('User Test', () => {
  let client: ApolloClient<any>;

  beforeEach(() => {
    client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: `${URI_API}`,
      link: new HttpLink({
        uri: `${URI_API}`,
        fetch,
      }),
      connectToDevTools: false, // Disable DevTools in test environment
    });
  });

  const username = 'aABaaaA';
  let password = 'aABaaaA';
  let result: number;
  let token: string;

  it('should successfully create a user', async () => {
    result = await CreateUser(client, username, password);
    expect(result).toBeGreaterThanOrEqual(1);
  });

  it('should fail to create a user', async () => {
    const response = await CreateUser(client, username, password);
    expect(response).toThrow();
  });

  it('Should successfully log the user', async () => {
    const response = await LogUser(client, username, password);
    expect(response).toContain('logUser');
    const fromJSON = JSON.parse(response);
    token = fromJSON.logUser;
    expect(token).not.toBe(null);
  });
});
