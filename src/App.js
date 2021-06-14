import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    console.log(this.ref.current);
    setTimeout(() => {
      this.ref.current.changeSendingStatus();
    }, 2000);
  }

  render() {
    return (
      <div className="wrapper">
        <LogProps {...this.props} forwardedRef={this.ref} >SENDING...</LogProps>
      </div>
    );
  }
}

class CustomBtn extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  changeSendingStatus = (_) => (this.ref.current.innerText = "SENT");

  render() {
    return (
      <button className="custom-btn" ref={this.ref}>
        {this.props.children}
      </button>
    );
  }
}

class LogProps extends React.Component {

  render() {
    const { forwardedRef, ...rest } = this.props;
    return <CustomBtn ref={forwardedRef} {...rest} />;
  }

  forwardRef (props, ref) {
    return <LogProps {...props} forwardedRef={ref} />
  }

  componentDidMount(prevProps) {
    console.log("old props:", prevProps);
    console.log("new props:", this.props);
    const name = CustomBtn.displayName || CustomBtn.name;
    this.forwardRef.displayName = `logProps(${name})`;
    React.forwardRef(this.forwardRef)
  }
}

export default App;
