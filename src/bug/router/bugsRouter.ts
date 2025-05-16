import { Router } from "express";
import BugsController from "../controller/BugsController.js";
import Bug from "../model/Bug.js";

const bugsRouter = Router();

const bugsController = new BugsController(Bug);

bugsRouter.get("/", bugsController.getBugsData);

bugsRouter.post("/", bugsController.addBug);

export default bugsRouter;
