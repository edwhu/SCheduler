// var React = require('react');
// var ReactDOM = require('react-dom');
var Courses = React.createClass({
  loadCoursesFromServer: function(){
    $.ajax({
      url:this.props.url,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url,status,err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
    this.loadCoursesFromServer();
  },
  render: function(){
    return (
      <div>
      <h2>Courses</h2>
      <CourseBox data={this.state.data}/>
      </div>);
  }
});
// [ { type: 'Lec',
//     title: 'Introduction to Programming',
//     section_title: {},
//     day: 'TH',
//     start: '09:30',
//     end: '10:50' },
//   { type: 'Lab',
//     title: 'Introduction to Programming',
//     section_title: {},
//     day: 'F',
//     start: '14:00',
//     end: '15:50' },
//   { type: 'Qz',
//     title: 'Introduction to Programming',
//     section_title: {},
//     day: 'H',
//     start: '19:00',
//     end: '20:50' } ]
var CourseBox = React.createClass({
  render: function(){
    var self = this;
      var courseNodes = this.props.data.map(function(course,i){
        return (
          <Course data={course} key={i}/>
        );
      });
      return (
        <div>{courseNodes}</div>
      );
  }
});

var Course = React.createClass({
  render: function(){
    return (
      <div className='course' style={{width:300, float:'left'}}>
        <h1>{this.props.data.title}</h1>
        <h2>{this.props.data.type}</h2>
        <ul className='list-unstyled'>
          <li>{this.props.data.day}</li>
          <li>{this.props.data.start}</li>
          <li>{this.props.data.end}</li>
        </ul>
      </div>
    );
  }
});

ReactDOM.render(<Courses url='/api'/>,document.getElementById('content'));
