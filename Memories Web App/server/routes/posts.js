import  express  from "express";
import {getposts,createposts } from '../controllers/posts.js'

const router=express.Router();


router.get('/',getposts)
router.post('/',createposts)


export default router