<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'venue' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
        ];

        // Cek apakah ini request untuk create atau update
        $isUpdateRequest = $this->isMethod('PUT') || $this->isMethod('PATCH') || $this->route('id');

        // Jika ini request untuk create, maka image required
        if (!$isUpdateRequest) {
            // Only require image if imagePreview is not provided
            if (!$this->imagePreview) {
                $rules['image'] = 'required|image|max:5120';
            }
        } else {
            // Jika update dan ada gambar yang diupload, validasi gambar
            if ($this->hasFile('image')) {
                $rules['image'] = 'image|max:5120';
            }
        }

        return $rules;
    }
}
