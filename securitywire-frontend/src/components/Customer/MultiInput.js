import React, { Component, KeyboardEventHandler } from "react";

import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

export class InScopeLinks extends Component {
  state = {
    inputValue: "",
    value: [],
  };
  componentDidMount() {
    if (Array.isArray(this.props.defaultValue)) {
      this.setState({ value: [...this.props.defaultValue] });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (Array.isArray(this.props.defaultValue)) {
        this.setState({ value: [...this.props.defaultValue] });
      }
    }
  }
  handleChange = (value, actionMeta) => {
    console.group("Value Changed");
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value });
    this.props.setinScopeLinks(value);
    const error = { ...this.props.errors };
    delete error.inScopeLinks;
    this.props.seterrors(error);
  };
  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };
  handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        console.group("Value Added");
        console.groupEnd();
        this.setState({
          inputValue: "",
          value: [...value, createOption(inputValue)],
        });
        this.props.setinScopeLinks([...value, createOption(inputValue)]);

        event.preventDefault();
    }
  };
  render() {
    const { inputValue, value } = this.state;
    return (
      <>
        <CreatableSelect
          components={components}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder={this.props.placeholder}
          value={value}
        />
        <br />
      </>
    );
  }
}

export class OutScopeLinks extends Component {
  state = {
    inputValue: "",
    value: [],
  };
  componentDidMount() {
    if (Array.isArray(this.props.defaultValue)) {
      this.setState({ value: [...this.props.defaultValue] });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (Array.isArray(this.props.defaultValue)) {
        this.setState({ value: [...this.props.defaultValue] });
      }
    }
  }
  handleChange = (value, actionMeta) => {
    console.group("Value Changed");
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value });
    this.props.setoutScopeLinks(value);
  };
  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };
  handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        console.group("Value Added");
        console.groupEnd();
        this.setState({
          inputValue: "",
          value: [...value, createOption(inputValue)],
        });
        this.props.setoutScopeLinks([...value, createOption(inputValue)]);

        event.preventDefault();
    }
  };
  render() {
    const { inputValue, value } = this.state;
    return (
      <>
        <CreatableSelect
          components={components}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder={this.props.placeholder}
          value={value}
        />
        <br />
      </>
    );
  }
}

export class VRTs extends Component {
  state = {
    inputValue: "",
    value: [],
  };
  componentDidMount() {
    if (Array.isArray(this.props.defaultValue)) {
      this.setState({ value: [...this.props.defaultValue] });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (Array.isArray(this.props.defaultValue)) {
        this.setState({ value: [...this.props.defaultValue] });
      }
    }
  }
  handleChange = (value, actionMeta) => {
    console.group("Value Changed");
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value });
    this.props.setvrts(value);
    const error = { ...this.props.errors };
    delete error.vrts;
    this.props.seterrors(error);
  };
  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };
  handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        console.group("Value Added");
        console.groupEnd();
        this.setState({
          inputValue: "",
          value: [...value, createOption(inputValue)],
        });
        this.props.setvrts([...value, createOption(inputValue)]);

        event.preventDefault();
    }
  };
  render() {
    const { inputValue, value } = this.state;
    console.log("DEFAILT VALUE", this.props.defaultValue);
    return (
      <>
        <CreatableSelect
          components={components}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder={this.props.placeholder}
          value={value}
        />
        <br />
      </>
    );
  }
}
