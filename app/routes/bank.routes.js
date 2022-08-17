module.exports = (app) => {
  const bank = require("../controllers/bank.controller.js");

  const router = require("express").Router();

  router.get("/simular", bank.start);

  app.use("/jogo", router);
};
