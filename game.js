import { questions } from "./questions.js";

function getRandomQuestions() {
    {
       let arr = questions.map(function pullLevels(element) {
            return element.level;
        });
       let mySet = new Set(arr);
       var levels = [...mySet].sort();
    }
    var randomQuestions = [];

    levels.forEach(function pickOneRandomQuestionPerLevel(level) {

        let questionArr = questions.filter(function equals(question) {
            return (question.level === level);
        });
        const rng = Math.floor (Math.random() * questionArr.length);
        randomQuestions.push(questionArr[rng]);
      });
      return randomQuestions;
}

export var matspelet = {

    randomQuestions: [],
    current : undefined,
    *[Symbol.iterator]() {
        var question = this.randomQuestions.shift();
        if (question) {
            this.current = question;
            yield question;
        }
    },
    init() {
        this.randomQuestions = getRandomQuestions();
        console.log(this.randomQuestions); //DEBUG
    }
};
