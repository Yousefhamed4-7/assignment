<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Chat;

class Ticket extends Model
{
    /** @use HasFactory<\Database\Factories\TicketFactory> */
    use HasFactory;
    protected $guarded = [];

    public function chat()
    {
        return Chat::where("ticket_id", $this->id)->get();
    }
    public function customer()
    {
        return User::where("id", $this->customer_id)->first();
    }
    public function technation()
    {
        return Technation::where("id", $this->technation_id)->first();
    }
}
