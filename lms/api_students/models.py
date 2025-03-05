from django.db import models

class Student(models.Model): 
    '''Сущность студента'''
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)
    education_document = models.OneToOneField(
        'StudentEducationDocument', 
        on_delete=models.CASCADE, 
        related_name='student_document')
    russian_document = models.OneToOneField(
        'StudentRussianDocuments', 
        on_delete=models.CASCADE, 
        null=True,
        related_name='russian_document' ) 
    foreign_document = models.OneToOneField(
        'StudentForeignDocuments', 
        on_delete=models.CASCADE, 
        null=True,
        related_name='foreign_document')  
    
    def __str__(self): 
        otchestvo = self.user.otchestvo if self.user.otchestvo != 'Отсутствует' else '' 
        return f'{self.user.surname} {self.user.name} {otchestvo}'
    

class StudentEducationDocument(models.Model):
    '''Документ о предыдущем образовании'''
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE) 
    number = models.CharField(max_length=55, unique=True)
    date_issuance = models.DateField()
    issued_by = models.CharField(max_length=155)
    
class StudentRussianDocuments(models.Model):
    '''Документы студентов из России'''
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE) 
    snils = models.CharField(unique=True)
    inn = models.CharField(unique=True)
    
class StudentForeignDocuments(models.Model): 
    '''Документы студентов из других стран'''
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE) 
    fp_number = models.CharField(max_length=55, unique=True)
    fp_date_issuance = models.DateField()
    fp_expire_date = models.DateField()
    fp_issued_by = models.CharField(max_length=155)
    mc_number = models.CharField(max_length=55, unique=True)
    mc_date_entry = models.DateField()
    