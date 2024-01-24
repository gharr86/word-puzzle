import express, { Router } from 'express'
import { getWord, checkWord } from './controller'

const router: Router = express.Router()

router.get('/', getWord)
router.post('/', checkWord)

export default router
