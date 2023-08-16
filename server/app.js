import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 5000

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.get('/', (req, res) =>{
    res.json(`Server is running on port : 5000`)
})

app.get(`/api/weather/:location`,async (req,res)=>{
    try {
        const location  = req.params.location;
        const response =  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=18c286d5b6d6d3ff7189b79a50effa78`)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


app.listen(PORT, () => {
    console.log(`now server is running at port ${PORT}`);
});