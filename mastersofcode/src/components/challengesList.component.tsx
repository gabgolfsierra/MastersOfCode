
export interface Challenge {
  id: number;
  name: string;
  difficulty: string;
  points: string;
}


const challenges: Challenge[] = [
  { id: 1, name: "Add Two Numbers", difficulty: "Intern", points: "25 points" },
  { id: 2, name: "FizzBuzz", difficulty: "Junior", points: "50 points" },
  { id: 3, name: "Reverse String", difficulty: "Junior", points: "50 points" },
  { id: 4, name: "Palindrome Linked List", difficulty: "Junior", points: "50 points" },
  { id: 5, name: "Less Than 100?", difficulty: "Intern", points: "25 points" },
  { id: 6, name: "Testando", difficulty: "Middle", points: "100 points" },
  { id: 7, name: "Testando", difficulty: "Senior", points: "500 points" },
  { id: 8, name: "Testando", difficulty: "Senior", points: "500 points" },
  { id: 9, name: "Testando", difficulty: "Senior", points: "500 points" },
];



  export default challenges;