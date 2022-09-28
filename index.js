const Joi = require("joi"); // npm i joi
const express = require("express"); // npm install express  : Most used library for building server side rest API
const app = express();

// setting port locally as a localhost http://localhost:3000

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// display helloworld at root http://localhost:3000/ in browser

app.get("/", (req, res) => {
  res.send("Hello World !!!");
});

// send data at port http://localhost:3000/api/posts/2020/02 and display at browser.

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

// small Data set created for applying CRUD properties...

app.use(express.json());
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// get all coursse of dataset at: http://localhoast3000/api/courses/

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// get course by course id in dataset at: http://localhoast3000/api/courses/:id.

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("this course is not found");
  res.send(course);
});

// post the data to dataset at http://localhoast3000/api/courses/

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// Update a course from data set with id shared at http://localhost/3000/api/courses/:id

app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existing, return 404

  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("this course is not found");

  // validate
  // If invalid, return 400 - Bad Request

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // update course
  course.name = req.body.name;
  res.send(course);
  // Return the updated course
});

// Validate function to simplyify logic

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

// Delete a course from data set with id shared at http://localhost/3000/api/courses/:id

app.delete("/api/courses/:id", (req, res) => {
  //look up for the course
  // NOt  existing , return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("this course is not found");

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  // Return the same course

  res.send(course);
});

app.get("/name/:user_name", function (req, res) {
  console.log(req);
  res.status(200);
  res.set("Content-type", "text/html");
  res.send(
    "<html><body>" +
      "<h1>Hello " +
      req.params.user_name +
      "</h1>" +
      "</body></html>"
  );
});
