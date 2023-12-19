const express = require('express')
const app = express()
const port = 3000
const azzaih = require("./models/azzaih");

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

// auto Refresh

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// mongoDB

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Ahmad_RAQ:1w3r5y7i8@cluster0.wrxv6um.mongodb.net/")
  .then(result => {
    app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}/`)
    })
  })
  .catch(err => {
    console.log(err);
  });

//pages

//index

app.get('/', (req, res) => {
  res.render("index")
})

//mnuat

app.get("/mnuat", (req, res) => {
  azzaih.find()
    .then((result) => {
      res.render("mnuat", { item: result });
    })
    .catch((err) => {
      console.log(err);
    });
})

//admin

app.get("/admin", (req, res) => {
  azzaih.find()
    .then((result) => {
      res.render("admin", { item: result });
    })
    .catch((err) => {
      console.log(err);
    });
})

app.post("/admin", (req, res) => {
  const azzaihC = new azzaih(req.body);

  console.log(req.body);

  azzaihC
    .save()
    .then(result => {
      res.redirect("/admin-add");
    })
    .catch(err => {
      console.log(err);
    });
});

//add

app.get("/admin-add", (req, res) => {
  res.render("admin-add")
})

app.post("/admin-add", (req, res) => {
  const azzaihC = new azzaih(req.body);

  console.log(req.body);

  azzaihC
    .save()
    .then(result => {
      res.redirect("/admin");
    })
    .catch(err => {
      console.log(err);
    });
});

//edit

app.get("/admin-edit/:id", (req, res) => {
  azzaih.findById(req.params.id)
    .then((result) => {
      res.render("admin-edit", { item: result });
    })
    .catch((err) => {
      console.log(err);
    });
})

app.post("/admin-edit/:id", (req, res) => {
  const azzaihC = new azzaih(req.body);

  console.log(req.body);

  azzaihC
    .save()
    .then(result => {
      res.redirect("/admin");
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete("/admin-edit/:id", (req, res) => {
  azzaih.findByIdAndDelete(req.params.id)

  .then((params)=> {
    res.json( {mylink: "/admin"} );
  })

  .catch((err)=> {
    console.log(err);
  });
});

//delete

app.get("/admin-delete/:id", (req, res) => {
  azzaih.findById(req.params.id)
    .then((result) => {
      res.render("admin-delete", { item: result });
    })
    .catch((err) => {
      console.log(err);
    });
})

app.delete("/admin-delete/:id", (req, res) => {
  azzaih.findByIdAndDelete(req.params.id)

  .then((params)=> {
    res.json( {mylink: "/admin"} );
  })

  .catch((err)=> {
    console.log(err);
  });
});

//support

app.get("/support", (req, res) => {
  res.render("support")
})