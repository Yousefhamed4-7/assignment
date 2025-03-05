<?php

use App\Http\Controllers\ChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterationController;
use App\Http\Controllers\TechnationController;
use App\Http\Controllers\TicketController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post("/login", [RegisterationController::class, "login"]);
Route::post("/register", [RegisterationController::class, "register"]);
Route::get("/logout", [RegisterationController::class, "logout"])->middleware("auth:sanctum");



Route::get("/admin/tickets/{ticket_type}", [TechnationController::class, "index"])->middleware("auth:sanctum");
Route::get("/admin/tickets/show/{ticket}", [TechnationController::class, "show"])->middleware("auth:sanctum");
Route::patch("/admin/tickets/edit/{ticket}", [TechnationController::class, "update"])->middleware("auth:sanctum");
Route::get("/admin/tickets/ticket/{ticket}", [TechnationController::class, "handelTicket"])->middleware("auth:sanctum");
Route::get("/admin/tickets/ticket/info/all", [TechnationController::class, "displayInfo"])->middleware("auth:sanctum");

Route::get("/customer/tickets/{ticket_type}", [TicketController::class, "index"])->middleware("auth:sanctum");
Route::get("/customer/tickets/show/{ticket}", [TicketController::class, "show"])->middleware("auth:sanctum");
Route::post("/customer/tickets/create", [TicketController::class, "create"])->middleware("auth:sanctum");


Route::get("chat/{ticket}", [ChatController::class, "getAll"])->middleware("auth:sanctum");
Route::post("chat/create/{ticket}", [ChatController::class, "create"])->middleware("auth:sanctum");
