<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Technation;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->text("desc");
            $table->enum("status", ["ongoing", "open", "resolved", "unresolved", "closed"]);
            $table->enum("service_type", ["courier", "dropoff", "technationoffice"]);
            $table->foreignIdFor(User::class, "customer_id");
            $table->foreignIdFor(Technation::class)->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
