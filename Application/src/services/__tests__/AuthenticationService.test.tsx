import {ApolloClient, InMemoryCache, createHttpLink, HttpLink} from '@apollo/client';
import { CreateUser, LogUser } from '../AuthenticationService';
import { setContext } from '@apollo/client/link/context';
import { DeleteUser, UpdateUser } from '../UserService';
import fetch from 'cross-fetch';

describe('User Test', () => {
  let client: ApolloClient<any>;

  beforeEach(() => {
    client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: 'http://localhost:4000/',
      link: new HttpLink({ uri: '/', fetch }),
      connectToDevTools: false, // Disable DevTools in test environment
    });
  });

  const username = 'aABaaaA';
  let password = 'aABaaaA';

  it('should successfully create a user', async () => {
    const result = await CreateUser(client, username, password);
    expect(result).toBeGreaterThanOrEqual(1);
  });

  it('should fail to create a user', async () => {
    const result = await CreateUser(client, username, password);
    expect(result).toBe(0);
  });

  it('should successfully log a user', async () => {
    // Configurez votre mock pour simuler une erreur
    // ...code pour configurer le mock d'erreur...
    const result = await LogUser(client, username, password);
    expect(result).not.toBe('Not Logged');
  });

  it('should fail to update a user on error', async () => {
    // Configurez votre mock pour simuler une erreur
    // ...code pour configurer le mock d'erreur...
    const token = await LogUser(client, username, password);
    const httpLink = createHttpLink({
      uri: 'http://localhost:4000/',
      fetch
    });
    if (token != null && token != 'Not Logged') {
      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: token,
          },
        };
      });
      client.setLink(authLink.concat(httpLink));
    }
    const passwordMod = password + 'Test';
    const result = await UpdateUser(client, username, passwordMod);
    expect(result).toBeTruthy();
    const result2 = await LogUser(client, username, passwordMod);
    expect(result2).not.toBe('Not Logged');
    const result3 = await UpdateUser(client, username, password);
    expect(result3).toBeTruthy();
  });

  it('should successfully delete a user', async () => {
    const token = await LogUser(client, username, password);
    const httpLink = createHttpLink({
      uri: 'http://localhost:4000/',
      fetch
    });
    if (token != null && token != 'Not Logged') {
      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: token,
          },
        };
      });
      client.setLink(authLink.concat(httpLink));
    }
    const result = await DeleteUser(client, username);
    expect(result).toBeTruthy();
  });

  it('should fail to delete a user on error', async () => {
    // Configurez votre mock pour simuler une erreur
    // ...code pour configurer le mock d'erreur...
    const result = await DeleteUser(client, username);
    expect(result).toBeFalsy();
  });
});
