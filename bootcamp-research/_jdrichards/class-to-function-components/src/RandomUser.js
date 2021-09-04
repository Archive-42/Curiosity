import React from 'react';

class RandomUser extends React.Component {
  constructor() {
    super();
    this.state = {
      searchChange: '',
      searchWord: 'foobar',
      data: []
    };
  }

  fetchUser = async (searchWord) => {
    const res = await fetch(`https://randomuser.me/api/?seed=${searchWord}`);
    const data = await res.json();
    return data;
  };

  async componentDidMount() {
    console.log('componentDidMount');
    let { searchWord } = this.state;
    const data = await this.fetchUser(searchWord);
    // const res = await fetch(`https://randomuser.me/api/?seed=${searchWord}`);
    // const data = await res.json();
    this.setState({
      data: data.results
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');

    if (prevState.searchWord !== this.state.searchWord) {
      const { searchWord } = this.state;
      const data = await this.fetchUser(searchWord);
      // const res = await fetch(`https://randomuser.me/api/?seed=${searchWord}`);
      // const data = await res.json();
      this.setState({
        data: data.results,
        searchChange: ''
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      searchChange: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      searchWord: this.state.searchChange,
      searchChange: ''
    });
  };

  render() {
    let renderPerson = this.state.data?.map(({ picture, email }) => (
      <div key={email}>
        <img src={picture.large} alt='person' />
        <p>{email}</p>
      </div>
    ));

    return (
      <>
        <h1>Random User</h1>
        {renderPerson}
        <form>
          <input
            onChange={this.handleChange}
            value={this.state.searchChange}
            placeholder='Search'
          />
          <button type='submit' onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default RandomUser;
