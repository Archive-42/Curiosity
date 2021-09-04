import { useState, useRef, useEffect, useCallback } from 'react';

function Modal(props) {
  const [value, setValue] = useState(props.initialValue);
  const inputRef = useRef();
  const modalRef = useRef();

  const onClickOutside = useCallback(
    e => {
      const { onClose } = props;
      const element = e.target;

      if (modalRef.current && !modalRef.current.contains(element)) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    },
    [props]
  );

  const onChange = e => {
    setValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const { onSubmit, onClose } = props;
    onSubmit(value);
    onClose();
  };

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [inputRef, onClickOutside]);

  return (
    <div className='modal--overlay'>
      <div className='modal' ref={modalRef}>
        <h1>Insert a new value</h1>
        <form action='?' onSubmit={onSubmit}>
          <input ref={inputRef} type='text' onChange={onChange} value={value} />
          <button>Save new value</button>
        </form>
      </div>
    </div>
  );
}

// class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.inputRef = createRef();
//     this.modalRef = createRef();
//     this.state = { value: props.initialValue };
//   }

//   componentDidMount() {
//     this.inputRef.current.focus();

//     document.body.addEventListener('click', this.onClickOutside);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('click', this.onClickOutside);
//   }

//   onClickOutside = e => {
//     const { onClose } = this.props;
//     const element = e.target;

//     if (this.modalRef.current && !this.modalRef.current.contains(element)) {
//       e.preventDefault();
//       e.stopPropagation();
//       onClose();
//     }
//   };

//   onChange = e => {
//     this.setState({ value: e.target.value });
//   };

//   onSubmit = e => {
//     e.preventDefault();
//     const { value } = this.state;
//     const { onSubmit, onClose } = this.props;
//     onSubmit(value);
//     onClose();
//   };

//   render() {
//     const { value } = this.state;

//     return (
//       <div className='modal--overlay'>
//         <div className='modal' ref={this.modalRef}>
//           <h1>Insert a new value</h1>
//           <form action='?' onSubmit={this.onSubmit}>
//             <input
//               ref={this.inputRef}
//               type='text'
//               onChange={this.onChange}
//               value={value}
//             />
//             <button>Save new value</button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

export default Modal;
