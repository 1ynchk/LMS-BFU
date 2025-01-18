from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class Users(AbstractUser):

    role_choices = [
        ('AD', "Admin"),
        ('MOD', "Moderator"),
        ('TCH', 'Teacher'),
        ('ST', 'Student'),
        ('AP', 'Applicant')
    ]
    
    email = models.CharField(null=False, blank=False)
    role = models.CharField(max_length=30, choices=role_choices)

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
