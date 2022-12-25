<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ChatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('vi_VN');
        $limit = 10;
        for ($i = 0; $i < $limit; $i++) {
            DB::table('chat')->insert([
                'user_id_send' => $faker->numberBetween(1, 10),
                'user_id_recv' => $faker->numberBetween(1, 10),
                'content' => $faker->text
            ]);
        }
    }
}
