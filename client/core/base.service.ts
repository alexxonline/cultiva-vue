import axios from 'axios';
import { AxiosInstance } from 'axios';
import { userService } from '../core/user.service';
import { Config } from '../config';

export abstract class BaseService {
    getAxios():Promise<AxiosInstance> {
        return userService.getToken().then(token => axios.create({
            baseURL: Config.apiRoot,
            headers: {"Authorization": "Bearer " + token}
        }));
    }
}