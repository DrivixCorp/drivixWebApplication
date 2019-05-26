import { offer } from './offer';
import { comment } from './comment';
import { estimate } from './estimate';

export class carService{
    URL:string;
    offers:offer[];
    comment:comment[];
    Estimate:estimate[];
     
    // getter and setter

    setURL(){}

    getURL(){}

    setOffer(){}

    getOffer(){}

    setComment(){}

    getComment(){}

    setEstimate(){}

    getEstimate(){}

    // methods

    makeOffer(O:offer){}

    UpdateOffer(O:offer){}

    deleteOffer(O:offer){}

    DisplayOffer(O:offer){}

    AddComment(user_id:string){}

    EditComment(data:[]){}

    DeleteComment(user_id:string){}

    Like_DisLike_Comment(user_id:string){}

    showAllComments(user_id:string){}

    EstimateCarService(user_id:string){}
}