import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  updateInputVal = e => {
    this.setState({ inputValue: e.target.value });
  }

  // TODO: Create an `onSubmit` handler for your search form.
  handleSubmit = e => {
    // TODO: Prevent the default action of a submit event
    e.preventDefault();
    // TODO: Dispatch the `fetchGifs` function
    this.props.fetchGifs(this.state.inputValue);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.updateInputVal}
          placeholder="Search for a GIF!"
        />
      </form>
    );
  }
};

export default SearchBar;
