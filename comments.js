// Create web server

// 1. Import modules
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

// 2. Create web server
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// 3. Set up routing
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        res.send(data);
    });
});

app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        const comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
            }
            res.send('Comment added successfully');
        });
    });
});

// 4. Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// 5. Test with Postman
// - Send a GET request to http://localhost:3000/comments to get all comments
// - Send a POST request to http://localhost:3000/comments with a comment in the body to add a comment

// 6. Test with browser
// - Open browser and go to http://localhost:3000/comments to see all comments

// 7. Test with curl
// - Open terminal and run the following commands
// - curl http://localhost:3000/comments
// - curl -X POST -d "comment=This is a new comment" http://localhost:3000/comments
// - curl http://localhost:3000/comments