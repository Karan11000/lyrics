import React, { createContext, useEffect, useState } from "react"
import axios from "axios";

const Context = createContext();

const ContextHandler = ({children}) =>{
    // console.log(children);
    const initialData = {
        tracklist:[],
        heading:""
    }
    const [state, newState] = useState(initialData);
    const [alanInstance, setAlanInstance] = useState();
    useEffect(()=>{
            axios.get(`https://cors-access-allow.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=073358cbad4539413d607560a16aa80b`)
            .then((res)=>{
                console.log("hello", res.data);
                newState({
                tracklist: res.data.message.body.track_list,
                heading: "Top 10 Tracks"
                });
            }).catch((err) =>{console.log("hey", err);})
        }
    , [])
    console.log(state);
    return(
             <Context.Provider value={[state, newState, alanInstance, setAlanInstance]}>{children}</Context.Provider> 
    );
    
}

export {Context, ContextHandler};