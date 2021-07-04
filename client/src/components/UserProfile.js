import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

export const UserProfile = () =>{
    const {id} = useParams();
    const [profile, setProfile] = useState({});

    useEffect(() =>{
        getProfile(id);
    }, [id]);

    const getProfile = async (id) =>{
        const url = `/uset-details/${id}`
        const res = await fetch(url);
        const resJson = await res.json();
        // setProfile(resJson.data);
    }
    console.log(id);
    console.log(profile);
    return (
        <div>{id}</div>
    )
}