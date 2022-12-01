<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call([
            UserSeeder::class,
            PostSeeder::class,
            CommentSeeder::class,
            LikeCommentSeeder::class,
            LikePostSeeder::class,
            FollowSeeder::class,
            TagSeeder::class,
            ChatSeeder::class,
            BookmarkSeeder::class,
            PostReportSeeder::class,
            CommentReportSeeder::class
        ]);
    }
}
