interface Resident{
    fullName: String,
    phoneNumber: String,
    email: String,
}


export default function ResidentComponent(residentList: any){
    //console.log('residentList is ', residentList.residentList)
    var element:any = [];
    for (let resident of residentList.residentList){
        element.push(<div key={resident.fullName}>
                <div>Name: {resident.fullName}</div>
                <div>Phone: {resident.phoneNumber}</div>
                <div>email: {resident.email}</div>
            </div>);
    }
    //console.log('element is ', element)
    return (<div>{element}</div>);
}