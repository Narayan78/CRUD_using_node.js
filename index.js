const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}))


// routes .....
app.get("/api/users", (req, res) => {
    return res.json(users)
});
app.get("/users", (req, res) => {
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
          ${users.map((user) => `
            <tr>
             <td>
               ${user.id}
             </td>
             <td>
             ${user.first_name}
           </td>
           <td>
           ${user.last_name}
         </td>
         <td>
         ${user.email}
       </td>
       <td>
       ${user.gender}
     </td>
     <td>
     ${user.job_title}
   </td>
            </tr>
          `)}
    </tbody>
</table>

</html>
    
    `

    return res.send(html);
});

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) =>
        user.id === id);
    return res.json(user);

});



app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);
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
       ${user.first_name}
     </td>
     <td>
       ${user.last_name}
     </td>
     <td>
       ${user.email}
     </td>
     <td>
        ${user.gender}
     </td>
     <td>
        ${user.job_title}
     </td>
    </tr>
  
    </tbody>


    </body>
    </html>
    
    `

    return res.send(html);
});

app.post("/api/user", (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1})
    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users), (err, data) => {
        return res.json({ "Status": "Done" })
    })
    
});

app.route("/api/user/:id").patch((req, res) => {
    const id = Number(req.params.id);
    return res.json({ "Status": "Pending" });
}).delete((req, res) => {
    const id = Number(req.params.id);
    return res.json({ "Status": "Pending" });
})


app.listen(PORT, () => console.log(`server has been started at port ${PORT}`));