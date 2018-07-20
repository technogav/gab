export class User {
    constructor(
        public name:string,
        public surname: string,
        public dob: string,
        public dateJoined: string,
        public myDeals: Array<any>,
        public favorites: Array<any>,
        public reviews: Array<any>,
        public email:string,
        public phone:number,
        public areaName: string,
        public top5: Array<any>,
        public last5: Array<any>,
        public settingsPref: Array<any>
    ){}
}

