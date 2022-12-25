<?php

namespace Database\Seeders;

use App\Models\Post;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotificationWebSeeder extends Seeder
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
        foreach ($users as $user) {
            for ($i = 0; $i < 10; $i++) {
                $post = Post::all()->random();
                DB::table('notifications')->insert([
                    'user_id' => $user->id,
                    'content' => 'Bạn đã thích bài viết ' . $post->title,
                    'link' => 'http://localhost:8000/post/' . $post->id,
                    'is_seen' => $faker->numberBetween(0, 1),
                ]);
            }

        }
    }
}
