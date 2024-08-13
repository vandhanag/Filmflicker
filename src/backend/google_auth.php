// google_auth.php
<?php
require 'vendor/autoload.php';
include 'db.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

$client = new Google_Client(['client_id' => 'YOUR_GOOGLE_CLIENT_ID']); // Specify your Google Client ID

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
