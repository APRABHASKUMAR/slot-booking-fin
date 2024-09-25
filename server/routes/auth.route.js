import express from 'express';
import { login, ssoLogin } from '../controllers/auth.controller.js';

const router = express.Router();

// Route for login using email and password
router.post('/login', login);

// Future SSO login route (Shibboleth or others)
router.post('/sso-login', ssoLogin);

export default router;
