from app.models import db, Task, Task_Category, time


def seed_tasks():

    taskObjects = [
      Task(user_id=1, created_at=time, name="Make Tea", difficulty=2,
           deadline=time, frequency="Once", status="pending"),
      Task(user_id=1, created_at=time, name="Run 5 Miles", difficulty=4, frequency="Daily", status="complete"),
      Task(user_id=2, created_at=time, name="Pander for Snack", difficulty=1,
           frequency="Daily", status="pending"),
      Task(user_id=3, created_at=time, name="Bike 15 Miles", difficulty=5, frequency="Weekly", status="expired"),
    ]

    task_categoriesObjects = [
      Task_Category(task_id=2, category_id=1),
      Task_Category(task_id=3, category_id=5),
      Task_Category(task_id=4, category_id=6)
    ]

    db.session.bulk_save_objects(taskObjects)
    db.session.bulk_save_objects(task_categoriesObjects)
    db.session.commit()


def undo_tasks():
    db.session.execute('TRUNCATE tasks;')
    db.session.commit()
