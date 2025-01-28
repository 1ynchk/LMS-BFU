from django.db import models

# Create your models here.

# CATEGORIES

class NewsCategories(models.Model): 
    title = models.CharField(max_length=50, unique=True)
    slug = models.CharField(
        max_length=50, 
        null=False, 
        blank=False,)

    def __str__(self):
        return self.title

# RATES

class NewsRates(models.Model):
    rates = models.BooleanField(null=True, )
    news = models.ForeignKey('News', on_delete=models.CASCADE)
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user} | {self.news} | {self.rate}'

# COMMENTS

class NewsComments(models.Model):
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE) 
    comment = models.CharField(max_length=2000)
    date_pub = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user

# BASE

class NewsAbstract(models.Model): 
    title = models.CharField(max_length=155)
    cats = models.ManyToManyField(NewsCategories)
    value = models.CharField(max_length=5000)
    rates = models.ManyToManyField(NewsRates, related_name='news_rates')
    comments = models.ManyToManyField(NewsComments, )

    def __str__(self):
        return self.title
    
class News(NewsAbstract):
    pass

class Scratch(NewsAbstract):
    pass