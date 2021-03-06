import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
<<<<<<< HEAD
import classNames from 'classnames';
import * as actions from '../../actions/puzzleActions';
=======
import homePageActions from '../../actions/homepageActions';
>>>>>>> c8805f9dc2a197acbe20e45c35cc80ba3281de91
import PuzzleComponent from './PuzzleComponent';
import InstanceComponent from './InstancesComponent';
import DataFlowArrow from './DataFlowArrow';
import puzzleArray from '../../../puzzle.json';

class HomePage extends React.Component {
<<<<<<< HEAD
  render () {
    const sendingDataClass = classNames({
      'data-flow': true,
      'active': this.props.sendingData
    });

    return (
      <div className="home-page">
        <PuzzleComponent />
        <div className={sendingDataClass}>
          <DataFlowArrow className="k8instances" active={this.props.sendingData} reverse={false}/>
=======
  constructor (props) {
    super(props);

    this.state = {
      puzzleGrid: [],
      downHintsArray: [],
      acrossHintsArray: [],
      instanceData: {
        instanceFinalCount: 3,
        instanceCurrentCount: 3
      }
    };

    this.initializeGrid = this.initializeGrid.bind(this);
    this.initializePuzzleArray = this.initializePuzzleArray.bind(this);
    this.addLetterToPuzzleArray = this.addLetterToPuzzleArray.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
    this.onScale = this.onScale.bind(this);
  }

  componentWillMount () {
    // iterate through json and load array. Also populate Across and Down arrays
    this.initializePuzzleArray();
  }

  handleSlider (event, value) {
    const instanceData = Object.assign({}, this.state.instanceData, {
      instanceCurrentCount: value,
      instanceFinalCount: this.state.instanceData.instanceFinalCount
    });

    this.setState({
      instanceData
    });
  }

  onScale () {
    const instanceData = Object.assign({}, this.state.instanceData, {
      instanceCurrentCount: this.state.instanceData.instanceCurrentCount,
      instanceFinalCount: this.state.instanceData.instanceCurrentCount
    });

    this.setState({
      instanceData
    });
  }

  initializeGrid () {
    const puzzleGrid = [];
    const maxRows = 12;
    const maxColumns = 11;

    for (var i = 0; i < maxColumns; i++) {
      puzzleGrid.push(new Array(maxRows).fill(''));
    }

    console.log(puzzleGrid);
    return puzzleGrid;
  }

  initializePuzzleArray () {
    const downHintsArray = puzzleArray.filter((word) => {
      return (word.wordOrientation === 'down');
    });
    const acrossHintsArray = puzzleArray.filter((word) => {
      return (word.wordOrientation === 'across');
    });

    let puzzleGrid = [...this.initializeGrid()];
    puzzleArray.forEach((wordObj, index) => {
      const lettersArray = wordObj.word.split('');
      lettersArray.forEach((letter, index) => {
        puzzleGrid = this.addLetterToPuzzleArray(puzzleGrid, wordObj, letter, index);
      });
    });

    this.setState({
      downHintsArray,
      acrossHintsArray,
      puzzleGrid
    });
  }

  addLetterToPuzzleArray (puzzleGrid, wordObj, letter, index) {
    const letterObj = {
      word: wordObj.word,
      wordNbr: wordObj.wordNbr,
      positionInWord: index,
      cellLetter: letter,
      wordOrientation: wordObj.wordOrientation,
      x: wordObj.wordOrientation === 'across' ? wordObj.startx + index : wordObj.startx,
      y: wordObj.wordOrientation === 'across' ? wordObj.starty : wordObj.starty + index
    };

    puzzleGrid[letterObj.y][letterObj.x] = letterObj;

    return puzzleGrid;
  }

  render () {
    return (
      <div className="home-page">
        <PuzzleComponent
          puzzleGrid={this.state.puzzleGrid}
          downHintsArray={this.state.downHintsArray}
          acrossHintsArray={this.state.acrossHintsArray}
        />
        <div className="data-flow">
          <DataFlowArrow className="k8instances" />
>>>>>>> c8805f9dc2a197acbe20e45c35cc80ba3281de91
        </div>
        <div className="instances">
          <InstanceComponent />
        </div>
        <div className="data-flow image-column">
          <DataFlowArrow className="mongo" active={this.props.fromMongo} reverse/>
          <DataFlowArrow className="etcd" active={this.props.fromCache} reverse/>
        </div>
        <div className="dbs image-column">
          <div className="mongo">
            <img src={`../../assets/mongo.png`}/>
          </div>
          <div className="etcd">
            <img src={`../../assets/etcd.png`}/>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
<<<<<<< HEAD
  actions: PropTypes.objectOf(PropTypes.func),
  state: PropTypes.object,
  sendingData: PropTypes.bool,
  fromCache: PropTypes.bool,
  fromMongo: PropTypes.bool
=======
  params: PropTypes.objectOf(PropTypes.string),
  actions: PropTypes.objectOf(PropTypes.func),
  state: PropTypes.object
>>>>>>> c8805f9dc2a197acbe20e45c35cc80ba3281de91
};

function mapStateToProps (state) {
  return {
<<<<<<< HEAD
    sendingData: state.puzzle.sendingData,
    fromCache: state.puzzle.fromCache,
    fromMongo: state.puzzle.fromMongo
=======
    state: state
>>>>>>> c8805f9dc2a197acbe20e45c35cc80ba3281de91
  };
}

function mapDispatchToProps (dispatch) {
  return {
<<<<<<< HEAD
    actions: bindActionCreators(actions, dispatch)
=======
    actions: bindActionCreators(homePageActions, dispatch)
>>>>>>> c8805f9dc2a197acbe20e45c35cc80ba3281de91
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
