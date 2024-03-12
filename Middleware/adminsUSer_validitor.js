const express = require('express');
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
     
    }
  };


  const isUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
     
    }
  };
  module.exports={
    isAdmin,isUser
  }