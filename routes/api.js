
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');
const orderController = require('../controllers/orderController');

const {authenticateToken}=require('../middleware/authmiddleware')




//  added middleware to let only auth users to acces this routes(
router.get('/books',bookController.getAllBooks);
router.post('/books',authenticateToken, bookController.createBook);
router.delete('/books/:id',authenticateToken, bookController.deleteBook);
//add filter
//to do and test
router.put('/books/:id',authenticateToken, bookController.modifyBook);
//to test
router.get('/authors',authenticateToken, authorController.getAllauthors);
router.post('/authors',authenticateToken, authorController.createAuthor);
router.delete('/authors/:id',authenticateToken, authorController.deleteAuthor);
router.put('/authors/:id',authenticateToken, authorController.modifyAuthor);
// add roles only for admin and stock manager
router.get('/genres',authenticateToken, genreController.getAllgenres);
router.post('/genres',authenticateToken, genreController.createGenre);
router.delete('/genres/:id',authenticateToken, genreController.deleteGenre);
router.put('/genres/:id',authenticateToken, genreController.modifyGenre);

router.get('/orders',authenticateToken, orderController.getAllorders);
router.post('/orders',authenticateToken, orderController.createOrder);
//| in crud operation add delete genre it delete it from others 
router.put('/orders/:id',authenticateToken, orderController.changeOrderStatus);

//)
router.post('/signup', userController.createUser);
router.post('/', userController.getUser);

module.exports = router;