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
    <link href="https://fonts.googleapis.com/css2?family=Abhaya+Libre&family=Teko:wght@300&display=swap&family=Iceland&display=swap" rel="stylesheet">

    <!-- Styles -->
    
    @guest
        <link href="{{ asset('css/bootstrap.css') }}" rel="stylesheet">
    @endguest
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script src="{{ asset('js/app.js') }}" defer > </script>
    
    
</head>
<body >
    @guest
        <nav class="navbar navbar-expand-md navbar-light header">
            <div class="container">
                <div class="nav-item">
                    <a class="over-link" href="{{ url('/') }}">Main</a>
                </div>
                <div style="display:flex">
                    <div class="nav-item">
                        <a class="over-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                    </div>
                    @if (Route::has('register'))
                        <div class="nav-item">
                            <a class="over-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                        </div>
                    @endif
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
   
</body>
</html>
