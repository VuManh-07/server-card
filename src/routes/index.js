const user = require('./userRoute');
const authAdmin = require('./authAdminRoute');

function route(app){
    app.use("/api/user", user);
    app.use("/api/admin", authAdmin);
}

module.exports = route;