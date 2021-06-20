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

router.post('/videogames/post', postVideogame);
router.get('/videogames/:id', getById);
router.get('/videogames', getVideogames);
router.get('/genres', getGenres)


module.exports = router;
