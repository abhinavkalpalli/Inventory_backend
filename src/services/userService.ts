import userRepository from "../repositories/userRepository";
import { IuserService } from "./interfaces/IuserService";


export default class userService implements IuserService{
    private _userRepository :userRepository

    constructor(){
        this._userRepository=new userRepository()
    }
}