import React from 'react';

class DogPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '/images/image-loading.svg',
    };
  }

  async componentDidMount() {
    await this.getDogPictureUrl();
  }

  async componentDidUpdate(prevProps) {
    await this.getDogPictureUrl(prevProps);
  }

  async getDogPictureUrl(prevProps) {
    const { match: { params: { breed } } } = this.props;
    if (prevProps && prevProps.match.params.breed === breed) {
      return;
    }
    this.setState({ url: '/images/image-loading.svg' });
    try {
      const url = `https://dog.ceo/api/breed/${breed}/images/random`;
      const response = await fetch(url);
      if (response.ok) {
        const { message: url } = await response.json();
        this.setState({ url });
      }
    } catch (e) {
      this.setState({
        error: e.message
      });
    }
  }

  getImageForPane() {
    return this.state.url ? { backgroundImage: `url('${this.state.url}')` } : {};
  }

  getError() {
    return (
      this.state.error ?
        <div className="is-error">
          {this.state.error}
        </div> :
        null
    );
  }

  render() {
    return (
      <div className="detail-pane" style={this.getImageForPane()}>
        {this.getError()}
      </div>
    );
  }
}

export default DogPicture;
