const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ bye: 'buddy' });
});


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log('Running on ' + PORT);
});
