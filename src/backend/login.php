<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers to allow requests from your React frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Respond OK for preflight requests
    exit(0);
}

// Check if Authorization header is present
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    echo json_encode(["message" => "Error: Token not provided"]);
    exit(1); // Exit if no token is provided
}

$authHeader = $headers['Authorization'];
$token = str_replace('Bearer ', '', $authHeader);

// Verify the token (Assuming you're using JWT, adjust for your system)
try {
    // Use your preferred method to decode/verify the token here
    // e.g., using Firebase JWT or a similar library
    $decodedToken = decode_jwt($token); // Replace with actual token decoding logic

    // Proceed with login logic
    // Connect to the database
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "auth_db";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check if the connection was successful
    if ($conn->connect_error) {
        echo json_encode(["message" => "Connection failed: " . $conn->connect_error]);
        exit(1); // Exit with an error code
    }

    // Retrieve the posted data
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Validate input
    if (isset($data['username']) && isset($data['password'])) {
        $username = $conn->real_escape_string($data['username']);
        $password = $data['password'];

        // Prepare SQL statement to prevent SQL injection
        $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        // Check if user exists
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Verify the password
            if (password_verify($password, $row['password'])) {
                echo json_encode(["message" => "Login successful"]);
            } else {
                echo json_encode(["message" => "Invalid password"]);
            }
        } else {
            echo json_encode(["message" => "Username not found"]);
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        echo json_encode(["message" => "Invalid input"]);
    }

    // Close the database connection
    $conn->close();
    
} catch (Exception $e) {
    // Handle token verification
