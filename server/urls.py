from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/auth/', include('accounts.urls')),
    url(r'^api/v1/chat/', include('chat.urls')),
]
