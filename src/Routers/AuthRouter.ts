import {Router} from 'express'
import {SignInUser, SignInUserWithToken, SignUpUser} from "../Controllers/AuthController";
const router = Router();

router.post("/signup", SignUpUser);
router.post("/signin", SignInUser);
router.post('/refresh/signin', SignInUserWithToken)

export default router;


