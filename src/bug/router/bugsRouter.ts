import { Router } from "express";
import BugsController from "../controller/BugsController.js";
import Bug from "../model/Bug.js";
import handleValidateId from "../../server/middlewares/handleValidateId/handleValidateId.js";

const bugsRouter = Router();

const bugsController = new BugsController(Bug);

bugsRouter.get("/", bugsController.getBugsData);

bugsRouter.post("/", bugsController.addBug);

bugsRouter.delete("/:id", handleValidateId, bugsController.deleteBugById);

export default bugsRouter;
