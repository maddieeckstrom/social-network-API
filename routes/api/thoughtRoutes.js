const router = require('express').Router();

const {
    getThought,
    getThoughtById,
    postThought,
    putThoughtById,
    deleteThoughtById
  } = require('../../controllers/thoughtController')