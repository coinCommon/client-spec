import {makeAutoObservable} from "mobx";


export default class NewsAndServicesStore {
    constructor() {
        this._news = []
        this._service = []

        this._slide = []
        this._popular = []

        this._selectedNews = {
        }
        this._selectedServices = {
        }

        makeAutoObservable(this)
    }



    setNews(news) {
        this._news = news
    }
    setServices(service) {
        this._service = service
    }
    setSlide(slide) {
        this._slide = slide
    }
    setPopular (popular) {
        this._popular = popular
    }



    get getNews() {
        return this._news
    }
    get service() {
        return this._service
    }
    get getSlide() {
        return this._slide
    }
    get getPopular() {
        return this._popular
    }

}