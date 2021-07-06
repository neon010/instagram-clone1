import {useState} from "react";
import {useHistory} from "react-router-dom"

export const AddPost = () =>{
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [files, setFile] = useState([]);

    const postToDB = async (url = '', data = {}) =>{
        const res = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        return res.json();
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const data = new FormData();
        data.append("upload_preset", "instagram-clone");

        const uploadUrl = await Promise.all(Array.from(files).map(async file => {
            if(file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg"){
                data.append("file", file);
                const res = await fetch("https://api.cloudinary.com/v1_1/mycloud213/image/upload", {
                            method: "POST",
                            body: data
                });
                const resJson = await res.json();
                return {type: "image", url: resJson.url}
            }else if(file.type === "video/mp4"){
                data.append("file", file);
                const res = await fetch("https://api.cloudinary.com/v1_1/mycloud213/video/upload", {
                    method: "POST",
                    body: data
                });
                const resJson = await res.json();
                return {type: "video", url: resJson.url}
            }
        }))
        console.log(uploadUrl);
        const postData = {caption:title, url:uploadUrl};
        console.log(postData)
        try{
            const res = await postToDB("/make-post", postData);
            console.log(res);
            if(res.status === "success"){
                history.push("/");
            }else{
                throw new Error(res.message);
            }
        }catch(err){
            console.log(err.response);
        } 

    }

    return (
        <div className="add-post" >
            <div style={{display: 'flex', justifyContent:"center", alignItems: 'center'}}>
                <h3>Make a new post</h3>
            </div>
            <form className="add-post-form" onSubmit={handleSubmit}>
                <input 
                required
                type="text" 
                value={title}
                placeholder="Add text to post"
                onChange = {(event) => setTitle(event.target.value)}
                />
                <input 
                required
                type="file" 
                accept="image/png, image/jpeg, video/*, audio/*" multiple
                onChange = {(event) => setFile(event.target.files)}
                />
                <button type="submit">upload</button>
            </form>
        </div>
    )
}