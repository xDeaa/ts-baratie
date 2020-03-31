import { v4 as uuidv4 } from 'uuid';
import chalk from 'chalk';

import { dishesTime, dishesList } from '../enum/dishes';
import { Dish } from "../interface";


export default class Cooker {
    public readonly id: string = uuidv4()
    public status: string = "Availaible"
    private timeCooking: number

    constructor(timeCooking: number) {
        this.timeCooking = timeCooking
    }

    public cook(dish: string, size: string) {
        this.status = "Occuped"
        console.log(chalk.yellow.bold(`Cooker ${this.id} is preparing ${dish} ${size}`));

        this.prepareDish(dish, size)
    }

    // Todo :  timeBaked * size
    private prepareDish(dish: string, size: string) {
        const timeRecipe = this.getTimeRecipe(dish) 
        setTimeout(() => {   
            console.log(chalk.green.bold(`Cooker ${this.id} as prepared ${dish} ${size}`));
            
        }, (timeRecipe * this.timeCooking))

        this.status = "Availaible"
    }

    private getTimeRecipe(dish: string) {
        switch (dish) {
            case "takoyaki":
                return dishesTime.takoyaki
            case 'katsudon':
                return dishesTime.katsudon
            case 'udon':
                return dishesTime.udon
            case 'ramen':
                return dishesTime.ramen
            case 'matchacookie':
                return dishesTime.matchacookie
        }
    }
}