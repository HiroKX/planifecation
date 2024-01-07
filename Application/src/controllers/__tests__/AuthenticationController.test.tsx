import { ApolloClient, InMemoryCache } from '@apollo/client';
import { LogoutUser, updateClientToken } from '../AuthenticationController';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/RootStack';


type Props = NativeStackScreenProps<StackParamList>;

type ProfileScreenNavigationProp = Props['navigation'];

type ProfileScreenRouteProp = Props['route'];
const navigation = useNavigation<ProfileScreenNavigationProp>();
const route = useRoute<ProfileScreenRouteProp>();
describe('AuthenticationController', () => {
  let client: ApolloClient<any>;
  beforeEach(() => {
    client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: 'http://localhost:4000/',
      connectToDevTools: false, // Disable DevTools in test environment
    });
  });

  it('should signUpUser successfully', async () => {
    // Mocking secure-store functions
    updateClientToken(client, 'mockedUsername');

  });

  it('should logout user successfully', async () => {
    // Mocking secure-store functions
    
    LogoutUser(client,{navigation: navigation, route:route } );

  });
});