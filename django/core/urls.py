from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # API Token Management
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Project URLs
    path('admin/', admin.site.urls),
    path('', include('servicii.urls', namespace='servicii')),
    # User Management
    path('api/user/', include('users.urls', namespace='users')),
    # Servicii_API Application
    path('api/', include('servicii_api.urls', namespace='servicii_api')),

    # API schema and Documentation
    path('project/docs/', include_docs_urls(title='ServiciiAPI')),
    path('project/schema', get_schema_view(
        title="ServiciiAPI",
        description="API for the ServiciiAPI",
        version="1.0.0"
    ), name='openapi-schema'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
