import React,{ useState }  from "react";
import {uploadeProfile} from '../store/actions/image'
import { useDispatch } from "react-redux";



const UploadProfile = ({uploadClicked,setUploadClicked}) => {

    const [image, setImage] = useState(null);
    const userId = window.localStorage.getItem("currentUserId")
    const dispatch = useDispatch()
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("userId",userId)
        data.append("file", image)
    await dispatch(uploadeProfile(data))
        // console.log(data)
        setUploadClicked(false)
        
    }



    return (
<div className="uploadingPictureDivContainer">
    <h3> Upload Your picture</h3>
    <form
    onSubmit={handleSubmit}
    >
    <input
    type="file"
    placeholder="upload an image for your profile"
    required
    onChange={(e)=>setImage(e.target.files[0])}
    >
    </input>

      <button
        type="submit"
    >Submit</button>

    <button
    onClick={()=>setUploadClicked(!uploadClicked)}
    >Cancel</button>

  
     </form>
</div>

    )
}


export default UploadProfile