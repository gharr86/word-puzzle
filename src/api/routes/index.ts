import express, { Router } from 'express';
import wordsRouter from './words';

const router: Router = express.Router();

router.use('/words', wordsRouter);

export default router;
