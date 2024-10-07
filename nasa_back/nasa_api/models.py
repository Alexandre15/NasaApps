from django.db import models

# Create your models here.
class Comets(models.Model):
    obj_name=models.CharField(max_length=100,primary_key=True)
    p_ir=models.FloatField()
    moid_au=models.FloatField()
    w_deg=models.FloatField()
    ref = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f'{self.obj_name}'
