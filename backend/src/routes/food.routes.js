const express = require("express");
const multer = require("multer");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const router = express.Router();

const upload = multer({
  storge: multer.memoryStorage(),
});

/* /api/food/  [protected] */
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood
);

/* /api/food/  [protected] */
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood
);

router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood
);

router.get(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.getSaveFood
);

module.exports = router;
