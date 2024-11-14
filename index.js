import env from "dotenv";
import express from 'express'
env.config();
const app = express()
const port = process.env.PORT
app.use(express.json())


const userArray = []
app.get('/', (req, res) => {
  res.send('<div style="width: 250px;display: flex;justify-content: center;align-items:center;height: 250px;background-color: red"><h1 style="color: white">Hello</h1></div>')
})

app.post("/users",(req,res) => {
    const {title} = req.body;
    if (!title) {
      res.status(400).json({
            message : "No title found!"
        })
        return
    }
    userArray.push({
        title,
        id: Date.now()
    })
    res.status(201).json({
      message: "user is created",
      data: userArray,
    });
})

app.get('/allusers',(req,res)=>{
  res.status(201).json({
    data: userArray,
  });
})


app.post("/users/:id",(req,res) => {
  const {id} = req.params;
  const index = userArray.findIndex((item) => item.id === +id)
  if (index === -1) {
    res.status(400).json({
          message : "No user found!"
      })
      return
  }
  res.status(201).json({
    message: "user is found",
    data: userArray[index],
  });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})