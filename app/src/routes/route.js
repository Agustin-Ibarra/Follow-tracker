import path from 'path';
import express from 'express';
import rateLimt from 'express-rate-limit';
import morgan from 'morgan';
import { Router } from "express";
import { compareUsers, getAbout, getGuide, getHome } from "../controllers/controller.js";

const dirname = path.resolve();
const format = ':date;:method;:url;:status;:res[content-length];:response-time;:remote-addr';

const router = Router();
const apiLimit = rateLimt({
  handler:(req,res)=>{
    res.status(429).json({error:"se supero el limite de peticiones intenbta dentro de una hora"});
  },
  windowMs: 60 * 60 * 1000,
  max: 2
});
const limit = rateLimt({
  handler:(req,res)=>{
    res.status(429).sendFile(path.join(dirname, '/app/src/views/manyRequests.html'));
  },
  windowMs: 10 * 60 * 1000,
  max: 15
});

router.use(express.static(path.join(dirname,'/app/public/styles'), {
    maxAge: "1d",
    etag: true,
    lastModified: true
}));
router.use(express.static(path.join(dirname,'/app/public/scripts'), {
    maxAge: "1d",
    etag: true,
    lastModified: true
}));
router.use(express.static(path.join(dirname,'/app/public/images'), {
    maxAge: "1d",
    etag: true,
    lastModified: true
}));

router.use(express.json());
router.use(morgan('combined',{
  skip:(req)=> req.url.match(/\.(css|js|html|png|jpg)$/) !== null
}))
router.get('/',limit,getHome);
router.get('/about',limit,getAbout);
router.get('/guide',limit,getGuide);
router.post('/users',apiLimit,compareUsers);

export default router;