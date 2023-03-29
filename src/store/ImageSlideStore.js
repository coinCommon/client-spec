import {makeAutoObservable} from "mobx";

export default class ImageSlideStore {
    constructor() {
        this._slides = []
        makeAutoObservable(this)
    }

    setImgSlide(slides) {
        this._slides = slides.map(i => ({image: process.env.REACT_APP_API_URL + i}))
    }

    get slides() {
        return this._slides
    }
}