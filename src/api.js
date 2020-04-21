
import React from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import "./stocks.css";
import { Jumbotron } from "react-bootstrap";



export class StockSearchRender extends React.Component{

    constructor(props){
        super(props);
        this.state ={currentSymbol:this.props.toRender,Stockdata:[],loading:true,foundData:false}
    }

    state={currentSymbol:null,Stockdata:[],loading:true,foundData:false,change:"neutral",diffValue:0}

    async componentDidMount()
    {

    }

    async componentWillReceiveProps(props){
        this.setState({loading:true});
        
        const url = `http://131.181.190.87:3000/stocks/${props.toRender}`;
        console.log(url);
        const responce = await fetch(url);

        if(!responce.ok)
        {
            this.setState({loading:false,foundData:false})
        }
        else
        {
            const data = await responce.json();
            console.log(data);
            this.setState({Stockdata:data,loading:false,foundData:true})

            //lets compare and see if the close is up down or neutral
            if(data.close == data.open)//neutral
            {
                this.setState({change:" ",diffValue:0})
            }
            else if(data.close > data.open){
                this.setState({change:"+"})
                var difference = data.close - data.open;
                this.setState({diffValue:difference.toFixed(2)});
            }
            else if(data.close < data.open){
                this.setState({change:"-"})
                var difference = data.open - data.close;
                this.setState({diffValue:difference.toFixed(2)});
            }

        }

        
    }



    render(){


        if(this.state.loading){
            return(<div><p>loading request</p></div>);
        }
        else if((!this.state.loading)&&(!this.state.foundData)){
            return(
            
              <div class="container-fluid"> 
              <div class="row">
                <div class="card">
                        <div card-header><h1>No Data Found</h1></div>
              
                </div>
              </div>
              </div>
            
            
            
            );

        }
        else if((!this.state.loading)&&(this.state.foundData)) //yay we got some data lets make it look good
        {
        return(


        //lets make this shit look good
        <div>

  
<div class="container-fluid"> 
<div class="row">
  <div class="card">
          <div card-header><h1>{this.state.Stockdata.name}</h1><h2>{this.state.Stockdata.timestamp.slice(0,10)}</h2></div>

  </div>
</div>
</div>

<div class="container-fluid">  
<div class="row">
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">lock_open</i>
                  </div>
                  <p class="card-category">Open</p>
                  <h3 class="card-title">${this.state.Stockdata.open}
                    <small></small>
                  </h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons text-warning">warning</i>
                    <a href="#pablo" class="warning-link">Get More Space...</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-success card-header-icon">
                  <div class="m1">
                  <div class="card-icon">
                    <i class="material-icons">trending_up</i>
                  </div>
                  </div>
                  <p class="card-category">High</p>
                  <h3 class="card-title">${this.state.Stockdata.high}</h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">date_range</i> Last 24 Hours
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-danger card-header-icon">
                  <div class="m2">
                  <div class="card-icon">
                    <i class="material-icons">trending_down</i>
                  </div>
                  </div>
                  <p class="card-category">Low</p>
                  <h3 class="card-title">${this.state.Stockdata.low}</h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">local_offer</i> Tracked from Github
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-info card-header-icon">
                  <div class="m3">
                  <div class="card-icon">
                    <i class="fa fa-lock"></i>
                  </div>
                  </div>
                  <p class="card-category">Close</p>
                  <h3 class="card-title">${this.state.Stockdata.close} ({this.state.change}{this.state.diffValue})</h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">update</i> Just Updated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




            <p>found data {this.state.Stockdata.name}</p>
            <p>{this.state.Stockdata.symbol}</p>
            <p>{this.state.Stockdata.timestamp}</p>
            <p>open: {this.state.Stockdata.open}</p>
            <p>high: {this.state.Stockdata.high}</p>
            <p>low: {this.state.Stockdata.low}</p>
        <p>close: {this.state.Stockdata.close} ~ {this.state.change}</p>
            <p>volume: {this.state.Stockdata.volumes}</p>
            
            
            </div>);




            //end of the content
        }
        else{
            return(<div><p>shits broke</p></div>)
        }



    }

}



export class StockSearch extends React.Component{


    state = {
        searchTerm: "AA",
        error:null,
        loading:true,
        url:""
    };

    componentDidMount()
    {
      this.setState({searchTerm:"AAL"});
    }

//<input type="text" id="name" name="name" value={this.state.searchTerm} onChange={(event) => {this.setState({searchTerm:event.target.value});}} />

    render(){
        return(
            <div class="container-fluid">

          <Jumbotron>
      
          <h1><span id="wrap">Lookup.. {this.state.searchTerm}</span></h1>

          <p>Search through our stock database to get the most recent snapshot.</p>
          



        
        <form>
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

        </form>
        </Jumbotron>

        {this.state.error != null ? <p>Error:{this.state.error}</p> : null}
        
        <StockSearchRender toRender = {this.state.searchTerm}/>
        </div>

       
        );
    }




    
}



export class DisplayDefaultStocks extends React.Component{

    state = {
        loading: true,
        stocks: null
    };

    async componentDidMount(){
        const url = "http://131.181.190.87:3000/stocks/symbols";
        
        const responce = await fetch(url);
        const data = await responce.json();


        this.setState({stocks:data,loading:false});
        

    }
    

    render(){

        if (this.state.loading)
        {
            return <div>loading...</div>
        }

        //just spew it all out thats nasty

        // if (!this.state.loading)
        // {
        //     return (
        //     <div>
            
        //     {this.state.stocks.map((item,i)=><h2>{item.name}</h2>)}
            
        //     </div>
        //     );
        // }

        if(!this.state.loading){

            const columns = [
                {headerName:"Name",field:"name"},
                {headerName:"Symbol",field:"symbol"},
                {headerName:"Industry",field:"industry",filter:true},
            ];


            return(

            <div className="ag-theme-balham"
            style={{
                height:"300px",
                width:"800px"
            }}
            >
                <AgGridReact columnDefs={columns} rowData={this.state.stocks} pagination={true} paginationPageSize={7} />
            </div>
            );
        }


    }
    

    

    


}