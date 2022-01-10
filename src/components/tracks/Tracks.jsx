import React, { useContext } from "react";
import Spinner from "../layout/Spinner";
import {Context} from "../../Context";
import Track from "./Track";

const heading1 = {
    textAlign:'center',
    marginBottom:'1.2rem'
}
const row = {
    height:"auto",
    display:"flex",
    flexWrap:"wrap",
    alignContent: "center"

}
const Tracks = ()=>{
    const [state] = useContext(Context)
    // console.log("MAin hoon", state);
    const {tracklist, heading} = state;
    if(tracklist==null){
      return(<Spinner />);
    }
    if (tracklist === undefined || tracklist.length === 0) {
      return(<Spinner />);
    }else{
      return(
        <>
        <h3 style = {heading1}>{heading}</h3>
        <div style = {row}>
          {tracklist.map((item)=>{
              return(  
            <Track key={item.track.track_id} track={item.track} />
              );
          })}
        </div>
          </>
       );
    }
}
export default Tracks;