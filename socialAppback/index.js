const app = require("./src/src")

app.all("*",( req , res ) => 
    res.status(500).send({apiStatus:false, data:{}, message:"invalid url"})
    )

app.listen(
    process.env.PORT, 
    ()=> 
        console.log(`http://localhost:${process.env.PORT}`)
        )