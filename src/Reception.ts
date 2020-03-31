import chalk from 'chalk';
import cluster from "cluster"
import readline from 'readline';

import { dishesList, dishesSizeList } from './enum/dishes';
import { Dish } from "./interface";
import KitchenFactory from './factories/KitchenFactory';
import Kitchen from './Kitchen';

const [, , timeCooking, cookers, timeStocking] = process.argv;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export default class Reception {
    public static instance: Reception | null = null
    private numberKitchen: number = 1
    private kitchens: Kitchen[] = []


    public static getInstance() {
        if (Reception.instance === null) {
            Reception.instance = new Reception()
        }

        return Reception.instance
    }

    public open() {
        this.addKitchen()
        console.log(chalk.green.bold(`Here is the menu of today: ${Object.values(dishesList)}`));
        console.log(chalk.green(`Your order must be like that [DISH] [SIZE] x[NUMBER];`));
        this.askOrder()

        rl.on("line", () => {
            this.askOrder()
        })
    }


    private askOrder() {
        rl.question('What is your Order ?! ', (order: string) => {
            if (!this.checkOrderValid(order)) {
                rl.emit("line")
            } else {
                console.log(chalk.green(`Your order was send to the kitchen`));
                const orders = this.treatmentOrder(order)
                this.sendOrder(orders)
                rl.close()
            }
        });
    }


    // Todo : cluster
    private addKitchen() {
        const factoryKitchen = new KitchenFactory()
        const kitchen = factoryKitchen.create(parseInt(cookers), parseInt(timeStocking), parseInt(timeCooking))
        this.kitchens.push(kitchen);
        this.numberKitchen++
    }


    // Todo : dispatch when dishes > 2 * cookers 
    private sendOrder(orders: Dish[]) {
        const kitchen: Kitchen | undefined = this.checkKitchenAvailable()        
        if(orders.length > (2 * parseInt(cookers))) {
            console.log(chalk.yellow.bold("Sorry all your kitchen are not available"));
            this.askOrder()
        } else {
            kitchen.prepareOrder(orders)
        }
    }


    private treatmentOrder(orders: string) {
        let ordersComming: Dish[] = []    
        const ordersToSend = orders.split(/;\W+|;/i)

        ordersToSend.map(order => {
            if(order != '') {
                const [dish, size, quantity] = order.split(" ")
                const numberDish = parseInt(quantity.replace('x', ''))
                for(let i=0; i < numberDish; i++) {
                    ordersComming.push({name: dish, size: size.toUpperCase()})
                }
            }
        })

        return ordersComming;
    }


    private checkKitchenAvailable() {
        let kitchenAvalaible: Kitchen
        this.kitchens.map(kitchen => {
            kitchen.status === "Calm" ? kitchenAvalaible = kitchen : this.addKitchen()
        })

        return kitchenAvalaible;
    }


    private checkOrderValid(input: string) {
        if (input != "") {
            if (input.split(" ").length < 3 && input != "") {
                console.log(chalk.red.bold(`Please enter [DISH] [SIZE] x[NUMBER];`));
                return false
            }
            const [dish, size, quantity] = input.split(" ");

            if (this.isDish(dish)) {
                if (this.isSize(size)) {
                    if (quantity.match(/^x\d*;$/i)) {
                        return true
                    }
                    console.log(chalk.red.bold(`The order is invalid`));
                    return false
                }
                console.log(chalk.red.bold(`The size is invalid`));
                return false
            }
            console.log(chalk.red.bold(`The dish is invalid`));
            return false
        }
    }

    private isDish(value: string) {
        return Object.keys(dishesList).includes(value.toLowerCase()) ? true : false
    }

    private isSize(value: string) {
        return Object.keys(dishesSizeList).includes(value.toUpperCase()) ? true : false
    }
}