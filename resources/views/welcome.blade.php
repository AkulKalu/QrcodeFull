<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
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
                    <div id="mainCards" class = "CardsW" >
                      
                    </div>
                </div>
            </div>
        </div>
   
           
    </body>
</html>
