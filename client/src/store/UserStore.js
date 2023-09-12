import { makeAutoObservable } from 'mobx';

export class UserStore {
	constructor() {
		this._isAuth = false;
		this._user = {};

		makeAutoObservable(this);
	}

	setIsAuth(val) {
		this._isAuth = val;
	}

	setUser(user) {
		this._user = user;
	}

	get isAuth() {
		return this._isAuth;
	}

	get user() {
		return this._user;
	}
}