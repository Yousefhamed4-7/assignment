<?php

namespace App\Http\Controllers;

use App\Events\MessageSend;
use App\Models\Chat;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller
{
    public function getAll(Request $request, Ticket $ticket)
    {
        if (($ticket->customer_id ==  auth()->user()->id) || ($ticket->technation_id ==  auth()->user()->id)) {

            return response()->json([
                "message" =>  "Found DATA",
                "Chat" => $ticket->chat(),
                "customer_name" => $ticket->customer()->name,
                "technation_name" => $ticket->technation()->name,
            ]);
        }
        return response()->json([
            "message" => "Unautheraized",
        ], 403);
    }

    public function create(Request $request, Ticket $ticket)
    {
        if (($ticket->customer_id ==  auth()->user()->id) || ($ticket->technation_id == auth()->user()->id)) {
            $valid = Validator::make($request->all(), [
                "message" => "string|required",
            ]);
            if ($valid->fails()) {
                return response()->json([
                    "message" => "Failed",
                    "Errors" => $valid->errors()
                ]);
            }
            $message = Chat::create([
                "message" => $request->message,
                "sender_id" => $request->user()->id,
                "Ticket_id" => $ticket->id,
            ]);
            MessageSend::dispatch($message);
            return response()->json([
                "message" =>  "Found DATA",
                "Chat" => $ticket->chat(),
            ]);
        }
    }
}
