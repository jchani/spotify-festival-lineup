class VisibilityToggleApp extends React.Component{
  constructor(props){
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    this.state = {
      visibility:false
    }
  }
  
  handleToggleVisibility(){
    this.setState((prevState) => {
      return {
        visibility : !prevState.visibility
      }
    });
  }
  
  render(){
    const title = 'Visibility Toggle';
    
    return (
      <div>
        <h1>{title}</h1>
        <button onClick={this.handleToggleVisibility}>
          {this.state.visibility ? 'Hide details' : 'Show details'}
        </button>
        <p>
          {this.state.visibility && 'This is some hidden text!'}
        </p>
        </div>
    );
  }
}









ReactDOM.render(<VisibilityToggleApp />, document.getElementById('app'));


// let visibility = false;

// const toggleVisibility = () => {
//   visibility = !visibility;
//   render();
// }


// const render = () => {
//   const template = (
//     <div>
//       <h1>Visibility Toggle</h1>
//       <button onClick={toggleVisibility}>
//         {visibility ? 'Hide details' : 'Show details'}
//       </button>
//       <p>{visibility && 'Some hidden text!'}</p>
//     </div>
//   );

//   console.log(visibility);
//   const appRoot = document.getElementById('app');
//   ReactDOM.render(template, appRoot);
// };

// render();


