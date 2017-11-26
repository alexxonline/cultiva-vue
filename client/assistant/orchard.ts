import { Orientation } from './orientation';
import { OrchardType } from './orchard-type';
import { InsideOutside } from './inside-outside';

export class Orchard {
    constructor() {
        this.orientation = Orientation.Horizontal;
        this.strayAnimals = false;
        this.orchardType = OrchardType.Suelo;
        this.insideOutside = InsideOutside.Inside;
        this.location = "";
    }
    public orchardId: number|null;
    public name: string;
    public location: string;
    public orientation: Orientation;
    public strayAnimals: boolean;
    public orchardType: OrchardType;
    
    public insideOutside: InsideOutside;
    
    public latitude: number;
    public longitude: number;
    public isUsingGps : boolean;

    public clear() {
        this.orchardId = null;
        this.name = "";
        this.location = "";
        this.orientation = Orientation.Horizontal;
        this.strayAnimals = false;
        this.orchardType = OrchardType.Suelo;
        this.insideOutside = InsideOutside.Inside;
    }
}