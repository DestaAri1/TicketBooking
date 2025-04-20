<?php

namespace Database\Seeders;

use App\Models\Ticket;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    public function run(): void
    {
        Ticket::truncate();
        Ticket::create([
            'name' => 'Summer Music Festival',
            'slug' => 'summer-music-festival',
            'artist' => 'Various Artists',
            'date' => '2025-05-16',
            'time' => '16:00',
            'venue' => 'Grand Park Arena',
            'price' => 850000,
            'status' => '0',
            'sales' => 0,
            'imageUrl' => 'cxcxcx',
        ]);
    }
}
