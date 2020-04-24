import React from "react";
import "./loginpage.css";
import{Form,Button, Alert} from "react-bootstrap";
import { useHistory,Redirect } from "react-router-dom";

export class RegisterPage extends React.Component{

    state={error:"",email:"",password:"",redirect:false,validRequest:false}

    render(){

        if(this.state.redirect == false)
        {
        return(
        

                                    
                                  
                                        
                                     
                                        
                            <div className="c1 container">
                                <div className="media border p-3">
                            <Form onSubmit={(event)=>{event.preventDefault();console.log(this.state.email);

                            //lets do  the post request
                            const res = fetch("http://131.181.190.87:3000/user/register", {
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
                                    if(res.status===400){
                                        this.setState({error:<Alert variant='danger'>An email and password are needed!</Alert>});
                                    }else if(res.status===409)
                                    {
                                        this.setState({error:<Alert variant='danger'>That email is already in use</Alert>});
                                    }
                                    else
                                    {
                                        this.setState({validRequest:true});
                                        return res.json();
                                    }
                                })
                                .then((data) => {

                                    if(this.state.validRequest)
                                    {
                                    console.log(data); // got the token set it to redirect

                                    //store the token with our function
                                   // this.props.tokenSet(data.token);

                                    //set that we are logged in
                                   // this.props.loginSet(true);
                                    
                                    //set the logged in email
                                    //this.props.emailSet(this.state.email);

                                    //auto redirect
                            
                                    //this.setState({redirect:true});
                                    }
                                })
                                //.then((res)=>res.json())
                                //.then((data) =>{console.log(data)})    
                                
                                ;


                            }}>
                                
                            <Form.Group controlId="formBasicEmail">
                                <Form.Text><h1>Registration</h1></Form.Text>
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
                            </div>
                            
            
            );
            }                   
            //case 2
            if(this.state.redirect)
            {
                return(
                
                
                <Redirect to="/"></Redirect>
                    
                
                    
                );
            }      

 
    }

}