<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

class ImageUploader {
    /**
     * Upload an image file to the specified folder.
     *
     * @param UploadedFile $file
     * @param string $folder Relative to the public/ directory
     * @return string|null The image path or null on failure
     */
    public static function upload(UploadedFile $file, string $folder = 'assets/ticket'): ?string
    {
        try {
            $targetDir = public_path($folder);

            if (!file_exists($targetDir)) {
                mkdir($targetDir, 0755, true);
            }

            $extension = $file->getClientOriginalExtension();
            $filename = time() . '_' . uniqid() . '.' . $extension;
            $fileContent = file_get_contents($file->getRealPath());

            $fullPath = $targetDir . '/' . $filename;

            if (file_put_contents($fullPath, $fileContent)) {
                return $folder . '/' . $filename; // Relative path to be stored in DB
            } else {
                Log::error("ImageUploader: Failed to write file to $fullPath.");
                return null;
            }
        } catch (\Exception $e) {
            Log::error('ImageUploader Exception: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Upload a base64 encoded image to the specified folder.
     *
     * @param string $base64Image The base64 encoded image string
     * @param string $folder Relative to the public/ directory
     * @return string|null The image path or null on failure
     */
    public static function uploadBase64(string $base64Image, string $folder = 'assets/ticket'): ?string
    {
        try {
            // Extract content type and base64 data
            $image_parts = explode(";base64,", $base64Image);

            // Check if this is a valid base64 image string
            if (count($image_parts) < 2) {
                Log::error("ImageUploader: Invalid base64 image format");
                return null;
            }

            // Get the image type from the content type
            $image_type_aux = explode("image/", $image_parts[0]);
            if (count($image_type_aux) < 2) {
                Log::error("ImageUploader: Cannot determine image type");
                return null;
            }

            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);

            // Make sure the decode was successful
            if ($image_base64 === false) {
                Log::error("ImageUploader: Failed to decode base64 image");
                return null;
            }

            $targetDir = public_path($folder);

            if (!file_exists($targetDir)) {
                mkdir($targetDir, 0755, true);
            }

            $filename = time() . '_' . uniqid() . '.' . $image_type;
            $fullPath = $targetDir . '/' . $filename;

            if (file_put_contents($fullPath, $image_base64)) {
                return $folder . '/' . $filename; // Relative path to be stored in DB
            } else {
                Log::error("ImageUploader: Failed to write base64 image to $fullPath.");
                return null;
            }
        } catch (\Exception $e) {
            Log::error('ImageUploader Base64 Exception: ' . $e->getMessage());
            return null;
        }
    }
}
