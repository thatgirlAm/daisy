<?php 

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\UserResource;
use App\Models\Role;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;



class AuthController extends Controller 
{
    use FormatTrait;


    //------------------Registering a new user------------------//
    public function register(RegisterRequest $request)
    {
    $user = Auth::user();
    $this->authorize('create', $user);
    $emailExists = User::where('email', $request->email)->first();
    if ($emailExists) {
        return $this->formatError('Email already exists', Response::HTTP_FORBIDDEN);
    }

    $roleExists = Role::where('name', $request->role)->first(); 
    if (!$roleExists) {
        return $this->formatError('Role does not exist', Response::HTTP_BAD_REQUEST);
    }

    $request->remember_token = Str::random(10);

    $user = User::create([
        'email' => $request->email,
        'name' => $request->name,
        'password' => Hash::make($request->password),
        'remember_token' => $request->remember_token,
    ]);
    $user->roles()->attach($roleExists->id); 
    $user->role = $request->role ; 
    $token = $user->createToken('orion')->accessToken;
    $user->token = $token;
    $userResource = new UserResource($user);
    return $this->format(['Registered', Response::HTTP_CREATED, $userResource]);
    }


    //------------------Checking if a user is logged in------------------//
    public function isLoggedIn()
    {
        return Auth::attempt();
    }

    //------------------Loging in------------------//
    public function login(LoginRequest $request)
{
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $user = Auth::user()->load('roles');
        $roleName = $user->roles->first() ? $user->roles->first()->name : 'user';
        $token = $user->createToken('orion access token')->accessToken;
        $user->token = $token;
        $user->role = $roleName;
        $userResource = new UserResource($user);
        return $this->format(['Utilisateur authentifié', response::HTTP_OK, $userResource]);
    } else {
        return $this->formatError('Utilisateur non authentifié. Veuillez vérifier vos identifiants', response::HTTP_UNAUTHORIZED);
    }
}
  

    


    //------------------Loging out------------------//
    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->token()->revoke();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Successfully logged out']);
    }

    //------------------Getting the connected user's info------------------//
    public function getUser()
    {
        return Auth::user();
    }

    public function isAdmin()
    {
        $user = Auth::user();
        $isAdmin = $user->roles()->where('name', 'admin')->exists();
        if ($isAdmin) {
            return $this->format(['The user is an admin', Response::HTTP_OK, $isAdmin]);
        } else {
            return $this->format(['The user is not an admin', Response::HTTP_UNAUTHORIZED, $isAdmin]);
        }
}
}