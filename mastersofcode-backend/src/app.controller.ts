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

  //Palindrome Linked List Challenge
  @Post('/4')
  async CodeReceiver4(@Request() req, @Response() res): Promise<any> {
    const userCode = req.body.code;


    fs.writeFileSync('userCode.js', userCode);

    const testCode = `
const assert = require('assert');
const { isPalindrome } = require('./userCode');

describe('isPalindrome function', () => {
  it('should return true for [1, 2, 2, 1]', () => {
    const head = createLinkedList([1, 2, 2, 1]);
    assert.strictEqual(isPalindrome(head), true, 'Expected [1, 2, 2, 1] to be a palindrome');
  });

  it('should return false for [1, 2]', () => {
    const head = createLinkedList([1, 2]);
    assert.strictEqual(isPalindrome(head), false, 'Expected [1, 2] not to be a palindrome');
  });

  it('should return true for [] (empty list)', () => {
    const head = null;
    assert.strictEqual(isPalindrome(head), true, 'Expected empty list to be a palindrome');
  });

  it('should return true for [1] (single-node list)', () => {
    const head = new ListNode(1);
    assert.strictEqual(isPalindrome(head), true, 'Expected [1] to be a palindrome');
  });

  function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  function createLinkedList(arr) {
    let head = null;
    let current = null;
    for (let val of arr) {
      const node = new ListNode(val);
      if (!head) {
        head = node;
        current = node;
      } else {
        current.next = node;
        current = node;
      }
    }
    return head;
  }
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

  //Less Than 100? Challenge
  @Post('/5')
  async CodeReceiver5(@Request() req, @Response() res): Promise<any> {
    const userCode = req.body.code;


    fs.writeFileSync('userCode.js', userCode);

    const testCode = `
    const assert = require('assert');
    const { lessThan100 } = require('./userCode');
    describe('lessThan100 function', () => {
    it('should return true for sum less than 100 (22, 15)', () => {
    assert.strictEqual(lessThan100(22, 15), true, 'Sum of 22 and 15 should be less than 100');
    });

    it('should return false for sum greater than 100 (83, 34)', () => {
    assert.strictEqual(lessThan100(83, 34), false, 'Sum of 83 and 34 should be greater than 100');
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


 // Integer to English Words Challenge

 @Post('/7')
  async CodeReceiver7(@Request() req, @Response() res): Promise<any> {
    const userCode = req.body.code;


    fs.writeFileSync('userCode.js', userCode);

    const testCode = `
    const assert = require('assert');
    const { numberToWords } = require('./userCode');
    
    describe('numberToWords function', () => {
      it('should return "One Hundred Twenty Three" for numberToWords(123)', () => {
        assert.strictEqual(numberToWords(123), 'One Hundred Twenty Three', 'The number 123 should be converted to "One Hundred Twenty Three"');
      });
  
      it('should return "Twelve Thousand Three Hundred Forty Five" for numberToWords(12345)', () => {
        assert.strictEqual(numberToWords(12345), 'Twelve Thousand Three Hundred Forty Five', 'The number 12345 should be converted to "Twelve Thousand Three Hundred Forty Five"');
      });
  
      it('should return "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven" for numberToWords(1234567)', () => {
        assert.strictEqual(numberToWords(1234567), 'One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven', 'The number 1234567 should be converted to "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"');
      });

      it('should return "Zero" for numberToWords(0)', () => {
        assert.strictEqual(numberToWords(0), 'Zero', 'The number 0 should be converted to "Zero"');
      });

      it('should return "One Thousand" for numberToWords(1000)', () => {
        assert.strictEqual(numberToWords(1000), 'One Thousand', 'The number 1000 should be converted to "One Thousand"');
      });

      it('should return "One Million" for numberToWords(1000000)', () => {
        assert.strictEqual(numberToWords(1000000), 'One Million', 'The number 1000000 should be converted to "One Million"');
      });

      it('should return "Ninety Nine" for numberToWords(99)', () => {
        assert.strictEqual(numberToWords(99), 'Ninety Nine', 'The number 99 should be converted to "Ninety Nine"');
      });

      it('should return "Seven Hundred Twenty Three Thousand Eight Hundred Forty Five" for numberToWords(723845)', () => {
        assert.strictEqual(numberToWords(723845), 'Seven Hundred Twenty Three Thousand Eight Hundred Forty Five', 'The number 723845 should be converted to "Seven Hundred Twenty Three Thousand Eight Hundred Forty Five"');
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


  // SuperPow Challenge
  @Post('/8')
  async CodeReceiver8(@Request() req, @Response() res): Promise<any> {
    const userCode = req.body.code;


    fs.writeFileSync('userCode.js', userCode);

    const testCode = `
      const assert = require('assert');
      const { superPow } = require('./userCode');
      
      describe('superPow function', () => {
        it('should return 8 for superPow(2, [3])', () => {
          assert.strictEqual(superPow(2, [3]), 8, 'The result of 2^3 mod 1337 should be 8');
        });
    
        it('should return 1024 for superPow(2, [1,0])', () => {
          assert.strictEqual(superPow(2, [1, 0]), 1024, 'The result of 2^10 mod 1337 should be 1024');
        });
    
        it('should return 1 for superPow(1, [4, 3, 3, 8, 5, 2])', () => {
          assert.strictEqual(superPow(1, [4, 3, 3, 8, 5, 2]), 1, 'The result of 1^433852 mod 1337 should be 1');
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