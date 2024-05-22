import express from "express";
const router = express.Router();

import GiroApplicationCtrl from "../controllers/giro-application.controller";

router.post("/v1", GiroApplicationCtrl.createGiroApplication);
router.put("/v1/status/:id([0-9a-fA-F]{24})", GiroApplicationCtrl.updateGiroApplicationStatus);
router.get("/v1/all", GiroApplicationCtrl.getAllGiroApplication);
router.get("/v1/:id([0-9a-fA-F]{24})", GiroApplicationCtrl.getGiroApplicationById);

export default router;
