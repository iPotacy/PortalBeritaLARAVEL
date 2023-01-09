<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\news;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = new NewsCollection (News::OrderByDesc('id') -> paginate(9));
        return Inertia::render('Homepage', [
            'title' => "Anime News",
            'description' => "Selamat Datang Wibu",
            'news' => $news,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $news = new News();
        $news -> title = $request -> title;
        $news -> description = $request -> description;
        $news -> kategori = $request -> kategori;
        $news -> author = auth() -> user() -> email;
        $news -> save();
        
        return redirect() -> back() -> with ('message', 'Success');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\news  $news
     * @return \Illuminate\Http\Response
     */
    public function show(news $news)
    {
        $myNews = $news::where ('author', auth() -> user() -> email) -> get();
        return Inertia::render('Dashboard', [
            'myNews' => $myNews,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\news  $news
     * @return \Illuminate\Http\Response
     */
    public function edit(news $news, Request $request)
    {
        return Inertia::render ('EditNews', [
            'myNews' => $news -> find ($request -> id)
        ]);        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\news  $news
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        News::where('id', $request -> id ) -> update ([
            'title' => $request -> title,
            'description' => $request -> description,
            'kategori' => $request -> kategori,

        ]);
        return to_route ('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\news  $news
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $news = News::find ($request -> id);
        $news -> delete();
        return redirect() -> back() -> with ('message', 'Success');
    }
}
