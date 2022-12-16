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
        $faker = Faker::create('vi_VN');
        $users = DB::table('users')->get();
        $comments = DB::table('comments')->get();
        foreach ($comments as $comment) {
            foreach ($users as $user) {
                if ($faker->numberBetween(0, 1) == 1) {
                    DB::table('like_comment')->insert([
                        'user_id' => $user->id,
                        'comment_id' => $comment->id
                    ]);
                }

            }
        }
    }
}
