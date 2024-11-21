const express = require("express");
const users = require("./MOCK_DATA.json"); // taking users json data from my local directory
const app = express(); // crated insteans
const PORT = 1999; // is port me server run hoga

console.log(users);
// routes yaha per defined honge, ye bana hai moblie developer ke liye jo JSON Data send karta hai
app.get("/api/users", (req, res) => {
  // /api-> trow karega tab JSON DATA jayega mobile app ke liye or agar /users throw karega to HTML RENDERING jayegi Browsers ke liye
  return res.json(users); // yaha pass mai client/ browser/ front end ko ek row data send kar rha hu or frontend reatJs ka use kar ke apne hisab se es row data ko render kar sakta hai
});

//ye hai HTML RENDERING jo browser me render hoga
app.get("/users", (req, res) => {
  // res.sendFile(__dirname + "/index.html"); // HTML file ko send kar rha hai
  return res.send(`
    <h1>Users List</h1>
    <ol>
      ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")}
    </ol>
  `);
}); // HTML file ko send kar rha hai

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
