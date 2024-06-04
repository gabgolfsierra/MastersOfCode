import { Controller, Get, Post, Body, Request, Response } from '@nestjs/common';

import { exec } from 'child_process';
import { CodeService } from './code.service';
const fs = require('fs');

@Controller('/challenge')
export class CodeController {
  constructor(private readonly codeService: CodeService) { }


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
}
