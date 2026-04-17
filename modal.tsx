import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  // --- THE BRAIN (State) ---
  const [input, setInput] = useState('0');
  const [firstInput, setFirstInput] = useState('');
  const [operator, setOperator] = useState('');

  // --- THE LOGIC (Functions) ---

  // Added ': string' to tell TypeScript that digit is text
  const handleDigit = (digit: string) => {
    if (input.length >= 10) return;

    if (input === '0' && digit !== '.') {
      setInput(digit);
    } else if (input === '0' && digit === '.') {
      setInput('0.');
    } else {
      if (digit === '.' && input.includes('.')) return;
      setInput(input + digit);
    }
  };

  // Added ': string' to tell TypeScript that op is text
  const handleOperator = (op: string) => {
    setFirstInput(input);
    setOperator(op);
    setInput('0');
  };

  const handleEqual = () => {
    const a = parseFloat(firstInput);
    const b = parseFloat(input);
    let result: number | string = 0;

    switch (operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': 
        result = b === 0 ? 'Error' : a / b;
        break;
      default: return;
    }

    setInput(result.toString());
    setFirstInput('');
    setOperator('');
  };

  const handleClear = () => {
    setInput('0');
    setFirstInput('');
    setOperator('');
  };

  const handlePercent = () => {
    const val = parseFloat(input) / 100;
    setInput(val.toString());
  };

  const handleSign = () => {
    const val = parseFloat(input) * -1;
    setInput(val.toString());
  };

  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={styles.calculatorCase}>
        
        <View style={styles.screen}>
          <Text style={styles.limitText}>Limit: 10</Text>
          <Text style={styles.expressionText} numberOfLines={1}>
            {firstInput && operator ? `${firstInput} ${operator}` : ''}
          </Text>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
            {input}
          </Text>
        </View>

        <View style={styles.keypad}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.funcButton]} onPress={handleClear}>
              <Text style={styles.funcButtonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.funcButton]} onPress={handleSign}>
              <Text style={styles.funcButtonText}>+/-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.funcButton]} onPress={handlePercent}>
              <Text style={styles.funcButtonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('/')}>
              <Text style={styles.buttonText}>÷</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleDigit('7')}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDigit('8')}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDigit('9')}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('*')}>
              <Text style={styles.buttonText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleDigit('4')}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDigit('5')}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDigit('6')}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('-')}>
              <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleDigit('1')}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDigit('2')}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDigit('3')}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperator('+')}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { width: '47%' }]} onPress={() => handleDigit('0')}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDigit('.')}>
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={handleEqual}>
              <Text style={styles.buttonText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculatorCase: {
    width: 340,
    backgroundColor: '#1c1c1c',
    borderRadius: 40,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  screen: {
    backgroundColor: '#aebf8b',
    height: 110,
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 25,
    borderWidth: 4,
    borderColor: '#8b9b6b',
    position: 'relative',
  },
  limitText: {
    position: 'absolute',
    left: 15,
    top: 10,
    fontSize: 12,
    color: '#556644',
    fontWeight: 'bold',
  },
  expressionText: {
    fontSize: 16,
    color: '#556644',
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  displayText: {
    color: '#333',
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  keypad: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#444',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  funcButton: {
    backgroundColor: '#d4d4d2',
  },
  operatorButton: {
    backgroundColor: '#ff9f0a',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  funcButtonText: {
    color: '#1c1c1c',
    fontSize: 22,
    fontWeight: 'bold',
  },
});