import {useState, useEffect} from "react"

export const AddPost = () =>{
    const [title, setTitle] = useState("");
    const [files, setFile] = useState([]);

    const handleSubmit = () =>{
        
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