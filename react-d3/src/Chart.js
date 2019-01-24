import React, { Component } from 'react';
import * as d3 from "d3";



class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            data: this.props.data
        }
    }
    componentDidUpdate() {
        
        if(this.props.type == 'bar'){
            this.drawChart();
        }
        else if(this.props.type == 'line'){
            this.drawChart2();
        }
        
    }
    drawChart() {
        


        if (this.props.data === undefined || Object.keys(this.props.data).length == 0) {
            //console.log('no data for chart to display')
            return
        } else {
            //console.log(this.props.data.data)
        }
        //console.log('remove children', this.props.id)

        let myNode = document.getElementById('#' + this.props.id);
        if (myNode) {
            //console.log('remove children')
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }
        const data = this.props.data
        const barSpaceRatio = 6
        const expectedMaxValue = 10000
        const barSpace = this.props.width / data.length
        const barWidth = barSpace / barSpaceRatio * (barSpaceRatio - 1)
        const barHeightRatio = expectedMaxValue / this.props.height
        const graphRatio = data.length
        const svg = d3.select(".chart").append("svg").attr("width", this.props.width).attr("height", this.props.height);
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => this.props.width - i * (this.props.width / data.length) - barWidth)
            .attr("y", (d, i) => this.props.height - 10 * d[3] / barHeightRatio)
            .attr("width", barWidth)
            .attr("height", (d, i) => d[3] / barHeightRatio * 10)
            .attr("fill", "green")
        /*svg.selectAll("text")
            .data(this.props.data.data)
            .enter()
            .append("text")
            .text((d) => d[0])
            .attr("x", (d, i) => i * 5)
            .attr("y", (d, i) => this.props.height - (10 * d[3]/100) - 3)*/
    }

    drawChart2() {
        


        if (this.props.data === undefined || Object.keys(this.props.data).length == 0) {
            //console.log('no data for chart to display')
            return
        } else {
            //console.log(this.props.data.data)
        }
        //console.log('remove children', this.props.id)

        let myNode = document.getElementById('#' + this.props.id);
        if (myNode) {
            //console.log('remove children')
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }
        const data = this.props.data
        const barSpaceRatio = 6
        const expectedMaxValue = 10000
        const barSpace = this.props.width / data.length
        const barWidth = barSpace / barSpaceRatio * (barSpaceRatio - 1)
        const barHeightRatio = expectedMaxValue / this.props.height
        const graphRatio = data.length

        const svg = d3.select(".chart").append("svg").attr("width", this.props.width).attr("height", this.props.height);
        let points= []
        for(let  i=0; i <data.length;i++){
            points.push(this.props.width - i * (this.props.width / data.length) - barWidth);
            points.push((this.props.height - 10 * data[i][3] / barHeightRatio) - (data[i][3]- 10 * data[i][3] / barHeightRatio));
        }
        
        svg.append("polyline") 
        .attr("points", points)
        .attr("stroke-width", 1)
        .attr("stroke", "black")
        .attr("fill", "none");
        
        

    }

    render() {
        //console.log('chart rerendered')
        //console.log(this.props)
        if (this.props.data != undefined) {
            //console.log('chart has data')
            return <div id={"#" + this.props.id} className='chart'></div>
        }
        else {
            //console.log('chart has no data')
            return null
        }
    }
}

export default Chart;