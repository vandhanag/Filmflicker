<?php
require 'vendor/autoload.php';
include 'db.php';

// Always include CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Max-Age: 86400"); // Cache for 1 day
    exit(0);
}

// Your Google authentication logic here
$client = new Google_Client(['client_id' => '843338869291-q188tfcfasg9f8dfohu06ms9qaggqbmj.apps.googleusercontent.com']); // Specify your Google Client ID

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (isset($data['token'])) {
    $token = $data['token'];

    try {
        $payload = $client->verifyIdToken($token);
        if ($payload) {
            $google_id = $payload['sub'];
            $email = $payload['email'];
            $name = $payload['name'];

            // Check if the user already exists in the database
            $sql = "SELECT * FROM users WHERE google_id='$google_id' OR email='$email'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                // User exists, log them in
                echo json_encode(["message" => "Login successful"]);
            } else {
                // User does not exist, create a new account
                $sql = "INSERT INTO users (google_id, email, name) VALUES ('$google_id', '$email', '$name')";
                if ($conn->query($sql) === TRUE) {
                    echo json_encode(["message" => "Signup successful"]);
                } else {
                    echo json_encode(["message" => "Error: " . $sql . "<br>" . $conn->error]);
                }
            }
        } else {
            echo json_encode(["message" => "Invalid ID token"]);
        }
    } catch (Exception $e) {
        echo json_encode(["message" => "Authentication error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "Token not provided"]);
}

$conn->close();
?>