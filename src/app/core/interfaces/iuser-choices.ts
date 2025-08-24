export interface IuserChoices {
    answers: Answer[];
    type: string;
    _id: string;
    question: string;
    correct: string;
    userChoice:string;
}
export interface Answer {
    answer: string;
    key: string;
}