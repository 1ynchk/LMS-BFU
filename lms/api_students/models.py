from django.db import models

class StudentEducationDocument(models.Model):
    '''Документ о предыдущем образовании'''

    category_exams_choices = [
        ('ЕГЭ', "Единый Государственный экзамен"),
        ('ВЭ', "ВСтупительные экзамены")
    ]
    
    category_documents = [
        ('Копия', 'Копия'),
        ('Копия', 'Копия')
    ]
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)
    number = models.CharField(max_length=55)
    date_issuance = models.DateField()
    issued_by = models.CharField(max_length=155)
    category_exams = models.CharField(choices=category_exams_choices)
    category_documents = models.CharField(choices=category_documents)
    
    def __str__(self): 
        otchestvo = self.user.otchestvo if self.user.otchestvo != 'Отсутствует' else '' 
        return f'{self.user.surname} {self.user.name} {otchestvo}'

class StudentRussianDocuments(models.Model):
    '''Документы студентов из России'''
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE) 
    snils = models.IntegerField()
    inn = models.IntegerField()
    
    def __str__(self): 
        otchestvo = self.user.otchestvo if self.user.otchestvo != 'Отсутствует' else '' 
        return f'{self.user.surname} {self.user.name} {otchestvo}'
    
class StudentForeignDocuments(models.Model): 
    '''Документы студентов из других стран'''
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)
    fp_number = models.CharField(max_length=55)
    fp_date_issuance = models.DateField()
    fp_expire_date = models.DateField()
    fp_issued_by = models.CharField(max_length=155)
    
    mc_number = models.CharField(max_length=55)
    mc_date_entry = models.DateField()
    
    def __str__(self): 
        otchestvo = self.user.otchestvo if self.user.otchestvo != 'Отсутствует' else '' 
        return f'{self.user.surname} {self.user.name} {otchestvo}'
    
    