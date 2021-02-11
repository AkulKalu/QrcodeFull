<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Abhaya+Libre&family=Teko:wght@300&display=swap&family=Iceland&display=swap" rel="stylesheet">
        <link rel="stylesheet"  href="{{ asset('css/app.css') }}">
        <script src="{{ asset('js/app.js') }}"  defer ></script>
        <title>Simple QrCodes</title>
    </head>
    <body>
        <div class="Background">
        <div class = "Header">
                   <div class="HContent"></div>
                   <div class = "AccountCtrl" >
                        @if (Route::has('login'))
                            @auth
                                <a class="Link" href="{{ url('/home') }}" >Home</a>
                            @else 
                          
                                <a class="Link" href="{{ route('login') }}" >Login</a>

                                @if (Route::has('register'))
                                     <a class="Link" href="{{ route('register') }}" >Register</a>
                                @endif
                            @endif
                            
                        @endif
                    </div>
            </div>
            <div class = "Main">
                <div class = "Content">
                    <div class = "LogoW" >
                        <div id="mainLogo" class="LogoC">
                           
                        </div>
                    </div>
                    <form method="POST" action="{{ route('login') }}">
                            @csrf
                            <input id="email" type="email"   name="email" value="friend@gmail.com" hidden>
                            <input  id="password" type="password" name="password" value="12345678" required hidden>
                            <button  type="submit" class="Demo">
                                   DEMO
                                </button>
                            </form>
                    <div id="mainCards" class = "CardsW" >
                      
                    </div>
                </div>
            </div>
        </div>
   
           
    </body>
</html>
