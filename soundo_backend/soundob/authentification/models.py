from django.db import models

class userdb(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
