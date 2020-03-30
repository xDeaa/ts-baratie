import cluster from "cluster"
import os from "os"
const numberCPUs = os.cpus().length

export default class KitchenFactory {
    private numberKitchen:  number = 1
    public createKitchen(cookers: string) {
      const kitchen = cluster;
      // if(cluster.isMaster) {
      //   kitchen = cluster.fork({ kitchenId: this.numberKitchen })
        console.log(kitchen);
      //   this.numberKitchen ++
      // } else {
      //     console.log(`[${process.env.kitchenId}] I am the kitchen ${process.pid}`)

      // }

      return kitchen
        // if (cluster.isMaster) {
        //     console.log(`I have ${numberCPUs} CPUs availables`)
            
            
        //     const processesMap = {}
        //     //processesMap[kitchen.id] = this.numberKitchen;

          
        //     // for (let i = 0; i < numberCPUs; i++) {
        //     //   const myId = (i + 1).toString().padStart(2, '0')
          
        //     //   processesMap[kitchen.id] = myId
          
        //     //   kitchen.on('message', (payload) => {
        //     //     console.log(`Message from kitchen -->> ${processesMap[kitchen.id]}`)
        //     //     console.log(`I receive payload: ${JSON.stringify(payload)}`)
          
        //     //     if (payload.status === 'OVERLOAD') {
        //     //       //factory.createKitchen()
        //     //     }
        //     //   })
          
        //     // }
        //   } else {
        //      console.log(`[${process.env.kitchenId}] I am the kitchen ${process.pid}`)
        //     // if (process.env.kitchenId === '01') {
        //     //   setInterval(() => {
        //     //     process.send({ status: 'OVERLOAD' })
        //     //   }, 2000)
        //     // }
        //   }
       // const kitchen = cluster.fork({id: this.numberKitchen})
    }
}