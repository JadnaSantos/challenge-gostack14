const { response, request } = require('express');
const express = require('express');
const cors = require('cors');



const { uuid } = require ('uuidv4')

const app = express();

const repositories = []

app.get('/repositories', (require, response) =>{
    
    return response.json(repositories);
    
});

app.post('/repositories', (require, response) =>{
    
    const { title, url, techs} = request.body;

    const repository = {
        id : uuid(),
        title,
        url,
        techs,
        likes: 0,
    }
    repositories.push(repository);

    return response.json(repository);
});


app.put('/repositories/:id', (require, response) =>{
    
    const { id } = request.params;

    const { title, url, techs, likes } = request.body;

    const findIndex =  repositories.findIndex(repository => repository.id == id );

    if (!findIndex == -1) {
        return response.status(400).json({ error: 'No exist'})
    }

    repositories(findIndex) = {
        id,
        title,
        url,
        techs,
        likes:  repositories(findIndex).likes,
    };

    repositories(findIndex) = repository

    return response.json(repository)
});


app.delete('/repositories/:id', (require, response) =>{

    const { id } = request.params;

    const findIndex =  repositories.findIndex(repository => repository.id == id );

    if(findIndex  >= 0) {
        repositories.slice(findIndex, 1)
    } else {
        return response.status(400).json({ error: 'No exist'});
    }

    return response.status(402).send();
});

app.post('/repositories/:id/like', (request, response) => {

    const { id } = request.params;

    const findIndex =  repositories.findIndex(repository => repository.id == id );

    if (!findIndex == -1) {
        return response.status(400).json({ error: 'No exist'})
    }

    repositories(findIndex).likes += 1;

    return response.json(repositories[findIndex]);

});

module.exports = app;
