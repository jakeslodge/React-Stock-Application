import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {OpenGraph} from './OpenGraph';
import {Line} from 'react-chartjs-2'

export class QuoteRender extends React.Component{

  constructor(props){
    super(props);
    this.state={currentSymbol:this.props.symbolGiven,startDate:this.props.startGiven,endDate:this.props.endGiven,loading:true,foundData:false,quoteData:[]}
  }



  async componentWillReceiveProps(props){
    this.setState({loading:true});



    const start = encodeURIComponent(props.startGiven.toISOString())
    const end = encodeURIComponent(props.endGiven.toISOString())

    console.log("~~~~~~~")
    console.log(start);
    console.log(end)


    this.setState({startDate:props.startGiven});
    this.setState({endDate:props.endGiven});

    const url = `http://131.181.190.87:3000/stocks/authed/${props.currentSymbol}?from=${start}&to=${end}`;
    console.log(url);


    const responce = await fetch(url,{
      headers:{
        Authorization: "Bearer " + this.props.token,
      },})
    
    if(responce.status==200){
        const data = await responce.json();
        console.log(data);
        this.setState({foundData:true,quoteData:data,loading:false})
        this.state.quoteData = data;
    }
    else
    {
        this.setState({foundData:false,loading:false});
    }
      

      
    
  }




  render(){

    if(this.state.loading){
        return(<div><p>loading request</p></div>);
    }
    else if((!this.state.loading)&&(!this.state.foundData)){
        return(
        

                    <div ><h1>No Data Found</h1></div>
          
  
        
        
        
        );

    }
    else if((!this.state.loading)&&(this.state.foundData)) //yay we got some data lets make it look good
    {

//chart the data, start with the opening price 
        const ChartData=this.state.quoteData;

        const openMaps = ChartData.map(x => x.open);
        const labelMaps = ChartData.map(x=>x.timestamp.slice(0,10));

        openMaps.reverse();
        labelMaps.reverse();
        

        console.log(openMaps);
        console.log(labelMaps);


        const openCrap = {
            labels:labelMaps,
            datasets:[
                {
                label: 'Open Graph',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data:openMaps
                }
            ]
        }
    
    return(

        <div>hi

        <OpenGraph data={openCrap}/>
        <Line data={openCrap}width={150}height={100}options={{ maintainAspectRatio: false }}/>
        </div>
        
        
        );
    
    }
  
}
}

export class QuoteSearch extends React.Component{




    state={loading:false,startDate:new Date(),endDate:new Date(),searchTerm:"",quoteData:[]};
 
    async componentDidMount(props)
{
    this.setState({searchTerm:"AAL"});



    
}

    handleChange = date => {
      console.log(encodeURIComponent(date.toISOString()))
      this.setState({
        startDate: date
      });
    };

    handleChange1 = date => {
      console.log(encodeURIComponent(date.toISOString()))
      this.setState({
        endDate: date
      });
    };




render(){
return(
<div>
  <p>bulding search key:{this.props.authToken}</p>

  {this.state.startDate.toISOString()}
<DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
<DatePicker
        selected={this.state.endDate}
        onChange={this.handleChange1}
      />

        <label htmlFor="name">Stock Symbol&nbsp;</label>
        <input type="text" id="name" name="name" value={this.state.searchTerm} onChange={(event) => {

            const x = event.target.value.trim().toUpperCase().slice(0,5);
            console.log(x);
            
            if(/[0-9]/.test(x)){
                this.setState({error:"no numbers"});
            }else{
                this.setState({error:null});
            }
            this.setState({searchTerm:x});


        }} />

        <QuoteRender currentSymbol={this.state.searchTerm}startGiven={this.state.startDate}endGiven={this.state.endDate} token={this.props.authToken}></QuoteRender>
</div>




);
}

}
