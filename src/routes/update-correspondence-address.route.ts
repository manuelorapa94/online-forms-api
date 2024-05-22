import express from "express";
const router = express.Router();

import UCACtrl from "../controllers/update-correspondence-address.controller";

router.post("/v1", UCACtrl.createUCA);
router.put("/v1/status/:id([0-9a-fA-F]{24})", UCACtrl.updateUCAStatus);
router.get("/v1/all", UCACtrl.getAllUCA);
router.get("/v1/:id([0-9a-fA-F]{24})", UCACtrl.getUCAById);

export default router;