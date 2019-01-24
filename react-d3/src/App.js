import React, { Component } from 'react';
import Chart from './Chart.js';
import './App.css';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
var https = require("https");


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      width: window.innerWidth,
      height: window.innerHeight,
      id: 'chart',
      selected: '',
      startDate: new Date(),
      endDate: new Date(),
      type: ''
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  pullData(event) {
      let url = 'https://' + "www.quandl.com" + '/api/v3/datasets/WIKI/' + this.state.selected + '/data.json' + '?api_key='+'7mvheHFUETpZ685X7joU';
      
      if (this.state.startDate && this.state.endDate) {
        url += '&start_date=' + this.state.startDate.getFullYear()+'-'+(this.state.startDate.getMonth()+1)+'-'+this.state.startDate.getDate() 
        + '&end_date=' + this.state.endDate.getFullYear()+'-'+(this.state.endDate.getMonth()+1)+'-'+this.state.endDate.getDate();
      }
      //console.log(url)
      https.request(url, (res) => {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        let body = ''
        let dataPath = '/data';
        res.on('data', function (chunk) {
          body += chunk;
        });
        res.on('end', () => {
          
          let data = JSON.parse(body);
          if(data.dataset_data != undefined){
          this.setState({ data: data.dataset_data.data });
          }
          //console.log(this.state)
        });

      }).end();
    
  }

  render() {
    return (
      <div className="App">
        <label>
          start date
          <DatePicker
            selected={this.state.startDate}
            onChange={(date) => this.setState({ startDate: date}, this.pullData.bind(this) )}
          />
        </label>
        <label>
          end date
          <DatePicker
            selected={this.state.endDate}
            onChange={(date) => this.setState({ endDate: date }, this.pullData.bind(this))}
          />
        </label>
        <select onChange={(event)=>{this.setState({type:event.currentTarget.value})}} value={this.state.type}>
          <option value=""></option>
          <option value="line">Line Graph</option>
          <option value="bar">Bar Graph</option>
        </select>
        <select onChange={(event)=>{this.setState({selected:event.currentTarget.value},this.pullData.bind(this))}} value={this.state.selected}>
          <option value=""></option>
          <option value="MSFT">Microsoft</option>
          <option value="AAPL">Apple</option>
        </select>
        <Chart data={this.state.data} type={this.state.type} width={this.state.width} height={this.state.height} id={this.state.id} start_date={this.state.startDate} endDate={this.state.endDate} />
      </div>
    );
  }
}

export default App;
