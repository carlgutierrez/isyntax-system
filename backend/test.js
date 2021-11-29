// import markdownIt from 'markdown-it';
const markdownIt = require('markdown-it');

const md = new markdownIt();

const result = md.render('# Aizu Online Judge Code Scraper\n\nA JavaScript based scraper used to get code submissions using [Aizu Online Judge API](http://developers.u-aizu.ac.jp/index)\n\n## Usage\n\nchange the `problemId`, `language` and `submissionSize` in [index.js](./index.js)\n\n| Variable       |  Type  | Required |                                          Description                                          |  Example   |\n| -------------- | :----: | :------: | :-------------------------------------------------------------------------------------------: | :--------: |\n| problemId      | string |   true   |  Problem ID from [Aizu Online Judge Courses](https://onlinejudge.u-aizu.ac.jp/courses/list)   | `ITP1_2_C` |\n| language       | string |   true   |                              Programming language of submission                               | `Python3`  |\n| submissionSize | number |   true   | The size of the submission list request, can be greater than the total number of submissions. |   `500`    |\n\nto run code type in terminal\n\n```console\n$ npm install\n$ node index.js\n```\n\n## Output\n\nlist of codes will be save on [codes.tsv](./codes.tsv)\n\n| Name    | Type   | Description               |\n| ------- | ------ | ------------------------- |\n| judgeId | number | source code submission ID |\n| code    | string | stringified source code   |"');

console.log(result);
