'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('lobby')
Route.get('/rooms', 'RoomController.index')
Route.get('/rooms/:id','RoomController.show')
Route.post('/room', 'RoomController.store')

Route.get('/login/:id', 'AuthController.index')
Route.post('/login', 'AuthController.store')