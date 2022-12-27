const { Router } = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser, renewUser } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { tokenValidator } = require('../middlewares/tokenValidator');

const router = Router();

router.post('/register',
    [
        check('username', 'El nombre de usuario es obligatorio.').not().isEmpty(),
        check('email', 'El correo electrónico es obligatorio.').isEmail(),
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('surname', 'El apellido es obligatorio.').not().isEmpty(),
        check('password', 'La contraseña debe tener 6 o más caractéres.').isLength({ min: 6 }),
        fieldValidator
    ],
    registerUser
);

router.post('/login',
    [
        check('user', 'El nombre de usuario o correo electrónico es obligatorio.').not().isEmpty(),
        check('password', 'La contraseña debe tener 6 o más caractéres.').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser
);

router.get('/renew',tokenValidator, renewUser);

module.exports = router;