import { Controller, Get, Post, Body, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { exec } from 'child_process';
const fs = require('fs');

@Controller('/challenge')
export class AppController {
  constructor(private readonly appService: AppService) { }

  //Sum Challenge
  @Post('/1')
  async CodeReceiver(@Request() req, @Response() res): Promise<any> {
    const userCode = req.body.code;


    fs.writeFileSync('userCode.js', userCode);

    const testCode = `
      const assert = require('assert');
      const { sum } = require('./userCode');
      
      describe('sum function', () => {
        it('should return 5 for sum(2, 3)', () => {
          assert.strictEqual(sum(2, 3), 5, 'The sum of 2 and 3 should be 5');
        });
    
        it('should return -3 for sum(-1, -2)', () => {
          assert.strictEqual(sum(-1, -2), -3, 'The sum of -1 and -2 should be -3');
        });
    
        it('should return 0 for sum(9, 1)', () => {
          assert.strictEqual(sum(9, 1), 10, 'The sum of 9 and 1 should be 10');
        });


      });
    `;
    fs.writeFileSync('test.js', testCode);

    exec('npx mocha test.js --reporter json', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar os testes: ${stderr}`);
        try {
          const testResults = JSON.parse(stdout);
          res.status(200).json({ success: true, output: testResults });
        } catch (parseError) {
          res.status(400).json({ success: false, output: stderr });
        }
      } else {
        const testResults = JSON.parse(stdout);
        console.log(`Saída dos testes: ${stdout}`);
        res.status(200).json({ success: true, output: testResults });
      }

      fs.unlinkSync('userCode.js');
      fs.unlinkSync('test.js');
    });
  }

  //FizzBuzz Challenge
  @Post('/2')
  async CodeReceiver2(@Request() req, @Response() res): Promise<any> {
    const userCode = req.body.code;


    fs.writeFileSync('userCode.js', userCode);

    const testCode = `
  const assert = require('assert');
  const { fizzBuzz } = require('./userCode');

describe('fizzBuzz function', () => {
    it('should return ["1", "2", "Fizz"] for fizzBuzz(3)', () => {
        assert.deepStrictEqual(fizzBuzz(3), ["1", "2", "Fizz"], 'The output for n=3 should be ["1", "2", "Fizz"]');
    });

    it('should return ["1", "2", "Fizz", "4", "Buzz"] for fizzBuzz(5)', () => {
        assert.deepStrictEqual(fizzBuzz(5), ["1", "2", "Fizz", "4", "Buzz"], 'The output for n=5 should be ["1", "2", "Fizz", "4", "Buzz"]');
    });

    it('should return ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"] for fizzBuzz(15)', () => {
        assert.deepStrictEqual(fizzBuzz(15), ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"], 'The output for n=15 should be ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]');
    });

    it('should return ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz"] for fizzBuzz(10)', () => {
        assert.deepStrictEqual(fizzBuzz(10), ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz"], 'The output for n=10 should be ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz"]');
    });

    it('should return ["1"] for fizzBuzz(1)', () => {
        assert.deepStrictEqual(fizzBuzz(1), ["1"], 'The output for n=1 should be ["1"]');
    });
});
`;
    fs.writeFileSync('test.js', testCode);

    exec('npx mocha test.js --reporter json', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar os testes: ${stderr}`);
        try {
          const testResults = JSON.parse(stdout);
          res.status(200).json({ success: true, output: testResults });
        } catch (parseError) {
          res.status(400).json({ success: false, output: stderr });
        }
      } else {
        const testResults = JSON.parse(stdout);
        console.log(`Saída dos testes: ${stdout}`);
        res.status(200).json({ success: true, output: testResults });
      }

      fs.unlinkSync('userCode.js');
      fs.unlinkSync('test.js');
    });
  }

  //Reverse String Challenge
  @Post('/3')
  async CodeReceiver3(@Request() req, @Response() res): Promise<any> {
    const userCode = req.body.code;


    fs.writeFileSync('userCode.js', userCode);

    const testCode = `
  const assert = require('assert');
  const { reverseString } = require('./userCode');

  describe('reverseString function', () => {
    it('should reverse ["h", "e", "l", "l", "o"] to ["o", "l", "l", "e", "h"]', () => {
      let input = ["h", "e", "l", "l", "o"];
      let expected = ["o", "l", "l", "e", "h"];
      reverseString(input);
      assert.deepStrictEqual(input, expected, 'The reversed array should be ["o", "l", "l", "e", "h"]');
    });

    it('should reverse ["H", "a", "n", "n", "a", "h"] to ["h", "a", "n", "n", "a", "H"]', () => {
      let input = ["H", "a", "n", "n", "a", "h"];
      let expected = ["h", "a", "n", "n", "a", "H"];
      reverseString(input);
      assert.deepStrictEqual(input, expected, 'The reversed array should be ["h", "a", "n", "n", "a", "H"]');
    });

    it('should handle an empty array', () => {
      let input = [];
      let expected = [];
      reverseString(input);
      assert.deepStrictEqual(input, expected, 'The reversed array should be []');
    });

    it('should handle a single character array ["a"]', () => {
      let input = ["a"];
      let expected = ["a"];
      reverseString(input);
      assert.deepStrictEqual(input, expected, 'The reversed array should be ["a"]');
    });

    it('should reverse ["a", "b", "c", "d"] to ["d", "c", "b", "a"]', () => {
      let input = ["a", "b", "c", "d"];
      let expected = ["d", "c", "b", "a"];
      reverseString(input);
      assert.deepStrictEqual(input, expected, 'The reversed array should be ["d", "c", "b", "a"]');
    });
  });
`;
    fs.writeFileSync('test.js', testCode);

    exec('npx mocha test.js --reporter json', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar os testes: ${stderr}`);
        try {
          const testResults = JSON.parse(stdout);
          res.status(200).json({ success: true, output: testResults });
        } catch (parseError) {
          res.status(400).json({ success: false, output: stderr });
        }
      } else {
        const testResults = JSON.parse(stdout);
        console.log(`Saída dos testes: ${stdout}`);
        res.status(200).json({ success: true, output: testResults });
      }

      fs.unlinkSync('userCode.js');
      fs.unlinkSync('test.js');
    });
  }









}