import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import homePageActions from '../../actions/homepageActions'
import _ from 'lodash';
import puzzleArray from '../../../puzzle.json';
import Cell from '../shared/Cell';
import InstanceGrid from '../instance-grid/InstanceGrid';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.init();

    this.state = {
      slider: 3,
      sliderFinalValue: 3
    };

    this.handleSlider = this.handleSlider.bind(this);
    this.onScale = this.onScale.bind(this);
  }

  handleSlider (event, value) {
    this.setState({slider: value});
  };

  onScale () {
    this.setState({sliderFinalValue: this.state.slider});
  };

  init() {
    this.initializeGrid();
    // iterate through json and load array. Also populate Across and Down arrays
    this.initializePuzzleArray();
  };

  initializeGrid () {
    const numRows = 11;
    const numCols = 12;
    // initialize grid with empty objects
    this.puzzleGrid = []; // Initialize array
    this.downHintsArray = [];
    this.acrossHintsArray = [];

    for (let i = 0 ; i < numRows; i++) {
      this.puzzleGrid[i] = []; // Initialize inner array
      for (let j = 0; j < numCols; j++) { // i++ needs to be j++
        this.puzzleGrid[i][j] = {};
      }
    }
  }

  initializePuzzleArray () {
    puzzleArray.forEach((wordObj, index) => {
      const lettersArray = wordObj.word.split('');
      this.addToHintsArray(wordObj);
      lettersArray.forEach((letter, index) => {
        this.addLetterToPuzzleArray(wordObj, letter, index);
      });
    });
  }

  addToHintsArray (word) {
    switch (word.wordOrientation) {
      case 'down':
        this.downHintsArray.push(word);
        break;
      case 'across':
        this.acrossHintsArray.push(word);
        break;
    }
  }

  addLetterToPuzzleArray (wordObj, letter, index) {
    const letterObj = {
      word: wordObj.word,
      wordNbr: wordObj.wordNbr,
      positionInWord: index,
      cellLetter: letter,
      wordOrientation: wordObj.wordOrientation,
      x: wordObj.wordOrientation === 'across' ? wordObj.startx + index : wordObj.startx,
      y: wordObj.wordOrientation === 'across' ? wordObj.starty : wordObj.starty + index
    };

    this.puzzleGrid[letterObj.y][letterObj.x] = letterObj;
  }

  render () {

    let instanceProps = {min: 3, max: 48, step: 3, defaultValue: 3, value: 3, onChange: this.handleSlider, onScale: this.onScale};
    let instanceData = {instanceFinalCount: this.state.sliderFinalValue, instanceCurrentCount: this.state.slider};

    const cells = this.puzzleGrid.map((column, index) => {
      return column.map((cell, i) => {
        return (
          <Cell
            key={index, i}
            orientation={cell.wordOrientation}
            letter={cell.cellLetter}
            isEmpty={_.isInteger(cell.positionInWord)}
            positionInWord={cell.positionInWord}
            wordNbr={cell.wordNbr}></Cell>
        );
      });
    });

    const downHints = _.sortBy(this.downHintsArray, 'wordNbr').map((word, index) => {
      return (
        <li key={index}>{word.wordNbr} {word.hint}</li>
      );
    });

    const acrossHints = _.sortBy(this.acrossHintsArray, 'wordNbr').map((word, index) => {
      return (
        <li key={index}>{word.wordNbr} {word.hint}</li>
      );
    });


    return (
      <div className="home-page">
        <div className="puzzle">
          <div className="puzzle-container">
            {cells}
          </div>
          <div className="controls">
            <button>Reload</button>
            <button className="green">Submit</button>
            <button>Clear</button>
          </div>
          <div className="hint-container">
            <div className="down">
              <h2>Down</h2>
              <ul>
                {downHints}
              </ul>
            </div>
            <div className="across">
              <h2>Across</h2>
              <ul>
                {acrossHints}
              </ul>
            </div>
          </div>
        </div>
        <div className="data-flow k8instances">
          <div>
            <img className="top" src={`../../assets/arrow.png`} />
            <img className="bottom" src={`../../assets/arrow-blue.png`} />
          </div>
        </div>
        <div className="instances">
          <InstanceGrid
            properties={instanceProps}
            instanceData={instanceData}>
          </InstanceGrid>
        </div>
        <div className="data-flow db">
          <div>
            <img className="top" src={`../../assets/arrow.png`} />
            <img className="bottom" src={`../../assets/arrow-blue.png`} />
          </div>
          <div>
            <img className="top" src={`../../assets/arrow.png`} />
            <img className="bottom" src={`../../assets/arrow-blue.png`} />
          </div>
        </div>
        <div className="persistance">
            <div className="mongo"><img src={`../../assets/mongo.png`}/></div>
            <div className="etcd"><img src={`../../assets/etcd.png`}/></div>
        </div>

      </div>
    );
  }
}

HomePage.propTypes = {
  params: PropTypes.objectOf(PropTypes.string),
  actions: PropTypes.objectOf(PropTypes.func),
  state: PropTypes.object
};

function mapStateToProps (state) {
  return {
    state: state
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(homePageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);