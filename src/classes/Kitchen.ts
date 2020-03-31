import { Worker, isMainThread } from "worker_threads"
import chalk from 'chalk';

import { IngredientStock, Dish } from "../interface";
import Cooker from "./Cooker"
import { ingredient, IngredientTakoyaki, ingredientMatchaCookie, IngredientRamen, IngredientUdon, IngredientKatsudon } from "../enum/ingredients";

export default class Kitchen {
    public cookers: Cooker[] = []
    private stock: any
    private timeStocking: number
    public status: string = "Calm"

    constructor(stock: IngredientStock, timeStocking: number) {
        this.stock = stock
        this.timeStocking = timeStocking

        this.addStock()
    }

    // Todo : threads
    public addCooker(cooker: Cooker) {
        this.cookers.push(cooker)
    }

    public prepareOrder(orders: Dish[]) {        
        orders.map(order => {
            if (this.getIngredient(order.name)) {
                const cooker = this.cookers.find(cooker => { return cooker.status === "Availaible" ? cooker : null })
                if (cooker) {
                    return cooker.cook(order.name, order.size)
                }
                this.status = "Overload"
            } else {
                this.getIngredient(order.name)
            }
        })
    }

    private getIngredient(dish: string) {
        switch (dish) {
            case 'takoyaki':
                return this.removeIngredient(IngredientTakoyaki)
            case 'katsudon':
                return this.removeIngredient(IngredientKatsudon)
            case 'udon':
                return this.removeIngredient(IngredientUdon)
            case 'ramen':
                return this.removeIngredient(IngredientRamen)
            case 'matchacookie':
                return this.removeIngredient(ingredientMatchaCookie)
        }
    }

    // Todo : check when not ingredient wait
    private removeIngredient(type: unknown) {
        const ingredientTaken: ingredient[] = []

        Object.values(type).map((ingredient) => {            
            if (this.stock[ingredient] === 0) {
                console.log(chalk.red.bold("Oooops we don't have ingredient for this dish, wait..."));
            } else {
                this.stock[ingredient]--
                ingredientTaken.push(ingredient)
            }
        })
        return ingredientTaken
    }

    private addStock() {
        setInterval(() => {
            Object.keys(ingredient).map(ingredient => {
                this.stock[ingredient] += 1
            })
        }, this.timeStocking)
    }
}