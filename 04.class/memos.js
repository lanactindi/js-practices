const fs = require("fs");
const uuid = require("uuid");
class Memos {
  constructor() {
    this.path = "./memos.json";
    this.memos = JSON.parse(fs.readFileSync(this.path));
  }
  list() {
    const memos = this.memos.map((memo) => ({
      name: memo.title,
      value: memo.id,
    }));
    return memos;
  }
  display(id) {
    const memo = this.memos.find((memo) => memo.id === id);
    return memo;
  }
  add(title, content) {
    const memo = { id: uuid.v1(), title, content };
    let memos = this.memos;
    memos.push(memo);
    fs.writeFileSync(this.path, JSON.stringify(memos));
  }
  delete(id) {
    const memos = this.memos.filter((memo) => memo.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(memos));
  }
  update(id, newTitle, newContent) {
    let memos = this.memos;
    const memoIndex = memos.findIndex((memo) => memo.id === id);
    memos[memoIndex].title = newTitle;
    memos[memoIndex].content = newContent;
    fs.writeFileSync(this.path, JSON.stringify(memos));
  }
}

module.exports = { Memos };
