import userService from "../services/userService";
import { IuserController } from "./interfaces/IuserController";

export default class userController implements IuserController{
    private _userService =new userService
    constructor(){
        this._userService=new userService()
    }
}