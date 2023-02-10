<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class FollowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = DB::table('users')->get();
        foreach ($users as $user) {
            foreach ($users as $user2) {
                if ($user->id != $user2->id) {
                    DB::table('follow')->insert([
                        'user_id' => $user->id,
                        'followed_user_id' => $user2->id
                    ]);
                }
            }
        }
    }
}
