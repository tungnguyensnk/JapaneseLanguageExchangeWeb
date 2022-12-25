<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PostSeeder extends Seeder
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
                DB::table('posts')->insert([
                    'user_id' => $user->id,
                    'title' => $faker->sentence,
                    'content' => $faker->paragraph,
                    'type' => $faker->randomElement(['post', 'page']),
                    'deleted' => $faker->boolean,
                    'views' => $faker->numberBetween(0, 1000),
                    'locked' => $faker->boolean
                ]);
            }
        }
    }
}
