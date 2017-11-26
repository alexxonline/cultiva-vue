import axios from 'axios';


export class LocationService {
    private baseGoogleUrl = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";    

    getLocation() {
        var promise = new Promise<Position>((resolve, reject)=> {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => resolve(position));
            }
            else {
                reject("No se pudo obtener la posición");
            }
        });
        return promise;
    }

    translateLocation(latitude: number, longitude: number):Promise<string> {
        var url = `${this.baseGoogleUrl}${latitude},${longitude}&sensor=true`;
        return axios.get(url)
            .then(response => {
                var content = response.data;
                var result = content.results[0].address_components[2];
                return result.long_name;
            })
            .catch(error => this.handleError(error));
    }

    private handleError(error:any) {
        return Promise.reject(error.message || error);
    }
}

export const locationService = new LocationService();