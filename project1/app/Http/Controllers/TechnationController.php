<?php

namespace App\Http\Controllers;

use App\Console\Commands\StatusUpdater;
use App\Events\StatusChecker;
use App\Models\Technation;
use App\Models\Ticket;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class TechnationController extends Controller
{
    public function index(Request $request, String $ticket_type)
    {
        $valid = Validator::make(["ticket_type" => $ticket_type], [
            "ticket_type" => "string|required|in:open,all,resolved,unresolved,closed,ongoing"
        ]);

        if ($valid->fails()) {
            return response()->json([
                "message" => "Failed",
                "erro" => $valid->errors(),
            ]);
        }

        if (!(Technation::where("id", auth()->user()->id)->where("email", auth()->user()->email))->first()) {
            return response()->json([
                "message" => "Unautherizaed"
            ]);
        }

        $tickets = null;
        switch ($ticket_type) {
            case "all":
                $tickets = [...Ticket::where("technation_id", auth()->user()->id)->get(), ...Ticket::where("technation_id", null)->where("status", "open")->get()];
                break;
            case "open":
                $tickets = Ticket::where("status", "open")->where("technation_id", null)->get();
                break;
            default:
                $tickets = Ticket::where("technation_id", auth()->user()->id)->where("status", $ticket_type)->get();
                break;
        }
        // $tickets = $ticket_type == "all" ? Ticket::all()->where("technation_id", auth()->user()->id) : Ticket::all()->where("status", $ticket_type)->where("technation_id", auth()->user()->id);
        return response()->json([
            "message" => "Tickets",
            "tickets" => $tickets
        ]);
    }

    public function show(Request $request, Ticket $ticket)
    {
        if ($ticket->technation_id != auth()->user()->id && $ticket->technation_id != null) {
            return response()->json([
                "message" => "Unautheriazed",
            ], 403);
        }
        return response()->json([
            "message" => "Ticket",
            "ticket" => $ticket,
        ]);
    }

    public function update(Request $request, Ticket $ticket)
    {
        if ($ticket->technation_id != auth()->user()->id) {
            return response()->json([
                "message" => "Unautheriazed",
            ], 403);
        }
        $valid = Validator::make($request->all(), [
            "status" => "string|required|in:ongoing,open,resolved,unresolved,closed"
        ]);
        if ($valid->fails()) {
            return response()->json([
                "message" => "Failed",
                "Erros" => $valid->errors()
            ], 400);
        }
        $ticket->update([
            "title" => $ticket->title,
            "status" => $request->status,
            "desc" => $ticket->desc,
            "service_type" => $ticket->service_type,
            "technation_id" => $ticket->technation_id,
            "customer_id" => $ticket->customer_id,
        ]);
        StatusChecker::dispatch($ticket);
        return response()->json([
            "Message" => "Updated",
            "Ticket" => $ticket,
        ]);
    }

    public function handelTicket(Request $request, Ticket $ticket)
    {
        if (!(Technation::where("id", auth()->user()->id)->where("email", auth()->user()->email)->first())) {
            return response()->json([
                "message" => "Unautherinazed",
            ]);
        }
        if ($ticket->technation_id) {
            return response()->json([
                "message" => "Failed",
                "desc" => "Ticket Already In Use"
            ]);
        }
        $ticket->technation_id = auth()->user()->id;
        $ticket->status = "ongoing";
        $ticket->save();
        return response()->json([
            "message" => "You Are Now Handling This Ticket",
            "ticket" => $ticket,
        ]);
    }

    public function displayInfo(Request $request)
    {

        if (!(Technation::where("id", auth()->user()->id)->where("email", auth()->user()->email)->first())) {
            return response()->json([
                "message" => "Unthauintazed"
            ]);
        }
        return response()->json([
            "all" => Ticket::where("technation_id", auth()->user()->id)->count(),
            "ongoing" =>  Ticket::where("technation_id", auth()->user()->id)->where("status", "ongoing")->count(),
            "resolved" => Ticket::where("technation_id", auth()->user()->id)->where("status", "resolved")->count(),
            "open" => Ticket::where("technation_id", null)->where("status", "open")->count(),
            "closed" => Ticket::where("technation_id", auth()->user()->id)->where("status", "closed")->count(),
            "unresolved" => Ticket::where("technation_id", auth()->user()->id)->where("status", "unresolved")->count(),
        ]);
    }
}
