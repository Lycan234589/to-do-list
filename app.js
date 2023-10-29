const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const mongoose = require("mongoose")

// monngodb cloud uri
const MONGO_URI = `mongodb+srv://tannushree:admin_tannushree@cluster0.tq26bem.mongodb.net/toDoList?retryWrites=true&w=majority`
// connect with mongodb  server
mongoose.connect(MONGO_URI)



// creating a mongoose schema (blueprint)
const itemSchema = new mongoose.Schema({
    item: { type: String, required: true, minLength: 3 }
}, { timestamps: true })


// creating a model (collection)
const Item = new mongoose.model("item", itemSchema)





// middlewares
// bp
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))

// ejs 
app.set("view engine", "ejs")




// routes

// root route
app.get("/", (req, res) => {
    Item.find({})
        .then((foundItems) => {

            console.log("Success");
            res.render("home", {
                title: "To Do List",
                date: new Date().toLocaleDateString(),
                array_of_items: foundItems
            })
        })
        .catch((err) => {
            console.log(err);
        })
})


app.post("/", (req, res) => {
    // assigning the data received from the body to a variable itemText
    var itemText = req.body.newItem

    const new_item = new Item({
        item: itemText // property / field  : value (data we want to add)
    })

    new_item.save()
        // if saving item is successfull
        .then(() => {
            console.log("Item Added Successfully");
            console.log(new_item);
            // redirecting the user to the "/" (home/root) route
            // a new get request is made on the "/" root route
            res.redirect("/")
        })
        // if saving item fails
        .catch((err) => {
            console.log(err);
        })


})


// listen to the server
app.listen(5000, () => {
    console.log("Server started on port 5000");
})