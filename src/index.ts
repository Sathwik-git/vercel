import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { getAllFiles } from "./handlerFunctions";
const app = express();
app.use(cors());
app.use(express.json());

app.post("/repourl", async (req, res) => {
  const repourl = req.body.repourl;
  const id = uuidv4();
  await simpleGit().clone(repourl, path.join(__dirname, `output/${id}`));
  const files = getAllFiles(path.join(__dirname, `output/${id}`));
  

  res.json({ id: id });
});


app.listen(3000,()=>{
  console.log("server listening on port 3000")
})
