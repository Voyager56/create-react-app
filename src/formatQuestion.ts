export const formatQuestion = (question:string) => {
    
    question = question.replace(/&ldquo;/g, '"');
    question = question.replace(/&rdquo;/g, '"');
    question = question.replace(/&quot;/g, "'");
    question = question.replace(/&#039;/g, "'");
    question = question.replace(/&amp;/g, '&');
    question = question.replace(/&hellip;/g, '...');
    question = question.replace(/&mdash;/g, '-');
    question = question.replace(/&lsquo;/g, "'");
    question = question.replace(/&rsquo;/g, "'");
    return question;
}

export const formatAnswers = (answers:[string]) => {
    answers.forEach(ans => {
        ans = ans.replace(/&ldquo;/g, '"');
        ans = ans.replace(/&rdquo;/g, '"');
        ans = ans.replace(/&quot;/g, "'");
        ans = ans.replace(/&#039;/g, "'");
        ans = ans.replace(/&amp;/g, '&');
        ans = ans.replace(/&hellip;/g, '...');
        ans = ans.replace(/&mdash;/g, '-');
        ans = ans.replace(/&lsquo;/g, "'");
        ans = ans.replace(/&rsquo;/g, "'");
    });
    return answers;
}
export const formatCorrectAnswer = (correctAnswer:string) => {
    correctAnswer = correctAnswer.replace(/&ldquo;/g, '"');
    correctAnswer = correctAnswer.replace(/&rdquo;/g, '"');
    correctAnswer = correctAnswer.replace(/&quot;/g, "'");
    correctAnswer = correctAnswer.replace(/&#039;/g, "'");
    correctAnswer = correctAnswer.replace(/&amp;/g, '&');
    correctAnswer = correctAnswer.replace(/&hellip;/g, '...');
    correctAnswer = correctAnswer.replace(/&mdash;/g, '-');
    correctAnswer = correctAnswer.replace(/&lsquo;/g, "'");
    correctAnswer = correctAnswer.replace(/&rsquo;/g, "'");
    
    return correctAnswer;
}