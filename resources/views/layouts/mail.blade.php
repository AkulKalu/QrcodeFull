<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Text&display=swap" rel="stylesheet">
    <title>Mail</title>
    <style>       
        * {
            margin: 0;
            padding: 0;
            font-family: 'Crimson Text', serif;
        }
       
        .data {
            font-size: 2vh;
            margin: 0.5vh 0;
            display: flex;
        }
       
        .main {
            box-sizing: border-box;
            padding:2vh 2vh;
            width: 100%;
        }
        .title {
            background-color: grey;
            padding: 0.5rem 0;
        }
        .title h2 {
            color: white;
            margin-left: 1vh;
        }
        .message {
            font-size: 2vh;
            margin: 2vh 0;
        }
        .info{
            margin-top: 2vh;
            padding: 1.5vh;
            background-color: rgba(202, 209, 209, 0.555);
        }
        .list {
            padding: 1vh 1vh;
        }
        .amount {
            font-size: 5vh;
            padding-top: 1vh;
            margin-left: 4vh;
        }
        
        .li-itm-title {
           font-weight: 600;
           margin: 0 1vh;
        }
        
    </style>
</head>
<body>
    <div class="main">
        @yield('content')
    </div>
</body>
</html>