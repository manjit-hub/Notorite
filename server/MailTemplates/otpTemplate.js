const otpTemplate = (name, otp) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notorite - Verify OTP</title>
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f9f9ff;
            font-family: 'Raleway', sans-serif;
            color: #000;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
        }

        img {
            display: block;
            max-width: 10%;
            height: auto;
            margin: 0 auto;
        }

        h1 {
            text-align: center;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 20px;
            }
            
        p {
            text-align: center;
            font-size: 16px;
            margin-bottom: 20px;
        }

        .otp-code {
            font-size: 25px;
            font-weight: bold;
            background-color: #f8f9fa;
            padding: 15px;
            text-align: center;
            border-radius: 8px;
            border: 1px dashed #007bff;
            color: #007bff;
        }

        a.button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: 700;
            color: #000;
            background-color: #fdb441;
            border-radius: 25px;
            text-decoration: none;
        }

        .contact p {
            text-align: center;
            font-size: 12px;
            margin: auto 20%;
        }
    </style>
</head>

<body>
    <img src="https://img.freepik.com/free-vector/open-email-envelope_1020-530.jpg" alt="Email Verification" />
    <div class="container">
        <h1>Verify Your Email Address</h1>
        <p style="font-size: 20px; font-weight: 550;">Hello, ${name}!</p>
        <p>Thank you for choosing Notorite. Your One-Time Password (OTP) for verification is:</p>
        <div class="otp-code">${otp}</div>
        <p>Please use this OTP to complete your verification. The OTP is valid for the next 30 minutes.</p>
    </div>
    <div class="contact">
        <p>If you continue to have problems please feel free to contact us at <span
                style="text-decoration: underline">helpnotorite@gmail.com</span>.</p>
    </div>
</body>

</html>
    `;
};

export default otpTemplate;