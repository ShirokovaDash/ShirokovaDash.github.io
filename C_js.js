class Calculator {

    blok = false

    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {//Обнуление
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {//Удаление 
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {//склеивание цифр
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {//выбор операции
    
      if (this.currentOperand === '') {
        switch (this.operation) {
          case 'sin':
          break

          case 'cos':
          break

          case 'tan':
          break

          case 'ctg':
          break

          case 'R':
          break

          case 'G':
          break

          default:
          return
        }
      }

      if (this.previousOperand !== '') {
        this.compute()
      }
      
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {//Математические аперации
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)){
        switch (this.operation) {
          case 'sin':
          computation = Math.sin(prev)
          break
        case 'cos':
          computation = Math.cos(prev)
          break
        case 'tan':
          computation = Math.tan(prev)
          break
        case 'ctg':
          computation = Math.ctg(prev)
          break
        case 'R':
          computation = prev * 3.14 / 180
          break
        case 'G':
          computation = prev * 180 / 3.14
          break

        default:
          return
        }
      } 

      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break

        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break

        // default:
        //   return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {//обновление вывода калькулятора
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  




  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  

  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {//Нажатие на цифру
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {//Нажатие на операцию!!!!!
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)//
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {//Нажатие на равно
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {//Нажатие на АС
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {//Нажатие на удалить
    calculator.delete()
    calculator.updateDisplay()
  })