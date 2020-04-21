import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export class QuoteSearch extends React.Component{

    state={loading:false,startDate:new Date()}

    handleChange = date => {
        date.setTime()
        console.log(date.toISOString())
        this.setState({
          startDate: date
        });
      };




render(){
return(
<div><p>bulding search key:{this.props.authToken}</p>
<DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />



</div>




);
}

}
