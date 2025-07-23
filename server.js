const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const schemes = require('./data/schemes.json');

app.use(cors());
app.use(express.json());

app.get('/api/schemes', (req, res) => {
    const { age, gender, income, state, problem } = req.body;

    const matchedSchemes = schemes.filter(scheme =>
        (!scheme.age || age >= scheme.age.min && age <= scheme.age.max) &&
        (!scheme.gender || scheme.gender === gender || scheme.gender === "All") &&
        (!scheme.income || income <= scheme.income) &&
        (!scheme.state || scheme.state === state || scheme.state === "All") &&
        (!scheme.problem || scheme.problem.toLowerCase() === problem.toLowerCase())
    );

    res.json(matchedSchemes);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
