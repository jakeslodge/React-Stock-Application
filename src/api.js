
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
            
              <div className="container-fluid"> 
              <div className="row">
                <div className="card">
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

  
<div className="container-fluid"> 
<div className="row">
  <div className="card">
        <div className="card-header"><h1>{this.state.Stockdata.name}</h1><h2>{this.state.Stockdata.timestamp.slice(0,10)}</h2><h5>Volume: {this.state.Stockdata.volumes}</h5></div>

  </div>
</div>
</div>

<div className="container-fluid">  
<div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header card-header-warning card-header-icon">
                  <div className="card-icon">
                    <i className="material-icons">lock_open</i>
                  </div>
                  <p className="card-category">Open</p>
                  <h3 className="card-title">${this.state.Stockdata.open}
                    <small></small>
                  </h3>
                </div>
                <div className="card-footer">

                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header card-header-success card-header-icon">
                  <div className="m1">
                  <div className="card-icon">
                    <i className="material-icons">trending_up</i>
                  </div>
                  </div>
                  <p className="card-category">High</p>
                  <h3 className="card-title">${this.state.Stockdata.high}</h3>
                </div>
                <div className="card-footer">

                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header card-header-danger card-header-icon">
                  <div className="m2">
                  <div className="card-icon">
                    <i className="material-icons">trending_down</i>
                  </div>
                  </div>
                  <p className="card-category">Low</p>
                  <h3 className="card-title">${this.state.Stockdata.low}</h3>
                </div>
                <div className="card-footer">

                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header card-header-info card-header-icon">
                  <div className="m3">
                  <div className="card-icon">
                    <i className="fa fa-lock"></i>
                  </div>
                  </div>
                  <p className="card-category">Close</p>
                  <h3 className="card-title">${this.state.Stockdata.close} ({this.state.change}{this.state.diffValue})</h3>
                </div>
                <div className="card-footer">
                </div>
              </div>
            </div>
          </div>
        </div>

            
            
            </div>
            );




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
            <div className="container-fluid">

          <Jumbotron>
          <div className="m1">
          <h1><span id="wrap">Lookup.. {this.state.searchTerm}</span></h1>
          </div>
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