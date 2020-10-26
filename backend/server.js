const express = require('express')
const cors = require('cors')
const { response } = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/Todo')

mongoose.connect('mongodb://127.0.0.1:27017/todos',{useNewUrlParser:true})

mongoose.connection.once('open', ()=>{
    console.log("connection to mongo stablished succesfully")
})
const PORT = 4000;

const app = express()
app.use(cors())

app.use(express.json())

app.get('/', (req, res) =>{
    Todo.find((err, todos) =>{
        if(err){
            console.log(err);
        }
        else{
            res.json(todos);
        }
    });
});

app.get('/:id', (req, res) =>{
    const id = req.params.id;
    Todo.findById(id,(err,todo)=>{
        res.json(todo);
    });
});

app.post('/create', (req, res) =>{
     const todo = new Todo(req.body);
     todo.save().then((todo) => {
         res.json(todo)
     }).catch(err =>{
         res.status(500).send(err.mongoose)
     })
});

app.post('/:id', (req, res)=>{
    const id = req.params.id;
    Todo.findById(id, (err, todo)=>{
        if(!todo){
            res.status(404).send("Todo not found");
        }
        else{
            todo.text = req.body.text;
            todo.save().then(todo =>{
                res.json(todo)
            }).catch(err => res.status(500).send(err.message));
        }
    })
})

app.delete("/:id",async (req, res) =>{
    const{id}=req.params;
    await Todo.deleteOne({_id:id});
    res.status(204).send();
});

app.listen(PORT, () =>{
    console.log("server is running on port 4000")
})