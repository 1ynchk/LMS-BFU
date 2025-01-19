from django.db import models
from django.contrib.auth.models import AbstractUser

import os
from django.conf import settings

# Create your models here.
class Users(AbstractUser):

    role_choices = [
        ('admin', "Admin"),
        ('moderator', "Moderator"),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('applicant', 'Applicant')
    ]

    email = models.CharField(blank=False, null=False, unique=True)    
    avatar = models.ImageField(default=os.path.join(settings.BASE_DIR, 'api_users/images/avatar.png'))
    role = models.CharField(max_length=30, choices=role_choices)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    class Meta: 
        db_table = 'api_users__users'

# class Applicants(models.Model): 

#     type_exam_choices = [
#         ("ЕГЭ", 'Единый Государственный Экзамен'),
#         ('ВЭ', 'Вступительные экзамены'),
#         ('О', 'Олимпиады'),
#         ('ДВИ', 'Дополнительные вступительные испытания'),
#     ]
    
#     education_document_number = models.BigIntegerField(verbose_name='Номер документа об образовании', null=False, blank=False)
#     type_exam = models.CharField(max_length=10, choices=type_exam_choices)
