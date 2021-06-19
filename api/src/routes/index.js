const { Router } = require('express');
const { getVideogames,
        getById,
        postVideogame,
        getGenres,} = require('../Controllers/videogame')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames/post', postVideogame);
router.use('/videogames/:id', getById);
router.use('/videogames', getVideogames);
router.use('/genres', getGenres)


module.exports = router;
