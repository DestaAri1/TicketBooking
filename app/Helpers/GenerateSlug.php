<?php

namespace App\Helpers;

use App\Models\Ticket;
use Illuminate\Support\Str;

class GenerateSlug {
    public static function slug($title) {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        while (Ticket::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }
}