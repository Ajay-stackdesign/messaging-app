import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "./firebase";
import { useAuth } from "./context/AuthContext";
import axios from 'axios';
import "./Chats.css"
// import { async } from "@firebase/util";

function Chats(){
    const history = useHistory();

    const { user } = useAuth();
    const[loading,setLoading] = useState(true)

    const handleLogout = async () => {
        await auth.signOut();
        
        history.push("/");
    }
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg",{ type: "image/jpeg" })
    }

    useEffect(() => {
        if(!user) {
            history.push('/')
            return;
        }
        axios.get("https://api.chatengine.io/users/me",{
            headers: {
                "project-id":"1454c990-0af1-4d71-8c6c-5673793e5094",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append("email",user.email)
            formdata.append("username", user.dispalyName)
            formdata.append("secret", user.uid);
            
            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append("avatar",avatar,avatar.name)

                    axios.post("https://api.chatengine.io/users/",
                        formdata,
                        { headers: { "private-keys": "7cdb7136-e285-46c6-9d1e-19641c4912c4"  } }
                    )
                    .then(() => setLoading(false))    
                    .catch((error) => console.log(error))
                })
        })
    },[user, history])

    // if(!user || loading) return "Loading..."

    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    chat !
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    logout
                </div>
            </div>
            <ChatEngine 
                height="calc(100vh-66px)"
                projectID="1454c990-0af1-4d71-8c6c-5673793e5094"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats