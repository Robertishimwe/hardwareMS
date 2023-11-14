const express = require('express');
const routes = require('./routes');

const app = express();

const db = require('./config/dbase')
const createAdminUser = require('./config/createAdmin')

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000


db.authenticate().then(() => {
    console.log('Database synced');
    createAdminUser()
    app.listen(PORT, () => {
        console.log('Server is running on port 3000');
    });
}).catch((e) => {
    console.log(e)
});