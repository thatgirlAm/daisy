<?php

namespace App\Http\Controllers;

use App\Models\Stat; 

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\StatResource; 

class StatController extends Controller
{
    use FormatTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->format(['index trouvé', Response::HTTP_OK, StatResource::collection(Stat::all())]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->formatNoPage(); 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->formatNoPage(); 

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return $this->formatNoPage(); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return $this->formatNoPage(); 
    }
}
