import {makeAutoObservable} from "mobx";


export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []

        this._recommendedDevice = []


        this._selectedType = {
        }
        this._selectedBrand = {
        }
        this._page = ''
        this._totalCount = 0
        this._limit = 12

        makeAutoObservable(this)
    }



    setRecommendedDevice(recommended) {
        this._recommendedDevice = recommended
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }


    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._count = count
    }
    setLimit(limit) {
        this._limit = limit
    }




    get recommendedDevice() {
        return this._recommendedDevice
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

}