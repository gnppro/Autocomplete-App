import React, { Component } from "react";
import "./Autocomplete.css";

class Autocomplete extends Component {
  state = {
    options: "",
    inputValue: "",
    activeOption: 0,
    showOptions: false
  };

  handleKeyDown = event => {
    const { options, activeOption } = this.state;
    switch (event.key) {
      case "ArrowDown":
        this.setState({
          activeOption:
            activeOption - 1 === options.length
              ? activeOption
              : activeOption + 1
        });
        break;
      case "ArrowUp":
        this.setState({
          activeOption: activeOption === 0 ? activeOption : activeOption - 1
        });
        break;
      case "Enter":
        this.setState({
          activeOption: 0,
          showOptions: false,
          inputValue: options[activeOption].title
        });
        break;
      default:
        break;
    }
  };

  handleChange = event => {
    const { value } = event.target;
    const { data } = this.props;
    const options = data.filter(issue =>
      issue.title.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ options, inputValue: value, showOptions: value !== "" });
  };

  handleClick = event => {
    this.setState({
      options: [],
      activeOption: 0,
      showOptions: false,
      inputValue: event.target.innerText
    });
  };

  render() {
    const { showOptions, options, activeOption } = this.state;

    return (
      <div>
        <input
          autoFocus
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <ul className="options">
          {options.length > 0 && showOptions ? (
            options.map((issue, index) => {
              return (
                <li
                  key={issue.id}
                  onClick={this.handleClick}
                  className={index === activeOption ? "option-active" : ""}
                >
                  {issue.title}
                </li>
              );
            })
          ) : (
            <p className="no-options">Escribe el issue que buscas</p>
          )}
        </ul>
      </div>
    );
  }
}

export default Autocomplete;
