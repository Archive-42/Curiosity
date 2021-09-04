import React, { createRef } from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.modalRef = createRef();
    this.state = { value: props.initialValue };
  }

  componentDidMount() {
    this.inputRef.current.focus();

    document.body.addEventListener('click', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }

  onClickOutside = e => {
    const { onClose } = this.props;
    const element = e.target;

    if (this.modalRef.current && !this.modalRef.current.contains(element)) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    const { onSubmit, onClose } = this.props;
    onSubmit(value);
    onClose();
  };

  render() {
    const { value } = this.state;

    return (
      <div className='modal--overlay'>
        <div className='modal' ref={this.modalRef}>
          <h1>Insert a new value</h1>
          <form action='?' onSubmit={this.onSubmit}>
            <input
              ref={this.inputRef}
              type='text'
              onChange={this.onChange}
              value={value}
            />
            <button>Save new value</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;
