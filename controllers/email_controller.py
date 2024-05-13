import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
import ssl
from flask import jsonify

def sendEmail(subject, recipient, body, html_body=None):
    context = ssl.create_default_context()
    myEmail = os.getenv("SECRET_EMAIL")
    myPassword = os.getenv("PASSWORD_EMAIL")
    smtp = smtplib.SMTP_SSL('smtp.gmail.com', 465,context)
    smtp.login(myEmail, myPassword)

    msg = MIMEMultipart('alternative')
    msg['From'] = myEmail
    msg['To'] = ', '.join(recipient)
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    if html_body:
        msg.attach(MIMEText(html_body, 'html'))

    smtp.sendmail(myEmail, recipient, msg.as_string())
    smtp.quit()

    return jsonify({'message': 'E-mail enviado com sucesso'})
