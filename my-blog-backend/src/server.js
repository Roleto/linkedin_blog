import express from 'express';
import { db, connectToDb } from './db.js';

const app = express();
app.use(express.json());


connectToDb(() =>{
    console.log('Succesfuly conected to database');
    app.listen(8000, () => {
        console.log('Server is Listening on port 8000')
    });
});

app.get('/api/articles/:name', async (req,res) =>{
    const {name} = req.params;

    const article = await db.collection('articles').findOne({name});
    if(article){
        res.json(article);
    }else{
        res.sendStatus(404);
    }
});

app.post('/api/articles/:name/comments', async (req,res) =>{
    const { name } = req.params;
    const { postedBy,text} = req.body;
    
    
    await db.collection('articles').updateOne({name},{
        $push: {comments : {postedBy,text}},
    });

    const article = await db.collection('articles').findOne({name});
    
    if(article){
        res.send(article.comments);
    }else{
        res.send('That article doesn\'t exist');
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    
    await db.collection('articles').updateOne({name}, {
        $inc: {upvotes : 1},
    })
    
    const article = await db.collection('articles').findOne({name});
     if(article){
         res.json(article);
     }else{
         res.send('That article doesn\'t exist');
     }
});









    // app.get('/hello', (req, res) => {
    //     res.send('Hello!')
    // })
    
    // app.get('/hello/:name', (req, res) => {
    //     const { name } = req.params;
    //     res.send(`Hello ${name}!`)
    // })
    
    
    // app.post('/hali', (req, res) => {
    //     res.send(`Hali! ${req.body.name}`);
    // })