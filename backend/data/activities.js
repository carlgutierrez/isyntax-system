// dueDate: '2021-10-31T17:00',
// new Date(2021, 11, 25)

const activities = [
  {
    title: 'Cubic X',
    items: 100,
    dueDate: '2021-12-25T07:00:00.000Z',
    subject: 'ITEC 101',
    status: 'Todo',
    // TODO _id
    postedBy: 'Carl John Gutierrez',
    instructions:
      '#### Instruction\nWrite a program which calculates the cube of a given integer x.\n\n#### Input\nAn integer x is given in a line.\n\n#### Output\nPrint the cube of x in a line.\n\n#### Sample Input 1\n```\n2\n```\n#### Sample Output 1\n```\n8\n```',
    testCases: [
      {
        testNumber: 1,
        input: '2',
        output: '8',
      },
      {
        testNumber: 2,
        input: '4',
        output: '64',
      },
      {
        testNumber: 3,
        input: '15',
        output: '3375',
      },
    ],
  },
  {
    title: 'Sum of 2 Integers',
    items: 50,
    dueDate: 'noDueDate',
    subject: 'ITEC 102',
    status: 'Todo',
    postedBy: 'Ronnel Javier',
    instructions:
      '#### **Instruction**\nWrite a code that returns the sum of the 2 inputted integers.\n##### Sample Input 1\n```\n6\n9\n```\n##### Sample Output 1\n```\n15\n```\n##### Sample Input 2\n```\n106\n56\n```\n##### Sample Output 2\n```\n162\n```',
    testCases: [
      {
        testNumber: 1,
        input: '6\n\n9',
        output: '15',
      },
      {
        testNumber: 2,
        input: '106\n\n56',
        output: '162',
      },
      {
        testNumber: 2,
        input: '2021\n\n2022',
        output: '4043',
      },
    ],
  },
  {
    title: 'Even or Odd',
    items: 75,
    dueDate: '2021-12-25T07:00:00.000Z',
    subject: 'ITEC 103',
    status: 'Todo',
    postedBy: 'Jhon Stewell Bonifacio',
    instructions:
      "#### **Instruction**\nWrite a code that returns 'even' or 'odd' based on what type is the number inputted.\n##### Sample Input 1\n```\n3\n```\n##### Sample Output 1\n```\nodd\n```\n##### Sample Input 2\n```\n10\n```\n##### Sample Output 2\n```\neven\n```",
    testCases: [
      {
        testNumber: 1,
        input: '3',
        output: 'odd',
      },
      {
        testNumber: 2,
        input: '10',
        output: 'even',
      },
      {
        testNumber: 2,
        input: '75',
        output: 'odd',
      },
    ],
  },
];

export default activities;
