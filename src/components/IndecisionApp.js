import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';

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

export default IndecisionApp;