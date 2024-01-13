const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const PORT = 8000;

//connection
mongoose.connect("mongodb://127.0.0.1:27017/Mongo-CRUD-operation")
  .then(() => console.log("Database Connected successfully"))
  .catch((err) => console.log("Error while connecting to the databse"));

//user-schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  gender: {
    type: String,
    required: true,
  },

  jobTitle: {
    type: String,
    required: true,
  }

},
{timestamps: true}
);

const userModel = mongoose.model("user", userSchema);


// middleware-plugin
app.use(express.urlencoded({ extended: false }))


// routes .....
app.get("/api/users", async (req, res) => {
  const allDBusers = await userModel.find({})
  return res.json(allDBusers)  
});
app.get("/users", async (req, res) => {

  const allDBusers = await userModel.find({})
  const html = `

    <html>

    <head>
    <title>User Data</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
    </head>
    
    <table >
    <thead>
        <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Job Title</th>
        </tr>
    </thead>
    <tbody id="userData">
          ${allDBusers.map((user) => `
            <tr>
             <td>
               ${user.id}
             </td>
             <td>
             ${user.firstName}
           </td>
           <td>
           ${user.lastName}
         </td>
         <td>
         ${user.email}
       </td>
       <td>
       ${user.gender}
     </td>
     <td>
     ${user.jobTitle}
   </td>
            </tr>
          `)}
    </tbody>
</table>

</html>
    
    `

  return res.send(html);
});

app.get("/api/users/:id", async (req, res) => {
  
  const user = await userModel.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "No any Users found" });
  return res.json(user);

});



app.get("/users/:id", async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "No any path found" });

  const html = `
    <html>
      <title>Users data</title>
      <style>
      table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
      }

      th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
      }

      th {
          background-color: #f2f2f2;
      }
  </style>
      <body>
        <table>
          <thead>
             <tr>
               <th>ID</th>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Email</th>
               <th>Gender</th>
               <th>Job Title</th>
             </tr>
         </thead>

  <tbody id="userData">
    <tr>
     <td>
       ${user.id}
     </td>
     <td>
       ${user.firstName}
     </td>
     <td>
       ${user.lastName}
     </td>
     <td>
       ${user.email}
     </td>
     <td>
        ${user.gender}
     </td>
     <td>
        ${user.jobTitle}
     </td>
    </tr>
  
    </tbody>


    </body>
    </html>
    
    `

  return res.send(html);
});

app.post("/api/user", async (req, res) => {
  const body = req.body;
  if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
    return res.status(400).json({ "Error": "All fields are required" })
  }
  // users.push({ ...body, id: users.length + 1 })
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ "Status": "Done" })
  // })

  const results = await userModel.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log(results)

  return res.status(201).json({ mes: "Created Successfully" })
});

app.route("/api/user/:id").patch((req, res) => {
  const id = Number(req.params.id);
  return res.json({ "Status": "Pending" });
}).delete((req, res) => {
  const id = Number(req.params.id);
  return res.json({ "Status": "Pending" });
})


app.listen(PORT, () => console.log(`server has been started at port ${PORT}`));