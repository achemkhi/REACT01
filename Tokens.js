import React from 'react';

class Tokens extends React.Component {
  constructor(props) {
    super(props)
    this.denominations = [1, 5, 10, 20, 50, 100, 200];
    this.denominations.sort(function (a, b) {
      return b - a
    });
    this.state = {
      montant: '',
      change: []
    }
    this.valid = false
  }

  handleChange = (event) => {
    const {value} = event.target;
    this.setState({montant: value})

    this.valid = (value !== "" && !isNaN(value)) ? true : false
  }


  generateTokens = (e) => {
    let coins = this.denominations;
    let X = this.state.montant;

    let ndx = coins.length, change = [];

    while (ndx) change[--ndx] = 0;

    while (X) {
      while (coins[ndx] <= X) {
        X -= coins[ndx];
        X = parseFloat(X.toFixed(2));
        change[ndx]++;
      }
      if (0.01 < coins[ndx]) ndx++;
    }

    this.setState({
      change : change
    })

    console.log(coins)
    console.log(change)
  }


  render() {
    return (<div className="tokens">
      <p>Saisir le montant</p>
      <input name="montant" type="number" value={this.state.montant} onChange={this.handleChange}/>
      <button onClick={this.generateTokens} disabled={!this.valid}>Generate token(s)</button>

      <p>Vous avez demandé la monnaie sur {this.state.montant} :</p>

      {this.state.change.map((t, index) => {
        return (<Token key={index} ndx={this.denominations} index={index} t={t}/>)
      })}
    </div>)
  }
}

class Token extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    console.log(this.props.ndx)
    return (
        <p>{`Token ${this.props.ndx[this.props.index]} : ${this.props.t}`}</p>
    )
  }
}

export default Tokens;
