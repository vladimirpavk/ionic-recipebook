import { Ingridient } from "../models/ingridient";

export class ShoppingListService{
    private ingridientsToBuy:Ingridient[] = [];

    public getIngridientsToBuy():Ingridient[] {
        return this.ingridientsToBuy.slice();
    }

    public pushIngridient(ingridient:Ingridient):void{
        //if ingridient already exists amount substract
        let element:Ingridient = this.ingridientsToBuy.find(
            (data:Ingridient)=>{
                if(data.name==ingridient.name) return true;
                else return false;
            }
        );

        let ingridientIndex=this.ingridientsToBuy.indexOf(element);      

       if(ingridientIndex!=-1){
            this.ingridientsToBuy[ingridientIndex].amount+=Number(ingridient.amount);
        }
        else
        {
            this.ingridientsToBuy.push(ingridient);
        }
    }

    public pullIngridient(ingridient:Ingridient):void{
        this.ingridientsToBuy.splice(this.ingridientsToBuy.indexOf(ingridient), 1);
    }
}