import { User, UserManagerSettings, UserManager} from 'oidc-client';

class UserService {
    private settings: UserManagerSettings;
    private manager: UserManager;
    constructor() {
        this.settings = {
            authority: "https://userserver.azurewebsites.net",
            client_id: "cultiva.web",
            redirect_uri: "http://localhost:4200/callback.html",
            response_type: "id_token token",
            scope: "openid profile cultiva us.additional",
            post_logout_redirect_uri: "http://localhost:4200/index.html",
          };

          this.manager = new UserManager(this.settings);
    }

    public isLoggedIn(): Promise<boolean> {
        return this.manager.getUser()
          .then(user => user != null);
      }
    
      public signinRedirect(): Promise<any> {
        return this.manager.signinRedirect();
      }
    
      public getToken(): Promise<string|null> {
        return this.manager.getUser()
          .then(user => user != null ? user.access_token : null);
      }
    
      public getUser(): Promise<User> {
        return this.manager.getUser();
      }
    
      public logout() : Promise<any> {
        return this.manager.signoutRedirect();
      }
}

export const userService = new UserService();