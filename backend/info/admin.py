from django.contrib import admin

from .models import (
    Recomendation, MakulaChoice, PereferyChoice, 
    EyeInfo, ColorChoice, BorderChoice, DZN
)

admin.site.register(Recomendation)
admin.site.register(MakulaChoice)
admin.site.register(PereferyChoice)
admin.site.register(EyeInfo)
admin.site.register(ColorChoice)
admin.site.register(BorderChoice)
admin.site.register(DZN)