import React from "react";
import { Component } from "react";
import User from "./User";

/*
when a class is instantiated the constructor() is called 1st and then render().
flow of class component(leife cycle) -> constructor() -> render() -> compnentdidMount()

*/

/* react.component(class provided by react) and userclass is inheriting some properties from it */
class Userclass extends Component {

   /* We can use constructor to get value as props bcoz when a class is instantiated the 
   constructor is called which can be used to recieve props that can be used anywhere in our class */

   /* props is an object of all the (key - value) pairs passed by the user */
   constructor(props) {
      console.log("child constructor called");

      /* Call the constructor of the Component class and pass the props to it */ 
      //ALWAYS USE -> SUPER(PROPS)
      super(props);

      /* this.state (an object) that conatins all the state variable inside it */
      this.state = {
         UserInfo : {name: "default" , avatar_url: "default"}
      }
   }

   /* componentDidMount() is called when the component has mounted successfully.
   componentDidMount() is used too make API calls.
   React firt render the data we have in the render() method and then it fetch data from APIs 
   and fill the data in the HTML we have alreday rendered on the webpage this inhances the UX,
   instead of fetching data and filling the data at the same time. */
   async componentDidMount() { 
      console.log("componentDidMount");
      const data = await fetch("https://api.github.com/users/Ayush30s");
      const json = await data.json(); 
   
      this.setState({
         UserInfo: json,
      });      
   }

   //it is called after once cycle complete (constructor->render->componentDidMount)->componentDidUpdate.
   componentDidUpdate() {
      console.log("component Did update");
   }

   componentWillUnmount() {
      console.log("component will unmount");
   }

   /* render() is a method that just returns a piece of jsx */
   render() {
      console.log("inside Render");
      const {avatar_url , name, location} = this.state.UserInfo;
      return (
         <div className="user-card">
            <img src={avatar_url} alt="avatar"></img>
            <h1>Name: {name}</h1>
            <h2>Location: {location}</h2>
            <h3>Contact: @_ayu_sh_srvastav_</h3>
         </div>
      )
   }
}

export default Userclass;


