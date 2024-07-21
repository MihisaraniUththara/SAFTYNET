
import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cors())

/*app.post("/api/accidents/report", async (req, res) => {
    
}); //Reports a new accident
app.get("/api/accidents/:accidentId", async (req, res) => {
    res.json({message: 'success!'})
}); //Retrieves details of a specific accident by its ID
app.put("/api/accidents/:accidentId", async (req, res) => {}); //Updates details of a specific accident by its ID
app.delete("/api/accidents/:accidentId", async (req, res) => {}); //Deletes a specific accident report by its ID
app.get("/api/accidents", async (req, res) => {}); //Lists all reported accidents
app.post("/api/accidents/:accidentId/assign", async (req, res) => {}); //Assigns a police officer to a specific accident
app.get("/api/officers/:officerId/accidents", async (req, res) => {}); //Lists all accidents assigned to a specific police officer*/

app.get("/api/recipes/search", async (req, res)=>{
    res.json({message: 'success!'});
});

app.listen(5173, () => {
    console.log("Sever running on localhost: 5000");
});