<?php

namespace App\Http\Controllers;

use App\Helpers\GenerateSlug;
use App\Helpers\ImageUploader;
use App\Http\Requests\TicketRequest;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class TicketController extends Controller
{
    public function index(): Response
    {
        $tickets = Ticket::all()->map(function($ticket) {
            $ticket->imageUrl = url($ticket->imageUrl);
            return $ticket;
        });

        return Inertia::render('ticket', [
            'tickets' => $tickets,
        ]);
    }

    public function addPage(): Response
    {
        return Inertia::render('ticket/addTicket');
    }

    public function create(TicketRequest $request)
    {
        $imagePath = null;
        if ($request->imagePreview) {
            $imagePath = ImageUploader::uploadBase64($request->imagePreview);
        } elseif ($request->hasFile('image') && $request->file('image')->isValid()) {
            $imagePath = ImageUploader::upload($request->file('image'));
        } else {
            return redirect()->back()->withErrors(['image' => 'Poster konser wajib diunggah']);
        }

        // Create the ticket
        Ticket::create([
            'name' => $request->title,
            'slug' => GenerateSlug::slug($request->title),
            'artist' => $request->artist,
            'date' => $request->date,
            'time' => $request->time,
            'venue' => $request->venue,
            'price' => $request->price,
            'description' => $request->description,
            'imageUrl' => $imagePath,
        ]);

        return redirect()->route('ticket')->with('success', 'Ticket created successfully!');
    }

    public function edit($id)
    {
        $ticket = Ticket::findOrFail($id);

        return Inertia::render('ticket/EditTicket', [
            'ticket' => $ticket
        ]);
    }

    public function update($id, TicketRequest $request)
    {
        $ticket = Ticket::findOrFail($id);
        $imagePath = $ticket->imageUrl;

        if ($request->imagePreview !== null) {
            File::delete(public_path($ticket->imageUrl));
            $imagePath = ImageUploader::uploadBase64($request->imagePreview);
        } elseif ($request->hasFile('image') && $request->file('image')->isValid()) {
            File::delete(public_path($ticket->imageUrl));
            $imagePath = ImageUploader::upload($request->file('image'));
        }

        $ticket->update([
            'name' => $request->title,
            'slug' => GenerateSlug::slug($request->title),
            'artist' => $request->artist,
            'date' => $request->date,
            'time' => $request->time,
            'venue' => $request->venue,
            'price' => $request->price,
            'description' => $request->description,
            'imageUrl' => $imagePath,
        ]);

        return redirect()->route('ticket')->with('success', 'Ticket updated successfully!');
    }

    public function destroy($id) {
        $ticket = Ticket::findOrFail($id);
        if(File::delete(public_path($ticket->imageUrl))) {
            $ticket->delete();
        }
    }
}
