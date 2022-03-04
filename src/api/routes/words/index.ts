import express, { Router } from 'express';
import { getWord } from './controller';

const router: Router = express.Router();

router.get('/', getWord);

export default router;
