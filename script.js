class Calculator {
  constructor(previousOperandTextElement, ausgabeTextElement) {
    this.rechnungTextElement = rechnungTextElement
    this.ausgabeTextElement = ausgabeTextElement
    this.clear()
  }

// Alles Löschen//
  clear() {
    this.ausgabe = ''
    this.rechnung = ''
    this.operation = undefined
  }
  // Alles Löschen ende//

// Einzeln Löschen //
  delete() {
    this.ausgabe = this.ausgabe.toString().slice(0, -1)
  }
// Einzeln Löschen ende//

// Maximal ein . und macht die ausgabe zu einem String und fügt eine Nummer(String) hinzu.//
  appendNumber(number) {
    if (number === '.' && this.ausgabe.includes('.')) return
    this.ausgabe = this.ausgabe.toString() + number.toString()
  }
//ende//

//rechnet aus und löscht die Rechnung//
  chooseOperation(operation) {
    if (this.ausgabe === '') return
    if (this.rechnung !== '') {
      this.compute()
    }
    this.operation = operation
    this.rechnung = this.ausgabe
    this.ausgabe = ''
  }
  // ende//

// Berechnung//
  compute() {
    let computation
    const prev = parseFloat(this.rechnung)
    const current = parseFloat(this.ausgabe)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current;
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
      default:
        return
    }
    this.ausgabe = computation
    this.operation = undefined
    this.rechnung = ''
  }
//Berechnung Ende//

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

// lässt die zahlen Anzeigen / Zeigt operation in der Rechnung an//
  updateDisplay() {
    this.ausgabeTextElement.innerText =
      this.getDisplayNumber(this.ausgabe)
    if (this.operation != null) {
      this.rechnungTextElement.innerText =
        `${this.getDisplayNumber(this.rechnung)} ${this.operation}`
    } else {
      this.rechnungTextElement.innerText = ''
    }
  }
}
//ende//

// const definieren//
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const gleichButton = document.querySelector('[data-gleich]')
const delButton = document.querySelector('[data-del]')
const allClearButton = document.querySelector('[data-all-clear]')
const rechnungTextElement = document.querySelector('[data-rechnung]')
const ausgabeTextElement = document.querySelector('[data-ausgabe]')

const calculator = new Calculator(rechnungTextElement, ausgabeTextElement)

//const definieren ende//

// Den Tasten funktionen hinzufügen//
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    document.getElementById('stylesheet').href='styles.css';
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

gleichButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
  document.getElementById('stylesheet').href='style2.css';
})

delButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
