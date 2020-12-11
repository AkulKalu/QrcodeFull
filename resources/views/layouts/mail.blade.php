<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="{{ asset('css/mail.css') }}" rel="stylesheet">
    <title>Mail</title>
    <style>       
        * {
            margin: 0;
            padding: 0;
        }
        .data {
            font-size: 2vh;
            display: flex;
        }
        .main {
            padding:2rem 2rem;
            width: 60%;
        }
        .title {
            background-color: grey;
            padding: 0.5rem 0;
        }
        .title h2 {
            color: white;
            margin-left: 1rem;
        }
        .message {
            padding: 1rem 0;
        }
        .info{
            margin-top: 2rem;
            padding: 1rem;
            background-color: rgba(202, 209, 209, 0.555);
        }
        .list {
            padding: 0.5rem 1rem;
        }
        .amount {
            font-size: 3vh;
            padding-top: 1rem;
            margin-left: 4rem;
        }
        .order-list li {
            padding-bottom: 0.2rem;
        }
        .li-itm-title {
            font-weight: bold;
            padding-right:1rem;
        }
        
    </style>
</head>
<body>
    <div class="main">
        @yield('content')
    </div>
</body>
</html>