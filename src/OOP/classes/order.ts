import { winchDriver } from './winchDriver';

export class order{
    ID:string;
    winchDriverID:string;
    user_id:string;
    time:string;

    //getter and setter

    getWinchDriverID(){}
    setWinchDriverID(){}

    getuser_id(){}
    setuser_id(){}

    getTime(){}
    setTime(){}

    //methods

    placeOrder(WD:winchDriver){}
    cancelOrder(){}
    showOrderHistoryDriver(DriverID:string,WD:winchDriver){}
    view_winch_order_user(user_id:string,WD:winchDriver){}

}