<?php

namespace App\Helpers;

use Hashids\Hashids;

class IdHasher
{
    protected $hashids;

    public function __construct()
    {
        // Gunakan salt yang unik untuk aplikasi Anda
        $this->hashids = new Hashids(env('APP_KEY', 'dsakjk38218jnadsjbkdaskda'), 10);
    }

    public function encode($id)
    {
        return $this->hashids->encode($id);
    }

    public function decode($hash)
    {
        $decoded = $this->hashids->decode($hash);
        return !empty($decoded) ? $decoded[0] : null;
    }
}