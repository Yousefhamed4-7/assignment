<?php

namespace App\Console\Commands;

use App\Events\StatusChecker;
use App\Models\Ticket;
use Illuminate\Console\Command;

class StatusUpdater extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'updateStatus {ticket_id} {NewStatus}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $ticket = Ticket::where("id", $this->argument("ticket_id"))->first();
        $ticket->status = $this->argument("NewStatus");
        $ticket->save();
        StatusChecker::dispatch($ticket);
    }
}
