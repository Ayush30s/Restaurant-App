import Userclass from "./UserClass";
import { Component } from "react";

class About extends Component {
   constructor(props) {
      super(props);
      console.log("parent constructor called");
   } 

   componentDidMount() {
      console.log("parent componentdidMount");
   }

   render() {
      console.log("parent render");
      return (
         <div className="user_class_card">
            <h1>About Class Component</h1>
            <div>This is namaste react course</div>

            {/* if we have mutliple child class components to render then the component did mount function of each child class based
            component are called in order the child components are called in the parent class, it means 1st  component
            did mount of Ayush srivastav(class) is called then Rohit srivastav(class) and at last Arush srivastav(class) this is
            an optimization by react in which the render phase of both childs happen together and the commit phase happens together*/}
            <Userclass name={"Ayush srivastav(class)"} location={"Basti"}/>
         </div>
      ) 
   }
}

export default About;

/*
   - parent constructor
   - parent render

      - first child constructor
      - first child render

      - second child constructor 
      - second chlid render

      after this render phase diff is calcuated in virtual dom and if diff is found then the reconcillitaion
      is done and the commit phase(API calls) is done for all the child class component at once

      DOM UPDATED - INT SINGLE BATCH
      - first child component did mount
      - second child component did mount

   - parent component did mount

*/