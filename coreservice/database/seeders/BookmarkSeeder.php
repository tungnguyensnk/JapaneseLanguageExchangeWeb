<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class BookmarkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $posts = DB::table('posts')->get();
        $users = DB::table('users')->get();
        foreach ($posts as $post) {
            foreach ($users as $user) {
                DB::table('bookmarks')->insert([
                    'user_id' => $user->id,
                    'post_id' => $post->id,
                ]);
            }
        }

    }
}
