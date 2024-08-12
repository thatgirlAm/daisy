<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use DateTime; 
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Attachment;

class ResultsMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(protected string $date_toString,  protected string $message) 
    {
        $this->date_toString = (new DateTime($date_toString))->format('Y-m-d');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Results Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        if(!$this->date_toString)
        {
            return new Content(
            view: 'mail',
            with: [
                'date' => $this->date_toString,
            ],
        );
        }
        else 
        {
            return new Content(
                view: 'mail_content',
                with: [
                    'date' => $this->date_toString,
                    'content'=> $this->message
                ],
            );
        }
        
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromPath('C:\Users\amaelle.diop\orion\back\app\Mail\results'.$this->date_toString.'.xlsx')
                ->as('Results_'.$this->date_toString.'.xlsx'),
            Attachment::fromPath('C:\Users\amaelle.diop\orion\back\app\Mail\OM_'.$this->date_toString.'.xlsx')
                ->as('OM_'.$this->date_toString.'.xlsx'),
            Attachment::fromPath('C:\Users\amaelle.diop\orion\back\app\Mail\PARTENAIRE_'.$this->date_toString.'.xlsx')
                ->as('PARTENAIRE_'.$this->date_toString.'.xlsx')
        ];
    }
}
