const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json()); 

app.get('/', (req, res)=>{
    res.send({'routes':2, '/todos':'All todo', '/user/:id':'Todo of particular user'})
})
app.get('/todos', (req, res)=>{
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(function (response) {
        let allTodo = [];

        response.data.map((user)=>{
            delete user.userId;
            // data.push(user);
            allTodo.push(user);
        })
        res.send(allTodo);
    })
    .catch(function (error) {
        console.log(error);
    })
})

app.get('/user/:id', async(req, res)=>{
    try{
        let allTodo = []

        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(function (response) {
            allTodo = response.data
        })
        .catch(function (error) {
            console.log(error)
        })

        const userId = req.params.id
        axios.get('https://jsonplaceholder.typicode.com/users', { params: { id: userId } })
        .then(function (response) {
            let user = response.data[0];

            delete user.username
            delete user.address
            delete user.website
            delete user.company
            
            const todo = allTodo.filter(todoitem => todoitem.userId == user.id)
            user.todos = todo
            res.send(user)
        })
        .catch(function (error) {
            console.log(error);
        })

    } catch(e){
        res.status(500).send(e)
    }
})

app.listen(3000, ()=>{
    console.log(`Server is listening on port http://localhost:3000`);
})