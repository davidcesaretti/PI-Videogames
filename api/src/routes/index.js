const { Router } = require('express');
const { getVideogames,
        getById,
        postVideogame,} = require('../Controllers/videogame')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames/post', postVideogame);
router.use('/videogames/:id', getById);
router.use('/videogames', getVideogames);


module.exports = router;
