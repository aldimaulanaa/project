<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentsTableSeeder extends Seeder
{
    public function run()
    {
        // Insert sample data into the students table
        DB::table('students')->insert([
            [
                'name' => 'John Doe',
                'class' => 10,
                'status' => 1,
            ],
            [
                'name' => 'Jane Smith',
                'class' => 11,
                'status' => 1,
            ],
            // Add more sample data as needed
        ]);
    }
}
