import { managerMessage } from './managerMessage';
import { siteSetting } from './siteSetting';
import { order } from './order';
import { supervisor } from './supervisor';

export class admin{

    // variables
    NationalID:string;


    //getterAnSetter
    getNationalID(){

    }

    setNationalID(NationalID:string){

    }

    //methods
    manageApplicationSetting(ST:siteSetting){

    }

    orders_statistics(O:order){

    }

    add_supervisor(S:supervisor){

    }
    edit_supervisor(S:supervisor){

    }

    delete_supervisor(S:supervisor){

    }

    sendMessage(MM:managerMessage,data:[]){

    }

    recieveMessage(MM:managerMessage){

    }

    show_Bi_Report_overAll(){

    }
    show_Specific_Bi_Report(data:[]){

    }


}