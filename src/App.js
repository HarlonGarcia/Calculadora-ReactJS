import React, { Component } from "react";
import './App.css'
import Display from './componentes/display'
import Button from './componentes/button'

const initialState = {
  displayValue: '0',
  clear: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class App extends Component {

  state = { ...initialState }

  constructor(props) {
    super(props)
    this.clearDisplay = this.clearDisplay.bind(this)
    this.setOperation = this.setOperation.bind(this)
    this.addDigit = this.addDigit.bind(this)
  }

  clearDisplay() {
    this.setState({ ...initialState })
  }

  setOperation(operation) {
    if (operation === 'x²' || operation === '√') {
      const values = [...this.state.values]
      values[0] = this.solveExpression(operation, values[0])

      if (isNaN(values[0]) || !isFinite(values[0])) {
        this.clearDisplay()
        return
      }
      
      values[1] = 0

      this.setState({
        displayValue: values[0],
        clear: true,
        current: 1,
        values
      })
    }
    else if (this.state.current === 0) {
      this.setState({
        clear: true,
        operation,
        current: 1
      })
    }
    else {
      const isEquals = operation === '='

      let currentOperation = this.state.operation

      if (this.state.operation == null) {
        currentOperation = operation

        this.setState({
          clear: !isEquals,
          operation: isEquals ? null : operation,
        })

        return
      }

      const values = [...this.state.values]

      values[0] = this.solveExpression(currentOperation, values[0], values[1])

      if (isNaN(values[0]) || !isFinite(values[0])) {
        this.clearDisplay()
        return
      }

      values[1] = 0

      this.setState({
        displayValue: values[0],
        clear: !isEquals,
        operation: isEquals ? null : operation,
        values,
        current: isEquals ? 0 : 1
      })
    }
  }

  solveExpression(operator, numberOne, numberTwo) {
    let result = 0
    switch (operator) {
      case '+': return numberOne + numberTwo
      case '-': return numberOne - numberTwo
      case '/':
        result = numberOne / numberTwo
        return Number.isInteger(result) ? result : parseFloat(result.toFixed(5))
      case '*': return numberOne * numberTwo
      case '√':
        result = Math.sqrt(numberOne)
        return Number.isInteger(result) ? result : parseFloat(result.toFixed(5))
      case 'x²': return numberOne ** 2
      default: return result
    }

  }

  addDigit(digit) {
    if (digit === '.' && this.state.displayValue.includes('.')) {
      return
    }

    const clear = this.state.displayValue === '0' || this.state.clear
    const currentValue = clear ? '' : this.state.displayValue
    const displayValue = currentValue + digit
    this.setState({ displayValue, clear: false })

    if (digit !== '.') {
      const index = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[index] = newValue
      this.setState({ values })
      console.log(values);
    }
  }

  render() {
    return (
      <div className="container">
        <Display value={this.state.displayValue} />
        <div className="buttons">
          <Button value='7' click={this.addDigit} />
          <Button value='8' click={this.addDigit} />
          <Button value='9' click={this.addDigit} />
          <Button value='/' click={this.setOperation} operation />
          <Button value='AC' click={this.clearDisplay} operation />
          <Button value='4' click={this.addDigit} />
          <Button value='5' click={this.addDigit} />
          <Button value='6' click={this.addDigit} />
          <Button value='+' click={this.setOperation} operation />
          <Button value='-' click={this.setOperation} operation />
          <Button value='1' click={this.addDigit} />
          <Button value='2' click={this.addDigit} />
          <Button value='3' click={this.addDigit} />
          <Button value='x²' click={this.setOperation} operation />
          <Button value='*' click={this.setOperation} operation />
          <Button value='0' click={this.addDigit} double downleft />
          <Button value='.' click={this.addDigit} />
          <Button value='√' click={this.setOperation} operation />
          <Button value='=' click={this.setOperation} operation downright />
        </div>
      </div>)
  }
}