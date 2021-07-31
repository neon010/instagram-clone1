import Modal from 'react-modal';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateProfilePic,fetchUserRemovePic} from "../../stateManager"



Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0px',
      zIndex: 100,
      boxShadow: '2px -4px 5px 0px rgba(0,0,0,0.75)'

    },
  };

Modal.defaultStyles.overlay.backgroundColor = 'transparent';

export const AddImageModal = ({handleClose, showModal, setShowModal}) =>{

  const [file, setFile] = useState("");

  const dispatch = useDispatch();


  const uploadProfilePic = async () =>{
    console.log(file);
    const data = new FormData();
    data.append("upload_preset", "instagram-clone");
    data.append("file", file[0]);
    const res = await fetch("https://api.cloudinary.com/v1_1/mycloud213/image/upload", {
      method: "POST",
      body: data
    });
    const resJson = await res.json();
    console.log(resJson);
    if(!resJson.error){
      const data = {image: resJson.url}
      dispatch(updateProfilePic(data));
      setShowModal(false);
      window.location.reload();
    }else{
      console.log(resJson.error.message);
    }
  }

    const removeProfilePic = async () =>{
      console.log("removeProfilePic");
        dispatch(fetchUserRemovePic());
        window.location.reload();
        setShowModal(false);
    }

    return (
    <Modal isOpen={showModal}
    onRequestClose={handleClose}
    style={customStyles}
    contentLabel="Add profile image modal">
        <div style={{display: 'flex', flexDirection: 'column', minWidth:"300px", backgroundColor:"#fff"}}>
            <div 
            style={{padding:"13px", color:"#404040", border:"none",backgroundColor:"transparent", borderBottom:"1px solid #DBDBDB", fontSize:"15px"}}>
              <input 
              type="file" 
              id="imageInput"
              accept="image/png, image/jpeg"
              onChange={(event) => setFile(event.target.files)}
              placeholder="Change profile photo" style={{backgroundColor:"transparent", border:"none"}}/>
              <button onClick={uploadProfilePic}>upload</button>
            </div>
            <button  
            onClick = {removeProfilePic}
            style={{padding:"13px", border:"none",backgroundColor:"transparent", color:"#F1737D", borderBottom:"1px solid #DBDBDB", fontSize:"15px"}}>
                Remove Current  Photo
            </button >
            <button 
            onClick={handleClose} 
            style={{padding:"13px", border:"none", backgroundColor:"transparent"}}>
                Cancel
            </button>
        </div>
      </Modal>
    )
}