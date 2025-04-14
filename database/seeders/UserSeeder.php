<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::truncate();
        User::create([
            'name' => 'Admin MusicTix',
            'email' => 'admin@gmail.com',
            'password' => '12345678'
        ]);
    }
}