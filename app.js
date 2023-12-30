const express = require('express')
const app = express()
const port = 3000
const azzaih = require("./models/azzaih");
const mlass = require("./models/mlass");

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
    .sort({ "name": 1 })
    .then((result) => {
      res.render("mnuat", { item: result });
    })
    .catch((err) => {
      console.log(err);
    });
})

//mouled

app.get("/mouled", (req, res) => {
  azzaih.find()
    .sort({ "name": 1 })
    .then((result) => {
      res.render("mouled", { item: result });
    })
    .catch((err) => {
      console.log(err);
    });
})

//wfah

app.get("/wfah", (req, res) => {
  azzaih.find()
    .sort({ "name": 1 })
    .then((result, resultM) => {
      res.render("wfah", { item: result, itemM: resultM });
    })
    .catch((err) => {
      console.log(err);
    });
})

//admin

app.get("/admin", (req, res) => {
  azzaih.find()
    .sort({ "name": 1 })
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
  azzaih.find()
    .sort({ "name": 1 })
    .then((result) => {
      mlass.find()
      .sort({ "name": 1 })
      .then((resultM) => {
        res.render("admin-add", { item: result, itemM: resultM });
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
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

//addM

app.get("/admin-addM", (req, res) => {
  mlass.find()
    .sort({ "name": 1 })
    .then((result) => {
      res.render("admin-addM", { item: result });
    })
    .catch((err) => {
      console.log(err);
    });
})

app.post("/admin-addM", (req, res) => {
  const azzaihC = new mlass(req.body);

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
      mlass.find()
      .then((resultM) => {
        res.render("admin-edit", { item: result, itemM: resultM });
      })
      .catch((err) => {
        console.log(err);
      });
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

//editM

app.get("/admin-editM/:id", (req, res) => {
  mlass.findById(req.params.id)
    .then((result) => {
      res.render("admin-editM", { item: result });
    })
    .catch((err) => {
      console.log(err);
    });
})

app.post("/admin-editM/:id", (req, res) => {
  const azzaihC = new mlass(req.body);

  console.log(req.body);

  azzaihC
    .save()
    .then(result => {
      res.redirect("/admin-addM");
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete("/admin-editM/:id", (req, res) => {
  mlass.findByIdAndDelete(req.params.id)

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

    .then((params) => {
      res.json({ mylink: "/admin" });
    })

    .catch((err) => {
      console.log(err);
    });
});

//mlass

app.get("/mlass", (req, res) => {
  mlass.find()
  .then((result) => {
    res.render("mlass", {item: result})
  })
    .catch((err) => {
      console.log(err);
    });
})

app.get("/mlass/:id", (req, res) => {
  mlass.findById(req.params.id)
    .then((resultM) => {
      azzaih.find()
      .then((result) => {
        res.render("mlassI", { item: result, itemM: resultM });
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
})


//delete

app.get("/admin-deleteM/:id", (req, res) => {
  mlass.findById(req.params.id)
    .then((result) => {
      res.render("admin-deleteM", { item: result });
    })
    .catch((err) => {
      console.log(err);
    });
})

app.delete("/admin-deleteM/:id", (req, res) => {
  mlass.findByIdAndDelete(req.params.id)

    .then((params) => {
      res.json({ mylink: "/admin" });
    })

    .catch((err) => {
      console.log(err);
    });
});

//support

app.get("/support", (req, res) => {
  res.render("support")
})