const emailTemplate = (token) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px 0;
        }
        .content {
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            font-size: 16px;
            color: #ffffff;
            background-color: #4CAF50;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #999999;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Campus Fusion</h1>
        </div>
        <div class="content">
            <h2>Email Verification</h2>
            <p>Thank you for registering with Campus Fusion. Please click the button below to verify your email address.</p>
            <a href="${process.env.BASE_URL}/verify-email?token=${token}" class="button">Verify Email</a>
            <p>If you did not register for this account, you can ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Campus Fusion. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = emailTemplate;
