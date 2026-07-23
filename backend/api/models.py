from django.db import models

class Topper(models.Model):
    CATEGORY_CHOICES = [
        ('SCIENCE', 'Aggregate Science Toppers'),
        ('HINDI', 'Hindi Toppers'),
        ('HISTORY_GEOGRAPHY', 'History & Geography Toppers'),
        ('LITERATURE_LANGUAGE', 'Literature & Language Toppers'),
    ]
    name = models.CharField(max_length=100)
    school = models.CharField(max_length=200)
    score = models.CharField(max_length=20)  # String to handle percentages and "/100" formats
    subject = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    is_perfect = models.BooleanField(default=False)
    year = models.CharField(max_length=20, default="2024-2025")

    def __str__(self):
        return f"{self.name} - {self.score} ({self.category})"

class Course(models.Model):
    badge = models.CharField(max_length=50, default="FULL YEAR")
    grade = models.CharField(max_length=50, default="7 – 10")
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title

class Subject(models.Model):
    course = models.ForeignKey(Course, related_name='subjects', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f"{self.name} ({self.course.title})"

class Branch(models.Model):
    name = models.CharField(max_length=100)  # e.g., Chembur, Matunga
    address = models.TextField()
    phone = models.CharField(max_length=50)
    hours = models.CharField(max_length=100, default="Mon–Sun : 1:00 PM – 8:30 PM")
    image = models.URLField(max_length=500, blank=True, null=True, help_text="Paste an Imgur or external image link here")
    google_maps_url = models.URLField(max_length=500, blank=True, null=True, help_text="Paste exact Google Maps URL here")

    def __str__(self):
        return self.name

class Stat(models.Model):
    icon_name = models.CharField(max_length=50)  # e.g., Users, Award, ShieldCheck, BookOpen
    value = models.CharField(max_length=50)  # e.g., 10000+
    label = models.CharField(max_length=100)  # e.g., Students Guided

    def __str__(self):
        return f"{self.label}: {self.value}"

class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONTACTED', 'Contacted'),
        ('ENROLLED', 'Enrolled'),
        ('CLOSED', 'Closed'),
    ]

    student_name = models.CharField(max_length=100)
    parent_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    grade = models.CharField(max_length=50)
    message = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.student_name} (Parent: {self.parent_name}) - {self.status}"

class SiteSetting(models.Model):
    facebook_url = models.URLField(blank=True, null=True, default="https://facebook.com")
    instagram_url = models.URLField(blank=True, null=True, default="https://instagram.com")
    youtube_url = models.URLField(blank=True, null=True, default="https://youtube.com")


    def __str__(self):
        return "Global Site Settings"
