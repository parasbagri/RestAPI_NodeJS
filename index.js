const express = require("express");
const users = require("./MOCK_DATA.json"); // taking users json data from my local directory
const app = express(); // crated insteans
const PORT = 1999; // is port me server run hoga
const fs = require("fs");

// console.log(users);

// middleware function or we can say pluging
app.use(express.urlencoded({ extended: true }));
// second middlewere custom middleware
app.use((req, res, next) => {
  console.log("middleware custom1");
  req.myName = "paras";
  // return res.json({ message: "Hello from M1" });
  next(); // agar es middleware ka kaam ho gya hai  next middleware ko run krega
});

app.use((req, res, next) => {
  console.log("middleware custom2", req.myName);
  // return res.json({ message: "Hello from M1" });
  next(); // agar es middleware ka kaam ho gya hai  next middleware ko run krega
  // res.end("Hello from M2");
});

// routes yaha per defined honge, ye bana hai moblie developer ke liye jo JSON Data send karta hai
app.get("/api/users", (req, res) => {
  // /api-> trow karega tab JSON DATA jayega mobile app ke liye or agar /users throw karega to HTML RENDERING jayegi Browsers ke liye

  // headers definitions
  console.log("FrontEnd Side Headers:", req.headers);
  // res.setHeader("Content-Type", "application/json"); // client/browser/front end se JSON Data send kar sakte hai
  // res.setHeader("Access-Control-Allow-Origin", "*"); // client/browser/front end se access kar sakte hai
  res.setHeader("Name", "Paras Bagri");
  return res.json(users); // yaha pass mai client/ browser/ front end ko ek row data send kar rha hu or frontend reatJs ka use kar ke apne hisab se es row data ko render kar sakta hai
});

//ye hai HTML RENDERING jo browser me render hoga es path per jab client URL ye wala dalega tab
app.get("/users", (req, res) => {
  // res.sendFile(__dirname + "/index.html"); // HTML file ko send kar rha hai
  return res.send(`
    <h1>Users List</h1>
    <ol>
      ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")}
    </ol>
  `);
}); // HTML file ko send kar rha hai

// dynamic path parameters
// app.get("/api/users/:id", (req, res) => {
//   console.log("Request received for ID:", req.params.id);

//   const id = Number(req.params.id);
//   if (Number.isNaN(id)) {
//     console.log("Invalid ID:", req.params.id);
//     return res.status(400).send("Invalid ID format");
//   }

//   console.log("Converted ID:", id);

//   const user = users.find((user) => user.id === id);
//   if (!users || !Array.isArray(users)) {
//     console.log("Users data missing or invalid");
//     return res.status(500).send("Users data not available");
//   }

//   console.log("Found User:", user);

//   if (user) {
//     return res.json(user);
//   } else {
//     return res.status(404).send("User not found");
//   }
// });

//------------------------------------------------
// app.get("api/users/:id", (req, res) => {
//   // how to get that id
//   const id = Number(req.params.id);
//   //   console.log("milgiai", id);
//   // find that entered id into my json id
//   const user = users.find((user) => user.id === id);
//   //   if (user) {
//   //     return res.json(user);
//   //   } else {
//   //     return res.status(404).send("User not found");
//   //   }
//   return res.json(user);
//   //   return res.send({ id });
// });
//-----------------------------------------------------

// club or chaning the same routes
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // Edit user with id
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    // Delete user with id
    return res.json({ status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  // TODO: Create new user
  // jo frontEnd se data aa rha hai usko get karna hai pahale
  const body = req.body; // express jo bhi data aa rha hai frontend se usko body me rakhati h
  console.log(body);
  //   users.push({
  //     first_name: body.first_name,
  //     last_name: body.last_name,
  //     email: body.email,
  //     id: users.length + 1,
  //   });
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "sucuceed", id: users.length });
  });
}); // json data ko file me write kar rha hai

// Create New User
// app.post("/api/users", (req, res) => {
//   return res.json({ status: "pending" });
// });

// app.patch("/api/users/:id", (req, res) => {
//   // edit the user
//   return res.json({ status: "pending" });
// });

// app.delete("/api/users/:id", (req, res) => {
//   // delete the user
//   return res.json({ status: "pending" });
// });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
