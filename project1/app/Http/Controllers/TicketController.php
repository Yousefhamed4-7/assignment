<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class TicketController extends Controller
{


    public function index(Request $request, String $ticket_type)
    {
        $tickets = Ticket::where("customer_id", auth()->user()->id)->get();
        return response()->json([
            "message" => "Tickets",
            "tickets" => $tickets
        ]);
    }


    public function show(Request $request, Ticket $ticket)
    {
        if ($ticket->customer_id != auth()->user()->id) {
            return response()->json([
                "message" => "Unauthenticated",
                "type" => "Get Out",
            ], 403);
        }
        return response()->json([
            "message" => "Ticket",
            "ticket" => $ticket,
        ]);
    }





    public function create(Request $request)
    {

        if (!(User::where("id", auth()->user()->id)->where("email", auth()->user()->email)->first())) {
            return response()->json([
                "message" => "Unauthraized",
                "type" => "GET OUT",
            ], 403);
        }

        $valid = Validator::make($request->all(), [
            "title" => "string|required",
            "desc" => "string|required",
            "service_type" => "string|required|in:courier,dropoff,technationoffice"
        ]);
        if ($valid->fails()) {
            return response()->json([
                "message" => "Failed",
                "Errors" => $valid->errors()
            ]);
        }
        $ticket = Ticket::create([
            "title" => $request->title,
            "desc" => $request->desc,
            "service_type" => $request->service_type,
            "technation_id" => null,
            "customer_id" => auth()->user()->id,
            "status" => "open",
        ]);
        return response()->json([
            "message" => "Created Ticket",
            "Ticket" => $ticket,
        ], 201);
    }
}
