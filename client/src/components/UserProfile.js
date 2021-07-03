import {useParams} from "react-router-dom";

export const UserProfile = () =>{
    const {id} = useParams();
    console.log(id)
    return (
        <div>{id}</div>
    )
}