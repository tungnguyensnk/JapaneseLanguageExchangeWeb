<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
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
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->email,
                'password' => bcrypt('123456'),
                'created_at' => $faker->dateTime,
                'updated_at' => $faker->dateTime,
                'user_name' => $faker->userName,
                'phone' => $faker->phoneNumber,
                'address' => $faker->address,
                'role' => $faker->numberBetween(0, 1),
                'deleted' => $faker->numberBetween(0, 1),
                'avatar' => $faker->name
            ]);
        }
    }
}
