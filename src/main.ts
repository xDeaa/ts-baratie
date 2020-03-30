import chalk from 'chalk';
import Reception from './Reception';

if (process.argv.length < 5) {
    console.log(chalk.red.bold("Sorry you must enter 3 argument [COOKING TIME] [COOKERS] [STOCK TIME]"));
} else {
    console.log(chalk.cyan.bold(`Welcome to the Baratie Restaurant`));
    const reception = Reception.getInstance()    
    reception.open()
}
