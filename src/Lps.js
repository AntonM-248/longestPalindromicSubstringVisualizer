import React, { Component } from 'react'
import './Lps.css';

export default class Lps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      word: "",
      characters: [],
      booleans: [],
      longestPalindromicSubstring: "",
    }
    this.changeWord = this.changeWord.bind(this);
    this.getWord = this.getWord.bind(this);
    this.addCharacter = this.addCharacter.bind(this);
    this.resetBooleans = this.resetBooleans.bind(this);
    this.displayArrays = this.displayArrays.bind(this);
    this.activateUnderline = this.activateUnderline.bind(this);
    this.deactivateUnderline = this.deactivateUnderline.bind(this);
  }

  changeWord = (e) => {
    this.setState({
      word: e.target.value,
      displayWord: false,
    });
  }

  addCharacter = (word) => {
    let arr = [];
    arr[word.length - 1] = false;
    this.setState({
      characters: [...word],
      booleans: [...arr],
    });
  }

  resetBooleans = () => {
    this.setState({
      booleans: [],
    });
  }

  activateUnderline = (positions) => {
    let bools = [];
    bools[this.state.booleans.length - 1] = false;
    for (let p of positions) {
      bools[p] = true;
    }
    this.setState({
      booleans: [...bools],
    })
    this.forceUpdate();
  }

  deactivateUnderline = () => {
    let falseBools = [];
    falseBools[this.state.booleans.length - 1] = false;
    this.setState({
      booleans: [...falseBools],
    })
    this.forceUpdate();
  }

  wait = () => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < 0);
  }



  getWord = () => {
    let word = this.state.word;
    let palindromeMap = new Map();
    this.resetBooleans();
    this.addCharacter(word);
    for (let i = 0; i < word.length; i++) {

      let onePosition = i + "/" + i;
      this.activateUnderline([i]);
      this.deactivateUnderline();
      palindromeMap.set(onePosition, true);
      if (i < word.length - 1) {
        let twoPositions = i + "/" + (i + 1);
        palindromeMap.set(twoPositions, word.charAt(i) == word.charAt(i + 1));
        this.activateUnderline([i, i + 1]);
        this.wait();
        this.deactivateUnderline();
      }
    }
    for (let i = 2; i < word.length; i++) {
      for (let j = 0; j < word.length - i; j++) {
        let start = j;
        let end = j + i;
        let twoPositions = start + "/" + end;
        let innerPositions = (start + 1) + "/" + (end - 1);
        palindromeMap.set(twoPositions, (word.charAt(start) == word.charAt(end)) && palindromeMap.get(innerPositions));
        this.activateUnderline([i, j]);
        this.wait();
        this.deactivateUnderline();
      }
    }
    let start = 999999999;
    let end = -1
    for (const [key, value] of palindromeMap) {
      if (value) {
        let currentStart = parseInt(key.split("/")[0]);
        let currentEnd = parseInt(key.split("/")[1]);
        if ((currentEnd - currentStart) > (end - start)) {
          start = currentStart;
          end = currentEnd;
        }
        //console.log(key, value, currentStart, currentEnd, start, end);
      }
    }
    //console.log(start + ", " + end);
    if (end != word.length - 1) {
      //console.log("end is length");
      this.setState({
        longestPalindromicSubstring: word.substring(start, end + 1),
      });
    }
    else {
      this.setState({
        longestPalindromicSubstring: word.substring(start),
      });
    }
  }

  displayArrays = () => {
    let divs = [];
    for (let i = 0; i < this.state.characters.length; i++) {
      let boolean = this.state.booleans[i];
      divs.push(
        <div key={i} className='letter-container'>
          <div>{this.state.characters[i]}</div>
          {this.displayUnderline(boolean)}
        </div>
      )
    }
    return divs;
  }

  displayUnderline = (boolean) => {
    if (boolean) {
      return <div className='visible-bar'></div>
    }
    else {
      return <div className='invisible-bar'></div>
    }
  }


  render() {
    return (
      <div>
        <div>Longest palindromic substring</div>
        <div>Enter word</div>
        <input onChange={this.changeWord} type={"text"} ></input>
        <button onClick={this.getWord} style={{ display: "block" }}>Get Longest Palindrome</button>
        <div>{this.state.longestPalindromicSubstring}</div>
        <div className='character-row'>
          {this.displayArrays()}
        </div>
      </div>
    );
  }
}
