import { Router } from 'express';
import { AuthGuard } from '../core/middlewares/auth';
import { login } from '../services/authentication';
import { GetCampaign, SearchElastic } from '../services/campaing';
import { MyProfile } from '../services/profile';

const router = new Router()

// Authentication Routes
router.post('/login', login)

// User routes (don't forget to apply auth middleware)


// Compaing routes (don't forget to apply auth middleware)
router.get('/campaings', AuthGuard, GetCampaign)

router.get('/search', AuthGuard, SearchElastic)

router.get('/me', AuthGuard, MyProfile)


export default router;