import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ieducare_backend.settings')
django.setup()

from api.models import Topper, Course, Subject, Branch, Stat
from django.contrib.auth.models import User

def seed_database():
    print("Seeding database...")

    # 1. Create Superuser if not exists
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("Created superuser 'admin' with password 'admin123'")
    else:
        print("Superuser 'admin' already exists")

    # 2. Seed Stats
    Stat.objects.all().delete()
    stats_data = [
        {"icon_name": "Users", "value": "10000+", "label": "Students Guided"},
        {"icon_name": "Award", "value": "20+", "label": "Years Experience"},
        {"icon_name": "ShieldCheck", "value": "100%", "label": "Personal Attention"},
        {"icon_name": "BookOpen", "value": "20", "label": "Max Students Per Batch"}
    ]
    for stat in stats_data:
        Stat.objects.create(**stat)
    print(f"Seeded {len(stats_data)} stats.")

    # 3. Seed Branches
    Branch.objects.all().delete()
    branches_data = [
        {
            "name": "Chembur",
            "address": "101 Jolitha Complex, Near Ratna store, opposite Shiv Mandir, Ghatla village marg, Chembur, Mumbai- 400071",
            "phone": "+91 98198 28574",
            "hours": "Mon–Sun : 1:00 PM – 8:30 PM",
            "image_url": "/src/assets/chembur-campus.jpg"
        },
        {
            "name": "Matunga",
            "address": "2nd floor 36, Vorabhavan Plot No. 467-A, Dr. Ambedkar road, above Bank Of Baroda, Mumbai- 400019",
            "phone": "+91 91526 12535",
            "hours": "Mon–Sun : 1:00 PM – 8:30 PM",
            "image_url": "/src/assets/matunga-campus.jpg"
        }
    ]
    for branch in branches_data:
        Branch.objects.create(**branch)
    print(f"Seeded {len(branches_data)} branches.")

    # 4. Seed Courses & Subjects
    Course.objects.all().delete()
    Subject.objects.all().delete()

    icse_course = Course.objects.create(
        badge="FULL YEAR",
        grade="7 – 10",
        title="ICSE Foundation",
        description="Complete year long ICSE preparation across all core subjects, mapped to the CISCE syllabus."
    )

    igcse_course = Course.objects.create(
        badge="FULL YEAR",
        grade="7 – 10",
        title="IGCSE Foundation",
        description="Complete year long IGCSE preparation across all core subjects, mapped to the CAIE international syllabus."
    )

    subjects_data = [
        {"name": "Mathematics", "desc": "From arithmetic fluency to board-level geometry and algebra precision, always."},
        {"name": "Science", "desc": "Physics, Chemistry and Biology taught by subject specialists."},
        {"name": "English", "desc": "Comprehension, composition, literature and grammar taught the right way."},
        {"name": "Hindi", "desc": "Building confidence in reading, writing, and meaningful communication."},
        {"name": "History", "desc": "A narrative approach to history dates become stories, movements become meaning."},
        {"name": "Geography", "desc": "Map skills, physical geography and human geography visualised, not memorised."},
        {"name": "Economics", "desc": "Core concepts of markets, money and decision-making explained through real-world thinking."}
    ]

    for subj in subjects_data:
        # Create subject under both ICSE and IGCSE since they are core classes
        Subject.objects.create(course=icse_course, name=subj["name"], description=subj["desc"])
        Subject.objects.create(course=igcse_course, name=subj["name"], description=subj["desc"])
    
    print("Seeded courses and subjects.")

    # 5. Seed Toppers
    Topper.objects.all().delete()
    toppers_data = [
        # Aggregate Science Toppers
        {"name": "Sanjay Chapparwal", "school": "AVM", "score": "99.8", "subject": "Chemistry", "category": "SCIENCE", "is_perfect": False},
        {"name": "Maanvir Bamboli", "school": "SJU", "score": "98.4", "subject": "Chemistry", "category": "SCIENCE", "is_perfect": False},
        {"name": "Vansh Nevatia", "school": "AVM", "score": "98.4", "subject": "Chemistry", "category": "SCIENCE", "is_perfect": False},
        {"name": "Vatsal Shah", "school": "SJU", "score": "98.2", "subject": "Chemistry", "category": "SCIENCE", "is_perfect": False},
        
        # Hindi Toppers
        {"name": "Diya Kapasi", "school": "St. Gregorios High School", "score": "99", "subject": "Hindi", "category": "HINDI", "is_perfect": False},
        {"name": "Aritro Biswas", "school": "The Green Acres Academy", "score": "99", "subject": "Hindi", "category": "HINDI", "is_perfect": False},
        {"name": "Aarya Mayekar", "school": "J.B. Vachha High School", "score": "98", "subject": "Hindi", "category": "HINDI", "is_perfect": False},
        {"name": "Khushi Didwania", "school": "St. Gregorios High School", "score": "98", "subject": "Hindi", "category": "HINDI", "is_perfect": False},

        # History & Geography Toppers
        {"name": "Aariz Bangi", "school": "Ryan International", "score": "100", "subject": "History", "category": "HISTORY_GEOGRAPHY", "is_perfect": True},
        {"name": "Suvir Bakshi", "school": "Avalon", "score": "100", "subject": "History", "category": "HISTORY_GEOGRAPHY", "is_perfect": True},
        {"name": "Mehak Khosla", "school": "B. Scottish", "score": "95", "subject": "Geography", "category": "HISTORY_GEOGRAPHY", "is_perfect": False},
        {"name": "Sarah Khan", "school": "B. Scottish", "score": "94", "subject": "Geography", "category": "HISTORY_GEOGRAPHY", "is_perfect": False},

        # Literature & Language Toppers
        {"name": "Rukaan Chotrani", "school": "Ryan International", "score": "99", "subject": "Literature", "category": "LITERATURE_LANGUAGE", "is_perfect": False},
        {"name": "Rajvi Shah", "school": "Gold Crest", "score": "97", "subject": "Literature", "category": "LITERATURE_LANGUAGE", "is_perfect": False},
        {"name": "Risa Panekar", "school": "St. Gregorios High School", "score": "98", "subject": "Language", "category": "LITERATURE_LANGUAGE", "is_perfect": False},
        {"name": "Trishan Sharma", "school": "St. Gregorios High School", "score": "98", "subject": "Language", "category": "LITERATURE_LANGUAGE", "is_perfect": False}
    ]
    for topper in toppers_data:
        Topper.objects.create(**topper)
    print(f"Seeded {len(toppers_data)} toppers.")
    print("Database seeding completed successfully.")

if __name__ == '__main__':
    seed_database()
