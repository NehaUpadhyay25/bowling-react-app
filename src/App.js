import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import RollBoard from './RollButtons';
import ScoreBoard from './ScoreBoard';


class App extends Component {

  state = {
    frame_number: null,
    active_game: false,
    player_name: null,
    pins_remaining: 10,
    scorecard_status: [],
    full_score: null
  }

  componentDidMount() {
    this.loadScorecard();
  }

  loadScorecard = async () => {
    let response = null
    if (this.state.scorecard_status.length !== 0) {

      try{
        let promise = await fetch("/scorecard_status")
        response = await promise.json()
      }catch (e) {
        console.log("Error!")
      }
      this.setState({
        scorecard_status: response.body.scorecard,
        full_score: response.body.full_score
      })

    }
  }

  handlePinPoints = (points) => {
    let frame_number = null;

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({points: points, frame_number: this.state.frame_number+1})

    };
    console.log(JSON.stringify({points: points, frame_number: this.state.frame_number+1}))
    fetch("/frame/input", requestOptions)
      .then(data => data.json())
      .then(data => {
        console.log(data.body)
        this.state.scorecard_status[this.state.frame_number] = data.body
        frame_number = this.state.frame_number === 9 ? 9 :
          (data.body.pinCount === 0 || data.body.shotCount === 2) ? this.state.frame_number + 1 : this.state.frame_number
        let pins_remaining = (frame_number !== 9) ?
            this.state.scorecard_status[frame_number].pinCount:
              (data.body.firstShot + data.body.secondShot) === 10 ? 10:this.state.scorecard_status[frame_number].pinCount

        console.log(frame_number)
        console.log(pins_remaining)
        console.log(this.state.scorecard_status)

        this.setState({
          scorecard_status: this.state.scorecard_status,
          frame_number: frame_number,
          pins_remaining: pins_remaining
        })
          if (frame_number == 9)
            this.loadScorecard();
      })
      .catch(err => {
        throw new Error(err.message);
      });
  }

  handleReset = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    };
    fetch("/reset", requestOptions)
      .then(data => data.json())
      .then(data => {
        console.log(data)
        this.setState({scorecard_status: [], active_game: false, frame_number: null, pins_remaining: 10, full_score: null})
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  handleNewGame = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    };
    fetch("/newgame", requestOptions)
      .then(data => data.json())
      .then(data => {
        console.log(data)
        this.setState({scorecard_status: data.body, active_game: true, frame_number: 0, full_score: 0})
      })
      .catch(err => {
        throw new Error(err);
      });

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React Bowling</h2>
        </div>
        {
          this.state.active_game === true?
            <button onClick={this.handleReset}>Reset</button>:
            <button onClick={this.handleNewGame}>New Game</button>
        }
        <RollBoard
          pins_remaining={this.state.pins_remaining}
          handlePinPoints={this.handlePinPoints}
          />
        <ScoreBoard
          scorecard_status={this.state.scorecard_status}
          full_score={this.state.full_score}/>

      </div>
    );
  }
}

export default App;
