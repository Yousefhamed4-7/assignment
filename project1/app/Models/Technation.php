<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Technation extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\TechnationFactory> */
    use HasFactory, HasApiTokens;
    protected $guarded = [];
}
