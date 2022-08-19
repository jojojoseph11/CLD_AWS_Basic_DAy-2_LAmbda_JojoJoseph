const router = require("express").Router();
const handler = require("../handlers/userHandler");
const bodyParser = require('body-parser').json();

router.post("/uploadImage", bodyParser, handler.uploadImage);
router.get("/getImage", bodyParser, handler.getImage);
router.get("/listImages", bodyParser, handler.listImages);
router.put("/updateImage", bodyParser, handler.updateImage);
router.delete("/deleteImage", bodyParser, handler.deleteImage);
router.get("/getImageUrl", bodyParser, handler.getImageUrl);
router.put("/changePermissions", bodyParser, handler.changePermissions);

module.exports = router;
