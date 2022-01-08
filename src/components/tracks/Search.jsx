import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import {Context} from "../../Context"
import alanBtn from "@alan-ai/alan-sdk-web";

const Search = ()=>{
const [state, newState] = useContext(Context);
const [text, newText] = useState("");
const [submitText, newSubmitText] = useState("");
const mlr = {
  margin:"0px 1rem"
}

const [alanInstance, setAlanInstance] = useState();
useEffect(() => {
  if (alanInstance != null) return;
  setAlanInstance(
    alanBtn({
      bottom: "2vh",
      right: "1vw",
      key: "50c8e7121d7b9b5d8cd1f7d71e60ce922e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, speaktrack_list }) => {
        // console.log("Karan", command);
        // console.log("akslakkkkkkkkkkkkkkkkkkkkkkkkssssssssssssssssssssssssssssssssssssssssssssss")
        // getData(command);
        console.log(command);

        if(command=="Addplaylist"){
          newState({tracklist:speaktrack_list, heading:"Search Results"});
        }
      },
    })
  );
}, [alanInstance]);

useEffect(()=>{
    axios.get(
        `https://cors-access-allow.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${submitText}&page_size=10&page=1&s_track_rating=desc&apikey=073358cbad4539413d607560a16aa80b`
      )
      .then(res => {
        let track_list = res.data.message.body.track_list;
        newState({ tracklist: track_list, heading: "Search Results" });
      })
      .catch(err => console.log(err));
}
, [submitText])

const findTrack = (event)=>{
   event.preventDefault();
   newSubmitText(text);
}
const onChange = (event)=>{
    newText(event.target.value);
}

    return (
        <div className="card card-body mb-4 p-4" style={mlr}>
          <h1 className="display-4 text-center">
            <i className="fas fa-music" /> Search For A Song
          </h1>
          <p className="lead text-center">Get the lyrics for any song</p>
          <form onSubmit={findTrack}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Song title..."
                name="userInput"
                value={text}
                onChange={onChange}
              />
            </div>
            <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
              Get Track Lyrics
            </button>
          </form>
        </div>
      );
    }

    export default Search;