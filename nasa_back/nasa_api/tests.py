from django.test import TestCase
from models import Comets
# Create your tests here.

class MeteorTests(TestCase):
    def teste_if_returns_all_meteor(self):
        all = Comets.objects.all()
        self.assertEqual(all,Comets.objects.all())
        