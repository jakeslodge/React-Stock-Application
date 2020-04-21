
import React from "react";

import{Form,Button, Alert} from "react-bootstrap";

export class LoginPage extends React.Component{


    constructor(props){
        super(props)
    }

    state={error:"",email:"",password:"",redirect:false}

    render(){

        if(this.state.redirect == false)
        {
        return(
        

                                        <div>
                                        <h1>login page wip</h1>
                                        
                                        <button onClick={()=>{this.props.emailSet("ayylmao")}}></button>
                                        
                            <Form onSubmit={(event)=>{event.preventDefault();console.log(this.state.email);

                            //lets do  the post request
                            const res = fetch("http://131.181.190.87:3000/user/login", {
                                method:'POST',
                                body: JSON.stringify({
                                    email:this.state.email,
                                    password:this.state.password
                                }),
                                headers:{
                                    "Content-type":"application/json; charset=UTF-8"
                                }
                                })
                                
                                .then((res)=>{
                                    console.log(res);
                                    if(!res.ok)
                                    {
                                        this.setState({error:"Error: Incorrect account details"});
                                    }
                                    if(res.ok){
                                        this.setState({redirect:true});
                                    }
                                    
                                });


                            }}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                
                                <Form.Control type="email" placeholder="Enter email" onChange={(event) => {
                            this.setState({email:event.target.value});
                            }}
                            />
                                <Form.Text className="text-muted">
                                {this.state.error}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(event) => {
                            this.setState({password:event.target.value});
                            }}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            </Form>
                            </div>
            
            );
            }                   
            //case 2
            if(this.state.redirect)
            {
                return(<div><h1>loggedin taking you elsewhere</h1></div>);
            }      

 
    }

}