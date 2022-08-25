<?php

use App\Models\Post;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/iframe', function () {
    return view('iframe');
});

Route::middleware('auth')->get('/home', function () {
    return view('home');
});

Route::get('/blog', function () {
    return view('blog', [
        'posts' => Post::all()
    ]);
});

Route::get('/posts', function () {
    return collect([
        ['title' => 'Post 1'],
        ['title' => 'Post 2'],
    ]);
});
