const fs = require('fs');
const Inquirer = require('inquirer')
const { Memo } = require('./memo');
class Prompt {
    constructor(){
        this.memo = new Memo();
    }
    start(){
        let choices = this.memo.list();
        choices.push({
            name: 'メモを追加する',
            value: 'add'
        })
        Inquirer.prompt([{
            type: 'list',
            name: 'command',
            message: 'メモを選んでください',
            choices: choices
        }]).then(choice => {
            if(choice.command == 'add'){
                return this.addMemo();
            }
            Inquirer.prompt([{
                type: 'list',
                name: 'choice',
                message: '何をしていですか？',
                choices: [
                    {
                        name: 'メモの詳細を見る',
                        value: 'display'
                    },
                    {
                        name: 'メモを削除する',
                        value: 'delete'
                    },
                    {
                        name: 'メモを編集する',
                        value: 'update'
                    }
                ]
            }]).then(answer => {
                switch(answer.choice){
                    case 'display': 
                        this.memo.display(choice.command);
                        break;
                    case 'delete':
                        this.memo.delete(choice.command);
                        break;
                    case 'update':
                        this.updateMemo(choice.command);
                        break;                        
                }
            })
        })
    }

    addMemo(){
        Inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'メモのタイトルを入力してください',
                validate: titleInput => {
                   if(titleInput){
                       return true;
                   }
                   else {
                       console.log('まだタイトルを入れてないので確認してください');
                       return false;
                   }
                }
            },
            {
                type: 'input',
                name: 'content',
                message: 'メモの内容を入力してください',
                validate: contentInput => {
                   if(contentInput){
                       return true;
                   }
                   else {
                       console.log('まだ内容を入れてないので確認してください');
                       return false;
                   }
                }
            }
        ]).then(answers => {
            this.memo.add(answers.title, answers.content);
        })
    }

    updateMemo(id){
        Inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'あたらなタイトルを入力してください',
                validate: titleInput => {
                   if(titleInput){
                       return true;
                   }
                   else {
                       console.log('まだタイトルを入れてないので確認してください');
                       return false;
                   }
                }
            },
            {
                type: 'input',
                name: 'content',
                message: '新たな内容を入力してください',
                validate: contentInput => {
                   if(contentInput){
                       return true;
                   }
                   else {
                       console.log('まだ内容を入れてないので確認してください');
                       return false;
                   }
                }
            }
        ]).then(answers => {
            this.memo.update(id, answers.title, answers.content);
        })
    }
}

(new Prompt).start()