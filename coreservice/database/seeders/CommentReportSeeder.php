<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CommentReportSeeder extends Seeder
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
            DB::table('comment_report')->insert([
                'user_id' => $faker->numberBetween(1, 10),
                'comment_id' => $faker->numberBetween(1, 10),
                'reason' => $faker->text(100),
            ]);
        }
    }
}
