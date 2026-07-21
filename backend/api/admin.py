from django.contrib import admin
from .models import Topper, Course, Subject, Branch, Stat, Inquiry

@admin.register(Topper)
class TopperAdmin(admin.ModelAdmin):
    list_display = ('name', 'score', 'subject', 'category', 'year', 'is_perfect')
    list_filter = ('category', 'is_perfect', 'year')
    search_fields = ('name', 'school', 'subject')

class SubjectInline(admin.TabularInline):
    model = Subject
    extra = 1

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'badge', 'grade')
    inlines = [SubjectInline]
    search_fields = ('title',)

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'course')
    list_filter = ('course',)
    search_fields = ('name',)

@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'hours')
    search_fields = ('name', 'address')

@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'icon_name')

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'parent_name', 'phone', 'email', 'grade', 'status', 'created_at')
    list_filter = ('status', 'grade', 'created_at')
    search_fields = ('student_name', 'parent_name', 'phone', 'email')
    readonly_fields = ('created_at',)
