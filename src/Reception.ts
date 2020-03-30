import chalk from 'chalk';
import readline from 'readline';
import { dishesList } from './kitchen/dishes';
import KitchenFactory from './kitchen/KitchenFactory';

const [, , timeCooking, cookers, timeStock] = process.argv;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export default class Reception {
    public static instance: Reception | null = null;
    private orderSend: boolean = false


    public static getInstance() {
        if (Reception.instance === null) {
            Reception.instance = new Reception()
        }

        return Reception.instance
    }

    public open() {
        console.log(chalk.green.bold(`Here is the menu of today: ${Object.values(dishesList)}`));
        console.log(chalk.green(`Your order must be like that [DISH] [SIZE] x[NUMBER];`));

        rl.question('What is your Order ?! ', (order: string) => {        
            if(order.split(" ").length != 3) {
                console.log(chalk.red.bold(`Please enter [DISH] [SIZE] x[NUMBER];`));
            } else {
                const [dish, size, quantity] = order.split(" ");
                if(dish.match(/[a-zA-Z]*/i) && quantity.match(/^x[0-9]$/i)) {
                    console.log("oui");
                }
            }

             rl.close();
        });
    }
}