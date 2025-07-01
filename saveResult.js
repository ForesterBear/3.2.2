
const fs = require('fs');
const path = require('path');

const resultSaver = (req, res, next) => {
    const { username, ...answers } = req.body;
    const data = JSON.parse(fs.readFileSync('test.json', 'utf-8'));
    const quiz = Object.values(data);
    let points = 0;
    quiz.forEach((q, i) => {
        if (answers[`q${i}`] === q.correct) {
            points++;
        }
    });
    const entry = {
        username,
        date: new Date(),
        score: points,
        total: quiz.length
    };
    const file = path.join(__dirname, 'result.json');
    let allResults = [];
    if (fs.existsSync(file)) {
        const prev = fs.readFileSync(file, "utf-8");
        allResults = JSON.parse(prev);
    }
    allResults.push(entry);
    fs.writeFileSync(file, JSON.stringify(allResults, null, 2));
    req.score = points;
    req.total = quiz.length;
    req.username = username;
    next();
};

module.exports = resultSaver;