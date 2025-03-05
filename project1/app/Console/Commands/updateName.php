<?php

namespace App\Console\Commands;

use App\Events\StatusChecker;
use App\Models\User;
use Illuminate\Console\Command;

class updateName extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'updateName {NewName}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This Command Updates The Name';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = User::first();
        $user->name = $this->argument('NewName');
        $user->save();

        StatusChecker::dispatch($user);
    }
}
