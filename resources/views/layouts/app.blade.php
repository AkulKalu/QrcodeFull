<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Abhaya+Libre&family=Teko:wght@300&display=swap" rel="stylesheet">

    <!-- Styles -->
    
    @guest
        <link href="{{ asset('css/bootstrap.css') }}" rel="stylesheet">
    @endguest
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    

    
</head>
<body >
    @guest
        <nav class="navbar navbar-expand-md navbar-light">
            <div class="container">
                <div class="nav-item">
                    <a class="over-link" href="{{ url('/') }}">Main</a>
                </div>
               
                <button  class="navbar-toggler over-ham-btn" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <div class="ham-line"></div>
                    <div class="ham-line"></div>
                    <div class="ham-line"></div>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                            <li class="nav-item">
                                <a class="over-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="over-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                    </ul>
                </div>
            </div>
        </nav>
        <main class="py-4">
            @yield('content')
        </main>
        @else
        <div  id="ControlPanel">
        </div>
        @endguest
    <script src="{{ asset('js/app.js') }}" ></script>
</body>
</html>
