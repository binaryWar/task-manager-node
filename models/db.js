const mongoose = require("mongoose");
const password = encodeURIComponent("Password#123!");

const MONGO_URI = `mongodb+srv://root:${password}@cluster0.y2hrqbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(MONGO_URI)

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
console.log('Connected to MongoDB');
})
.catch((error) => {
console.error('Error connecting to MongoDB:', error);
});