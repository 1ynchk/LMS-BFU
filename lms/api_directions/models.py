from django.db import models

from api_directions.BLL.models.change_file_name import change_file_name 

# Create your models here.
class Directions(models.Model):
    '''Таблица для направлений'''

    form_education = [
        ('O', 'Очная'),
        ('Z', 'Заочная')
    ]
    
    photo = models.FileField(
        default='media/default_images/news_default.png',
        upload_to=change_file_name
    )  
    name = models.CharField(max_length=155)
    slug = models.CharField(max_length=155)
    description = models.CharField(max_length=3000)
    subjects_budget_paid = models.ManyToManyField(
        'Subjects', 
        through='DirectionsSubjectsThroughBudgetPaid',
        related_name='subject_budget')
    
    budget_places = models.IntegerField()
    paid_places = models.IntegerField()
    school = models.ForeignKey('School', on_delete=models.CASCADE, null=True)
    learning_time = models.DecimalField(max_digits=3, decimal_places=2)
    form_ed = models.CharField(max_length=20, choices=form_education)
    
    def __str__(self):
        return self.name
        
class School(models.Model): 
    '''Высшие школы / факультеты'''
    
    name = models.CharField(max_length=155)
    description = models.CharField(max_length=2000)
    
    def __str__(self): 
        return self.name  

class Subjects(models.Model):
    '''Предметы ЕГЭ'''
    
    name = models.CharField(max_length=200) 
    
    def __str__(self):
        return self.name
    
class DirectionsSubjectsThroughBudgetPaid(models.Model): 
    '''
    Many-to-Many минимальные баллы для 
    направлений и предметов на бюджетной основе
    '''

    type_points = [
        ('B', 'Budget'),
        ('P', 'Paid')
    ]
    
    direction = models.ForeignKey(Directions, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subjects, on_delete=models.CASCADE)
    points = models.IntegerField()
    type_points = models.CharField(choices=type_points, max_length=30)
    