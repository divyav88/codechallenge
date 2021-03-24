"""using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python"""
import os

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class Email():  # pylint: disable=too-few-public-methods
    """Send Email"""
    
    @staticmethod
    def send(to_email: str, title: str, message: str):
        """Send Watch notification using SendGrid"""
        message = Mail(
            from_email='abin.antony@aot-technologies.com',
            to_emails=to_email,
            subject='Notification:',
            html_content='<strong>' + message + ' <i>Topic:' + title + '</i></strong>')

        print(os.getenv('SENDGRID_API_KEY'))
        sg_client = SendGridAPIClient(api_key='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')
        response = sg_client.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        #print('Sending Email is commented')
