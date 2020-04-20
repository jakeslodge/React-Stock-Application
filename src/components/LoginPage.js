
import React from "react";

import{Form,Button} from "react-bootstrap";

export class LoginPage extends React.Component{


    constructor(props){
        super(props)
    }

    state={loginFail:false,email:"",password:""}

    render(){
        return(
        

            <div>
            <h1>login page wip</h1>
            
            <button onClick={()=>{this.props.emailSet("ayylmao")}}></button>
            
            


<Form onSubmit={(event)=>{event.preventDefault();console.log(this.state.email)}}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control id="email"type="email" placeholder="Enter email" onChange={(event) => {
this.setState({email:event.target.value});
}}
/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
            
            );


        
    }

}