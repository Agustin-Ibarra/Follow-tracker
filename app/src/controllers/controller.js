import path from 'path';
import fs from 'fs';

const dirname = path.resolve();

export const getHome = function(req,res){
  res.sendFile(path.join(dirname,'/app/views/home.html'));
}

export const getAbout = function(req,res){
  res.sendFile(path.join(dirname,'/app/views/about.html'));
}

export const getGuide = function(req,res){
  res.sendFile(path.join(dirname,'/app/views/guide.html'));
}

export const compareUsers = function(req,res){
  console.log(req.url);
  console.log(!req.body.followed);
  const followers = req.body.followers
  const followed = req.body.followed;
  const followSet = new Set(followers);
  const unFollows = followed.filter(user => !followSet.has(user));
  res.json(unFollows);
}