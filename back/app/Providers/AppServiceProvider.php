<?php

namespace App\Providers;

use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider;
use Illuminate\Support\Facades\Schema;
use Laravel\Passport\Passport;
use Carbon\Carbon;



class AppServiceProvider extends AuthServiceProvider
{
    protected $policies= [
        User::class=> UserPolicy::class
    ];
    /**
     * Register any application services.
     */

    public function register()
{
    Passport::ignoreRoutes();
}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
        Schema::defaultStringLength(191);
        Passport::tokensExpireIn(Carbon::now()->addDays(1));
        Passport::refreshTokensExpireIn(Carbon::now()->addDays(30));
        
    }
}
