<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class LikeCommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = DB::table('users')->get();
        $comments = DB::table('comments')->get();
        foreach ($comments as $comment) {
            foreach ($users as $user) {
                DB::table('like_comment')->insert([
                    'user_id' => $user->id,
                    'comment_id' => $comment->id
                ]);
            }
        }
    }
}
