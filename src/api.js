
import React from "react";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";



export class StockSearchRender extends React.Component{

    constructor(props){
        super(props);
        this.state ={currentSymbol:this.props.toRender,Stockdata:[],loading:true,foundData:false}
    }

    state={currentSymbol:null,Stockdata:[],loading:true,foundData:false}

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
        }

        
    }



    render(){


        if(this.state.loading){
            return(<div><p>loading request</p></div>);
        }
        else if((!this.state.loading)&&(!this.state.foundData)){
            return(<div><p>nothing found</p></div>);

        }
        else if((!this.state.loading)&&(this.state.foundData)) //yay we got some data lets make it look good
        {
        return(<div><p>found data {this.state.Stockdata.name}</p></div>);
        }
        else{
            return(<div><p>shits broke</p></div>)
        }



    }

}



export class StockSearch extends React.Component{


    state = {
        searchTerm: "ZZZZ",
        error:null,
        loading:true,
        url:""
    };

//<input type="text" id="name" name="name" value={this.state.searchTerm} onChange={(event) => {this.setState({searchTerm:event.target.value});}} />

    render(){
        return(
            <div>
        <h1>Hello.. {this.state.searchTerm}</h1>

        <form>
        <label htmlFor="name">Your Name:</label>



        <input type="text" id="name" name="name" value={this.state.searchTerm} onChange={(event) => {

            const x = event.target.value;
            if(/[0-9]/.test(x)){
                this.setState({error:"no numbers"});
            }else{
                this.setState({error:null});
            }
            this.setState({searchTerm:event.target.value});


        }} />

        </form>

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