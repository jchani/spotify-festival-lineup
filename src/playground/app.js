class IndecisionApp extends React.Component {
  constructor(props){
    super(props);
    this.handlePickOptions = this.handlePickOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state ={
      options : props.options
    };
  }

  handlePickOptions(){
    const randomNum = Math.floor(Math.random() * this.state.options.length)
    const option = this.state.options[randomNum];
    alert(option);
  }
  
  /*
   * Function called from child component 'AddOption' that passes data to parent
   */
  handleAddOption(option){
    //Form validation for 
    if(!option){
      return 'Enter valid value to add item';
    } else if(this.state.options.indexOf(option) > -1){
      return 'This option already exists'
    }
    
    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  }

  componentDidMount(){
    try{
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
  
      if(options){
        this.setState(() => ({options}))
      }
  
    } catch (e) {
      //Do nothing at all
    }
    
  }

  componentDidUpdate(prevProps, prevDefaultState){
    if(prevDefaultState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
      console.log('saving data');
    }


  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption(optionToRemove){
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }

  render(){
    return (
      <div>
        <Header/>
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePickOptions={this.handlePickOptions}/>
        <Options 
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );

  }
}

IndecisionApp.defaultProps = {
  options: []
}

const Header = (props) => {
  return (
    <div>
      <h1>testing testing</h1>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
}

Header.defaultProps = {
  title : 'Indecision',
  subtitle :'Put your life in the hands of a computer'
}

const Action = (props) => {
  return (
    <div>
      <button 
        onClick={props.handlePickOptions}
        disabled={!props.hasOptions}>
        What should I do?
      </button>
    </div>
  );
}

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && <p>Please add an option to get started!</p>}
      {
        props.options.map((option, index) => (
        <Option
          key={index}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))
      }
    </div>
  );
}

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={(e) => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
}

class AddOption extends React.Component{
  constructor(props){
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleAddOption(e){
    e.preventDefault();
  
    const option = e.target.elements.option.value.trim(); //special way of accessing elements from form submission
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error){
      e.target.elements.option.value = '';
    }
  };

  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option"/>
          <button>Add Option</button>
        </form>
      </div>
    );

  }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));