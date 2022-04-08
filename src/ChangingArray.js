import React, { Component } from 'react'

export default class ChangingArray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [1, 2, 3]
    }

    this.modifyArray = this.modifyArray.bind(this);
  }

  modifyArray = () => {
    for (let i = 0; i < 15; i++) {
      let newArray = [];
      for (let j = 0; j < this.state.array.length; j++) {
        newArray[j] = this.state.array[j];
      }
      newArray[i % newArray.length] = i;
      this.setState({
        array: [...newArray],
      })
      this.forceUpdate();
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < 250);
    }
  }

  render() {
    return (
      <div>
        {this.state.array}
        <button onClick={this.modifyArray}>modify</button>
      </div>
    )
  }
}
