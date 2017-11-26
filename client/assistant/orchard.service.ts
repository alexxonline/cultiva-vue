import { BaseService } from '../core/base.service';
import { Orchard } from './orchard';
import { AxiosResponse } from 'axios';


class OrchardService extends BaseService {
    private url = "/orchards";

    list() {
        return this.getAxios().then(axiosInstance =>
            axiosInstance.get<Orchard[]>(this.url)
        ).then(response => response.data);
    }

    get(id: Number) {
        return this.getAxios().then(axiosInstance =>
            axiosInstance.get<Orchard>(this.url + "/" + id)
        ).then(response => response.data);
    }

    add(orchard: Orchard) {
        return this.getAxios().then(axiosInstance =>
            axiosInstance.post(this.url, orchard)
                .then(response => response.data)
        );
    }

    update(orchard: Orchard) {
        return this.getAxios().then(axiosInstance =>
            axiosInstance.put(this.url, orchard)
                .then(response => response.data)
        );
    }
}

export const orchardService = new OrchardService();