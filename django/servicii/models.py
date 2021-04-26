from django.db import models
from django.utils import timezone
from django.conf import settings
from django.utils.translation import gettext_lazy as _


def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)


# class Category(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name

# class Judet(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name


class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset() .filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=250)
    # category = models.ForeignKey(
    #     Category, on_delete=models.PROTECT, default=1)
    category = models.CharField(max_length=40)
    image = models.ImageField(
        _("Image"), upload_to=upload_to, default='posts/default.jpg')
    descriere = models.TextField(default=None)
    # experienta = models.TextField(default=None, null=True)
    email = models.EmailField(default=None)
    # judet = models.ForeignKey(
    #     Judet, on_delete=models.PROTECT, default=1)
    judet = models.CharField(max_length=40)
    locatie = models.TextField(max_length=80, default=None)
    nrtel = models.DecimalField(decimal_places=0, max_digits=10, default=None, null=True)
    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blog_posts')
    status = models.CharField(
        max_length=10, choices=options, default='published')
    objects = models.Manager()  # default manager
    postobjects = PostObjects()  # custom manager

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title
