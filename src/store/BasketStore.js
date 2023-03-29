import {makeAutoObservable} from "mobx";


export default class BasketStore {
    constructor() {
        this._baskets = []
        this._selectedBasket = {}
        makeAutoObservable(this)
    }

    setBaskets(baskets) {
        this._baskets = baskets
    }
    setSelectedBasket(basket) {
        this._selectedBasket = basket
    }


    get baskets() {
        return this._baskets
    }
    get selectedBasket() {
        return this._selectedBasket
    }

}