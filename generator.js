var matspelet = {

    questions : [],
    [Symbol.iterator] : function *generateQuestion() {
        var question = questions.shift();
        yield question;
    }
};
