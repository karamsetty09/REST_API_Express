const Joi = require('joi');
const express = require('express');
const app = express();



app.use(express.json());
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
      const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
  });

app.get('/api/courses', (req, res) => {
    res.send(courses);
});



app.get('/', (req, res) => {
    res.send('Hello World !!!');
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('this course is not found');
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('this course is not found');
   

    // validate 
    // If invalid, return 400 - Bad Request
    
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
       


    // update course
    course.name = req.body.name;
    res.send(course);
    // Return the updated course

});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}


app.delete('/api/courses/:id', (req, res) => {
    //look up for the course
    // NOt  existing , return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('this course is not found');
    
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    // Return the same course

    res.send(course);

})