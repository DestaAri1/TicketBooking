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
            'password' => '12345678',
            'role' => "0",
        ]);
        User::create([
            'name' => 'Employee MusicTix',
            'email' => 'employee@gmail.com',
            'password' => '12345678',
            'role' => "1",
        ]);
        User::create([
            'name' => 'User MusicTix',
            'email' => 'adminuser@gmail.com',
            'password' => '12345678',
            'role' => "2",
        ]);
    }
}
