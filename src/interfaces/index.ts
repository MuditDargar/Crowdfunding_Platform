interface CampaignType{
    _id:  string ;
    name: string;
    organizer: string;
    collectAmount: number;
    description: string;
    images:string[] ;
    TargetAmount: number;
    StartDate: string;
    EndDate: string;
    createdby:Usertype ;
}

interface Usertype{
    _id: string;
    userName: string;
    email: string;
    profilePic:string ;
    isActvie: boolean;
    isAdmin: boolean;
    clerkUserid : string ;
}


interface DonationType{
    _id: string;
    amount: number;
    paymentId: string;
    camaign:CampaignType ;
    user: Usertype ;
    message: string;
}