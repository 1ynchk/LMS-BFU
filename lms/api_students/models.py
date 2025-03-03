from django.db import models

class StudentEducationDocument(models.Model):
    '''Документ о предыдущем образовании'''

    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)
    number = models.CharField(max_length=55, unique=True)
    date_issuance = models.DateField()
    issued_by = models.CharField(max_length=155)
    
    def __str__(self): 
        otchestvo = self.user.otchestvo if self.user.otchestvo != 'Отсутствует' else '' 
        return f'{self.user.surname} {self.user.name} {otchestvo}'

class StudentRussianDocuments(models.Model):
    '''Документы студентов из России'''
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE) 
    snils = models.CharField(unique=True)
    inn = models.CharField(unique=True)
    
    def __str__(self): 
        otchestvo = self.user.otchestvo if self.user.otchestvo != 'Отсутствует' else '' 
        return f'{self.user.surname} {self.user.name} {otchestvo}'
    
class StudentForeignDocuments(models.Model): 
    '''Документы студентов из других стран'''
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)
    fp_number = models.CharField(max_length=55, unique=True)
    fp_date_issuance = models.DateField()
    fp_expire_date = models.DateField()
    fp_issued_by = models.CharField(max_length=155)
    mc_number = models.CharField(max_length=55, unique=True)
    mc_date_entry = models.DateField()
    
    def __str__(self): 
        otchestvo = self.user.otchestvo if self.user.otchestvo != 'Отсутствует' else '' 
        return f'{self.user.surname} {self.user.name} {otchestvo}'
    
    