from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TopperViewSet, CourseViewSet, SubjectViewSet,
    BranchViewSet, StatViewSet, InquiryViewSet,
    SiteSettingViewSet,
    CustomObtainAuthToken, CheckAuthView
)

router = DefaultRouter()
router.register(r'toppers', TopperViewSet, basename='topper')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'subjects', SubjectViewSet, basename='subject')
router.register(r'branches', BranchViewSet, basename='branch')
router.register(r'stats', StatViewSet, basename='stat')
router.register(r'inquiries', InquiryViewSet, basename='inquiry')
router.register(r'settings', SiteSettingViewSet, basename='setting')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', CustomObtainAuthToken.as_view(), name='api_token_auth'),
    path('auth/me/', CheckAuthView.as_view(), name='api_auth_me'),
]
