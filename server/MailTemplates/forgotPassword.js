const forgotPasswordTemplate = (name, link) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Notorite - Reset Password</title>
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
                    max-width: 35%;
                    height: auto;
                    margin: 0 auto;
                }

                h1 {
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 20px;
                }

                p {
                    font-size: 16px;
                    margin-bottom: 20px;
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
                    font-size: 12px;
                    margin: auto 20%;
                }
            </style>
        </head>

        <body>
            <img src="https://cdn.pixabay.com/animation/2024/04/22/04/35/04-35-34-864_512.gif" alt="Reset Password Animation" />
            <div class="container">
                <h1>Forget your Notorite password?</h1>
                <p>Dear ${name},</p>
                <p>If you've lost your password or wish to reset it, not to worry, we got you! Let's get you a new password.</p>
                <a href="${link}" class="button">Reset Password</a>
                <p>If you're facing any problems using the button, try clicking on the link below:</p>
                <a href="${link}">${link}</a>
                <p>If you didn't request to change your password, simply ignore this email.</p>
            </div>
            <div class="contact">
                <p>This link will expire in 24 hours. If you continue to have problems please feel free to contact us at <span style="text-decoration: underline">helpnotorite@gmail.com</span>.</p>
            </div>
        </body>s

        </html>
    `;
};

export default forgotPasswordTemplate;