import {makeAutoObservable} from "mobx";


export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._user = []
        this._userID = 0
        this._name = ''
        this._email = 'email'
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setIsAdmin(bool) {
        this._isAdmin = bool
    }
    setUser(user) {
        this._user = user
    }
    setUserID(userID) {
        this._userID = userID
    }
    setName(name) {
        this._name = name
    }
    setEmail(email) {
        this._email = email
    }

    get isAuth() {
        return this._isAuth
    }
    get isAdmin() {
        return this._isAdmin
    }
    get user() {
        return this._user
    }
    get userID() {
        return this._userID
    }
    get name() {
        return this._name
    }
    get email() {
        return this._email
    }
}