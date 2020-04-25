import React from 'react'
import Chart from "chart.js"
import { Line } from 'react-chartjs-2';

export class OpenGraph extends React.Component{

    constructor(props){
        super(props);
        this.chartReference=React.createRef();
    }



    componentDidMount(){
        console.log(this.chartReference);
    }
    render() {
        return (
            <div >
                <Line ref={this.chartReference}data={this.props.data}width={100}height={200}options={{ maintainAspectRatio: false }}/>
            </div>
        )
    }
}