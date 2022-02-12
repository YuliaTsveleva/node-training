const express = require("express");
const fs = require("fs/promises");
const path = require("path");
// const crypto = require("crypto");

const app = express();
app.use(express.json());

app.listen(5000, () => console.log("hello"));

const filePath = path.normalize(__dirname + "/db/users.json");

console.log(filePath);

app.get("/users", async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile(filePath));
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = JSON.parse(await fs.readFile(filePath));
    const user = users.filter((item) => String(item.id) === id);
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const body = req.body;
    const users = JSON.parse(await fs.readFile(filePath));
    const newUser = { ...body, id: /*crypto.randomUUID()*/ 145 };
    users.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(users));
    res.json(newUser);
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const users = JSON.parse(await fs.readFile(filePath));
    const index = users.findIndex((user) => String(user.id) === id);
    const updatedUser = { ...users[index], ...body };
    users[index] = updatedUser;
    await fs.writeFile(filePath, JSON.stringify(users));
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const users = JSON.parse(await fs.readFile(filePath));
    const updatedUsers = users.filter((user) => String(user.id) !== id);
    await fs.writeFile(filePath, JSON.stringify(updatedUsers));
    res.status(204).json({ message: 111 });
  } catch (error) {
    console.log(error.message);
  }
});
