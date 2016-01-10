var Courses = React.createClass({
  handleCourseSubmit: function(course) {
    $.ajax({
      url: this.props.url,
      type: 'POST',
      data: course,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      data: []
    };
  },
  render: function() {
    return (
      <div className='container'>
        <h2>Courses</h2>
        <CourseForm onCourseSubmit={this.handleCourseSubmit}/>
        <CourseBox data={this.state.data}/>
      </div>
    );
  }
});

var CourseBox = React.createClass({
  render: function() {
    var self = this;
    var courseNodes = this.props.data.map(function(course, i) {
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
  render: function() {
    return (
      <div className='course' style={{
      width: 300, float: 'left'
      }}>
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

var CourseForm = React.createClass({
  getInitialState: function(){
    return {course:''};
  },
  handleSubmit: function(e){
    e.preventDefault();
    var course = this.state.course.trim();
    if(!course) return;
    this.props.onCourseSubmit({course:course});
    this.setState({course:''});
  },
  handleCourseChange: function(e){
    this.setState({course:e.target.value});
  },
  render: function() {
    return (
      <form className='courseForm' onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Aloha Edward' value={this.state.course} onChange={this.handleCourseChange}/>
        <input className='btn btn-primary' type='submit' value='POST'/>
      </form>
    );
  }
});

ReactDOM.render(
  <Courses url='/api'/>, document.getElementById('content'));
