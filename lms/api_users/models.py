from django.core.validators import FileExtensionValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from django_ulid.models import default, ULIDField

from api_users.BLL.models.change_file_name import change_file_name

class Users(AbstractUser):

    role_choices = [
        ('admin', "Admin"),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('applicant', 'Applicant')
    ]

    id  = ULIDField(default=default, primary_key=True, editable=False)
    email = models.CharField(blank=False, null=False, unique=True)
    number = models.CharField(max_length=12, null=False, unique=True) 
    role = models.CharField(max_length=30, choices=role_choices)
    last_name = None
    first_name = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta: 
        db_table = 'api_users__users'

class UsersInfo(models.Model): 

    gender_choices = [
        ('М', 'Мужской'),
        ('Ж', 'Женский')
    ]

    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=True, unique=True)
    name = models.CharField(max_length=155, null=False)
    surname = models.CharField(max_length=155, null=False)
    otchestvo = models.CharField(max_length=155, null=False)
    avatar = models.FileField(
        upload_to=change_file_name, 
        default='media/default_images/user_avatar.png',
        validators=[FileExtensionValidator(allowed_extensions=['png'])])
    gender = models.CharField(max_length=7, choices=gender_choices, null=False)
    date_of_birth = models.DateField(null=False)
    citizenship = models.CharField(max_length=200, null=False) 

    def __str__(self): 
        return f'{self.surname} {self.name} {self.otchestvo}'

class UsersPermissions(models.Model): 
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    change_news = models.BooleanField(default=False)
    make_courses = models.BooleanField(default=False)

    def __str__(self): 
        return self.user.email

# class Applicants(models.Model): 

#     type_exam_choices = [
#         ("ЕГЭ", 'Единый Государственный Экзамен'),
#         ('ВЭ', 'Вступительные экзамены'),
#         ('О', 'Олимпиады'),
#         ('ДВИ', 'Дополнительные вступительные испытания'),
#     ]
    
#     education_document_number = models.BigIntegerField(verbose_name='Номер документа об образовании', null=False, blank=False)
#     type_exam = models.CharField(max_length=10, choices=type_exam_choices)
