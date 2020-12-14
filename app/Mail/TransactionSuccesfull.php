<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TransactionSuccesfull extends Mailable
{
    use Queueable, SerializesModels;
    public $order;
    public $shipping;
    public $product;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order, $product, $shipping=null)
    {
        $this->order = $order;
        $this->product = $product;
        $this->shipping = $shipping;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('laravelqrcodes@gmail.com')
                    ->view('mail.order_completed');
    }
}
