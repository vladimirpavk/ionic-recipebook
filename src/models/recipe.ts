import { Ingridient } from './ingridient';

export class Recipe{
    constructor(
        public title:string,
        public description:string,
        public difficulty:string,
        public ingridients:Ingridient[]
    ){}
}