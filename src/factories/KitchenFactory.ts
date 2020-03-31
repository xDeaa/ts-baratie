import cluster from "cluster"

import { IngredientStock } from '../interface'
import Kitchen from "../classes/Kitchen"
import Cooker from "../classes/Cooker"

export default class KitchenFactory {
  private stockKitchen: IngredientStock = {
    octopus: 5,
    soja: 5,
    rice: 5,
    pork: 5,
    eggs: 5,
    noodles: 5,
    chicken: 5,
    dought: 5,
    matcha: 5,
    chocolate: 5,
    love: 5,
  }

  public create(cookers: number, timeStocking: number, timeCooking: number) {
    const kitchen = new Kitchen(this.stockKitchen, timeStocking)

    for (let i = 0; i < cookers; i++) {
      kitchen.addCooker(new Cooker(timeCooking))
    }
        
    return kitchen;
  }
}