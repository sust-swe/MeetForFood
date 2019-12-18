from django.db import models

from profiles.models import UserProfile as User
import uuid
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser

def validate_message_content(content):
    if content is None or content == "" or content.isspace():
        raise ValidationError(
            'Content is empty or invalid',
            code = 'invalid',
            params = {
                'content' : content
            }
        )
        

        
class Message(models.Model):
    id = models.UUIDField(primary_key = True,null = False, default = uuid.uuid4, editable = False)
    author = models.ForeignKey(User, blank = False, null = False, related_name='author_messages', on_delete=models.CASCADE)
    content = models.TextField(validators=[validate_message_content])
    created_at = models.DateTimeField(auto_now_add = True, blank = True)

 

# Create your models here.
