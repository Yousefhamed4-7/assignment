<?php

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::channel('Ticket.{id}', function ($UnUsedVariable, $id) {
    $role = ((User::where("id", auth()->user()->id)->where("email", auth()->user()->email)->first()) ? "user" : "technation");
    $ticket = Ticket::where("id", $id)->first();
    if ($role == "user") {
        if ($ticket->customer_id == auth()->user()->id) {
            return true;
        }
        return false;
    } else {
        if ($ticket->technation_id == auth()->user()->id) {
            return true;
        }
        return false;
    }
});

Broadcast::channel("status", function () {
    // 
});
