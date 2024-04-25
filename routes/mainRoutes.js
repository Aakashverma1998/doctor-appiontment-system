module.exports = function (app) {
  //Customer Route....
  const user = require("./userRoute");
  app.use("/api/v1/user", user);
  //Doctor Route.....
  const doctor = require("./doctorRoute");
  app.use("/api/v1/doctor", doctor);

  const admin = require("./adminRoute");
  app.use("/api/v1/admin", admin);
};
