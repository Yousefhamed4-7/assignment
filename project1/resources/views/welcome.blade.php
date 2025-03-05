<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
    @vite("resources/js/app.js")
</head>

<body>
</body>


<script>
    document.addEventListener('DOMContentLoaded', function() { // Wait for DOM
        console.log(Echo); // Check if Echo is defined (should be now)
        Echo.channel('status').listen("StatusChecker", (e) => {
            document.getElementById("username").textContent = e.user.name;
            console.log(e);
        });
    });
</script>

</html>