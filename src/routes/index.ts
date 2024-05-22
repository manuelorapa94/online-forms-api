import express from "express";

const router = express.Router();

router.get("/v1", (_, res) => {
  res.json({
    message: "Welcome to my API",
  });
});

import organization from "./update-correspondence-address.route";
router.use("/update-correspondence-address", organization);

import giro from "./giro-application.route";
router.use("/giro-application", giro);

import carParkLabel from "./car-park-label.route";
router.use("/car-park-label", carParkLabel);

import bulkDeliveryMovingInOut from "./bulk-delivery-moving-in-out.route";
router.use("/bulk-delivery-moving-in-out", bulkDeliveryMovingInOut);

import renovation from "./renovation.route";
router.use("/renovation", renovation);

import onlineForms from "./online-forms.route";
router.use("/online-forms", onlineForms);

export default router;
