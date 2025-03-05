<?php

use App\Events\StatusChecker;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome', [
        "user" => User::first()
    ]);
});

// Route::get('/status', function () {
//     broadcast(new StatusChecker(User::select("id", "name")->find(1)));
// });
