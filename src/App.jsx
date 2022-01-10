import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Index from "./components/layout/Index"
import Nav from "./components/layout/Nav"
import {ContextHandler} from "./Context";
import Lyrics from './components/tracks/Lyrics'


const App = () => {
  return (
    <ContextHandler>
    <BrowserRouter>
      <>
      <Nav />
        <Switch>
        <Route exact path="/" component={Index}></Route>
        <Route exact path="/lyrics/track/:id" component={Lyrics} ></Route>
        <Route path="*" component={Index} />
        </Switch>
      </>
    </BrowserRouter>
    </ContextHandler>
  );
}
export default App