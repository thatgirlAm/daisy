<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use DB;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminUser = User::create(
            [
                'name' => 'Admin',
                'email' => 'admin@orange.com',
                'password' => bcrypt('secretadmin'),
            ]
        );

        $adminRoleId = DB::table('roles')->where('name', 'admin')->first()->id;
        DB::table('role_user')->insert([
            'user_id' => $adminUser->id,
            'role_id' => $adminRoleId,
        ]);

        $adminUser->createToken('AdminPersonalAccessToken')->accessToken;

        $simpleUser = User::create(
            [
                'name' => 'User',
                'email' => 'user@orange.com',
                'password' => bcrypt('secretuser'),
            ]
        );

        $userRoleId = DB::table('roles')->where('name', 'user')->first()->id;
        DB::table('role_user')->insert([
            'user_id' => $simpleUser->id,
            'role_id' => $userRoleId,
        ]);
        $simpleUser->createToken('UserPersonalAccessToken')->accessToken;
    }
}
