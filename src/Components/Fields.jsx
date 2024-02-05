import { Component, useState } from "react";

function PasswordValidCheck(props) {
  return (
    <>
      <p className="mb-2">{props.children}</p>
      <ol className="ps-3 list-unstyled">
        {props.items.map(function ({ correct, value }, index) {
          return (
            <li
              key={index}
              className={"text-" + (correct ? "success" : "danger")}
            >
              <i
                className={
                  "me-1 bi bi-" + (correct ? "check-circle" : "x-circle")
                }
              ></i>
              {value}
            </li>
          );
        })}
      </ol>
    </>
  );
}

class FormInput extends Component {
  state = {
    type: this.props.type,
    icon: this.props.icon,
  };

  handleChange = () => {
    if (this.props.triggable) {
      if (this.state.icon === this.props.icon) {
        this.setState({
          icon: this.props.iconDisabled,
          type: this.props.typeDisabled,
        });
      } else {
        this.setState({
          icon: this.props.icon,
          type: this.props.type,
        });
      }
    }
  };

  handleText = (e) => {
    e.preventDefault();
    this.props.invalidCheck(e.target);
  };

  render() {
    return (
      <div className="mb-3">
        <div className="input-group my-1">
          <div className="form-floating">
            <input
              type={this.state.type}
              className="form-control"
              id={this.props.id}
              placeholder=""
              name={this.props.id}
              pattern={this.props.pattern}
              onInvalid={this.handleText}
              onInput={this.handleText}
              required
            />
            <label htmlFor={this.props.id}>{this.props.children}</label>
          </div>
          <i
            className={"bi input-group-text fs-2 bi-" + this.state.icon}
            onClick={this.handleChange}
          ></i>
        </div>
        <div className="form-text ps-2">
          {this.props.errorList.some((v) => !v.correct) && (
            <PasswordValidCheck items={this.props.errorList}>
              {this.props.errorTitle}
            </PasswordValidCheck>
          )}
        </div>
      </div>
    );
  }
}

function LightInput(props) {
  return (
    <div className="input-group mb-3">
      <div className="form-floating">
        <input
          type={props.type}
          className="form-control"
          id={props.id}
          placeholder=""
          name={props.id}
          required
        />
        <label htmlFor={props.id}>{props.children}</label>
      </div>
      <i
        className={"bi input-group-text fs-2 bi-" + props.icon}
        onClick={props.onClick}
      ></i>
    </div>
  );
}

export { FormInput, LightInput };
