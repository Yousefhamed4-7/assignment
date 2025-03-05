<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Technation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Hash;

class RegisterationController extends Controller
{
    public function login(Request $request)
    {
        $valid = Validator::make(
            $request->all(),
            [
                "email" => "email|required",
                "password" => "string|required",
            ]
        );

        if ($valid->fails()) {
            return response()->json([
                "message" => "Error Failed",
                "Erros" => $valid->errors()
            ]);
        }
        $customer = User::where("email", $request->email)->first();
        $technation = Technation::where("email", $request->email)->first();
        if ($technation) {
            if ($technation->password != $request->password) {
                return response()->json([
                    "message" => "Failed",
                    "desc" => "Wrong Data",
                ], 400);
            }
            if ($technation->tokens->isNotEmpty()) {
                $technation->tokens->each(function ($token) {
                    $token->delete();
                });
            }
            auth()->login($technation);
            $token = $technation->createToken('access_token', ["*"], Carbon::now()->timezone("Africa/Cairo")->addHours(24));

            return response()->json([
                "message" => "You Are A Technation",
                "data" => $technation,
                "Token" => $token->plainTextToken,
                "role" => "admin",
            ]);
        } elseif ($customer) {
            if (!Hash::check($request->password, $customer->password)) {
                return response()->json([
                    "message" => "Failed",
                    "desc" => "Wrong Data",
                ], 400);
            }
            auth()->login($customer);
            if ($customer->tokens->isNotEmpty()) {
                $customer->tokens->each(function ($token) {
                    $token->delete();
                });
            }
            $token = $customer->createToken('access_token', ["*"], Carbon::now()->timezone("Africa/Cairo")->addHours(24));

            return response()->json([
                "message" => "You Are A Customer",
                "data" => $customer,
                "Token" => $token->plainTextToken,
                "role" => "customer"
            ]);
        } else {
            return response()->json([
                "message" => "Data Is Not Found",
                "desc" => "Something Went Wrong"
            ], 400);
        }
    }

    public function register(Request $request)
    {
        $valid = Validator::make($request->all(), [
            "name" => "string|required",
            "email" => "email|required|unique:users",
            "address" => "string|required",
            "password" => "string|required",
            "customer_type" => "string|required|in:individual,company",
        ]);
        if ($valid->fails()) {
            return response()->json([
                "message" => "Error Failed",
                "Errors" => $valid->errors()
            ], 400);
        }
        $customer = User::create($request->all());
        $token = $customer->createToken('access_token', ["*"], Carbon::now()->timezone("Africa/Cairo")->addHours(24));
        return response()->json([
            "message" => "Created Succefuly",
            "User" => $customer,
            "Token" => $token->plainTextToken,
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            "message" => "You Are Logged Out",
        ]);
    }
}
