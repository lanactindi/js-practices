const fs = require('fs');
const file = require('./prompt');
const { title } = require('process');
const inquirer = require('inquirer');
const uuid = require('uuid');
class Memo {
    constructor(){
        this.path = './memos.json';
        this.memos = JSON.parse(fs.readFileSync(this.path));
    }
    list(){
        const memos = this.memos.map(memo => ({ name: memo.title, value: memo.id }));
        return memos;
    }
    display(id){
       const memo = this.memos.find(memo => memo.id === id);
       console.log('タイトル:', memo.title);
       console.log('内容:', memo.content)
    }
    add(title, content){
        const memo = { id: uuid.v1(), title, content }
        let memos = this.memos;
        memos.push(memo)
        fs.writeFileSync(this.path, JSON.stringify(memos));
        console.log(`${memo.title}を追加しました！`)
    }
    delete(id){
        const memos = this.memos.filter(memo => memo.id !== id);
        fs.writeFileSync(this.path, JSON.stringify(memos));
        console.log('メモを追加しました！')
    }
    update(id, newTitle, newContent){
        let memos = this.memos;
        const memoIndex = memos.findIndex(memo => memo.id === id);
        memos[memoIndex].title = newTitle;
        memos[memoIndex].content = newContent;
        fs.writeFileSync(this.path, JSON.stringify(memos));
        console.log('メモを変更しました！')
    }
}

module.exports = { Memo }