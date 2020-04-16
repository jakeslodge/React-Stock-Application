
import React from "react";

export class LoginPage extends React.Component{


    constructor(props){
        super(props)
    }

    render(){
        return(
        

            <div>
            <h1>login page wip</h1>
            
            <button onClick={()=>{this.props.emailSet("ayylmao")}}></button>
            
            </div>
            
            );


        
    }

}