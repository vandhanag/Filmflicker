<?php
// Database connection
$servername = "localhost";
$username = "your_username"; // replace with your DB username
$password = "your_password"; // replace with your DB password
$dbname = "movie_ratings_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header("Content-Type: application/json");

// Get the posted data
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['movie_id']) && isset($input['rating'])) {
    $movieId = $input['movie_id'];
    $rating = intval($input['rating']);
    $userId = 1; // For simplicity, you might want to replace this with an actual user ID

    // Insert the rating into the database
    $stmt = $conn->prepare("INSERT INTO ratings (movie_id, rating, user_id) VALUES (?, ?, ?)");
    $stmt->bind_param("iii", $movieId, $rating, $userId);

    if ($stmt->execute()) {
        // Fetch the average rating for the movie
        $result = $conn->query("SELECT m.title, AVG(r.rating) as average_rating FROM movies m JOIN ratings r ON m.id = r.movie_id WHERE m.id = $movieId GROUP BY m.id");
        $averageRatings = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode($averageRatings);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save rating"]);
    }
    
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
}

$conn->close();
?>
