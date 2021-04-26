from django.contrib import admin
from . import models


@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('category', 'judet', 'title', 'id', 'descriere', 'email', 'judet', 'locatie', 'nrtel', 'status', 'slug', 'author')
    prepopulated_fields = {'slug': ('title',), }


# admin.site.register(models.Category)
# admin.site.register(models.Judet)