import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import {REACT_APP_GOOGLE_CLIENT_ID} from "@env"
import { User } from '../../models/User';


export default async function GoogleAuth(): User{
    const YOUR_CLIENT_ID = REACT_APP_GOOGLE_CLIENT_ID
    const YOUR_REDIRECT_URI = "http://localhost:3001/google"
    const REDIRECT_URI = "exp://192.168.1.59:8081"

        const result = await WebBrowser.openAuthSessionAsync(
            `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&prompt=consent`,
            REDIRECT_URI
        );
        if (result.type === "success") {

            // get back the params from the url
            const params = Linking.parse(result.url);

            const { email, name, picture }: User = params.queryParams;

            //pass in all the user data in an object...
            const user = {
                email,
                name,
                picture,
            }

            return user;

        }
}