const db = require("../app/models")


db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connect to MongoDB')).catch((err) => {
    console.log('Failed to connect to  MongoDB!', err);
    process.exit();
})
