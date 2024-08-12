<?php

namespace App\Http\Controllers;
use Auth; 
use App\Mail\ResultsMail;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\EmailRequest; 
use DateTime; // Add this line to import the DateTime class


class UserController extends Controller
{
    public function create(EmailRequest $request)
    {
        $data = $request->validated();
        $data['message'] = $data['message'] ?? null ; 
        $user = Auth::user();
        // $this->authorize('create', $user);
        $date = new DateTime($data['date']);
        $date_toString = $date->format('Y-m-d H:i:s');
        // $date_2 = (string)$date_toString;
        // $subject = "Today's weather";
        $body = $data['message'];
        // $attachement = "C:\Users\amaelle.diop\orion\back\app\Mail\results.xlsx";
        foreach ($data['receipients'] as $mail) {

            Mail::to($mail)->send(new ResultsMail($date_toString, $body));
        }
    
        return 'Email sent successfully';
    }


}

