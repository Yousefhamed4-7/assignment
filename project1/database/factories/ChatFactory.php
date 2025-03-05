<?php

namespace Database\Factories;

use App\Models\Technation;
use App\Models\Ticket;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chat>
 */
class ChatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ele = fake()->randomElement([...Technation::all(), ...User::all()]);
        return [
            "message" => fake()->text(),
            "sender_id" => $ele,
            "ticket_id" => fake()->randomElement(Ticket::all()),
            "sender_role" => $ele->address ? "customer" : "technation",
        ];
    }
}
