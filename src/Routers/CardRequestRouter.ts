import {Router} from "express"
import {DeleteRequest, GetAllCardRequests, GetCardRequestById, MakeRequest} from "../Controllers/CardRequestController";

const router = Router();


router.get("/getAll", GetAllCardRequests);
router.get("/get/:requestId", GetCardRequestById)
router.post("/make", MakeRequest);
router.delete("delete/:requestId", DeleteRequest)

export default router;