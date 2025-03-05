<?php

namespace Database\Factories;

use App\Models\Technation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "title" => fake()->title(),
            "desc" => fake()->text(),
            "status" => fake()->randomElement(["ongoing", "open", "resolved", "unresolved", "closed"]),
            "service_type" => fake()->randomElement(["courier", "dropoff", "technationoffice"]),
            "customer_id" => User::factory()->create(),
            "technation_id" => Technation::factory()->create(),
        ];
    }
}
