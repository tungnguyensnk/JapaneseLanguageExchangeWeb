<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PostReportSeeder extends Seeder
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
        $posts = DB::table('posts')->get();
        foreach ($posts as $post) {
            foreach ($users as $user) {
                DB::table('post_report')->insert([
                    'user_id' => $user->id,
                    'post_id' => $post->id,
                    'reason' => $faker->sentence(),
                ]);
            }
        }
    }
}
