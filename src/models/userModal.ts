export class User {
    constructor(
        public name:string,
        public email:string,
        public phone:number,
        public area: string,
        public top5: Array<any>,
        public last5: Array<any>,
        public dealsAquired: {},
        public settingsPref: Array<any>
    ){}
}