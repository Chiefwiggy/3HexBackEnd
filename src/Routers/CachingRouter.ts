import express from 'express';
import {
    CreateMasterCache, GetMasterCache,
    UpdateCacheBackEnd,
    UpdateCacheDBRegister,
    UpdateCacheFrontEnd
} from "../Controllers/CacheController";



const router = express.Router();

router.get("/master", GetMasterCache)
router.post("/master/create", CreateMasterCache)
router.put("/db/update", UpdateCacheDBRegister)
router.put("/frontend/update", UpdateCacheFrontEnd)
router.put("/backend/update", UpdateCacheBackEnd)

export default router;