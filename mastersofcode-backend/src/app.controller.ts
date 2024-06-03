import { Controller, Get, Post, Body, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { exec } from 'child_process';
const fs = require('fs');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/code')
  async CodeReceiver(@Request() req, @Response() res): Promise<any> {
    const userCode = req.body.code;

    // Escrever o código do usuário em um arquivo
    fs.writeFileSync('userCode.js', userCode);

    // Criar um arquivo de teste que importe e teste a função do usuário
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
    
        it('should return 0 for sum(0, 0)', () => {
          assert.strictEqual(sum(0, 0), 0, 'The sum of 0 and 0 should be 0');
        });


      });
    `;
    fs.writeFileSync('test.js', testCode);

    // Executar os testes usando Mocha
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

      // Limpar arquivos temporários
      fs.unlinkSync('userCode.js');
      fs.unlinkSync('test.js');
    });
  }
}
