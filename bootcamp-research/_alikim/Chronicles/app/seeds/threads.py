from app.models import db, Thread, Choice

def seed_threads():
    """Seed a series of connected threads for Demo Tale."""
    
    # Creating the threads, which will be connected via 'choices' next.
    thread0 = Thread( # 0
        title="The Beginning",
        description="At the beginning, there were two doors. A red door and a blue door.",
        color="rgb(70,60,70)",
        icon="sign",
        image="https://res.cloudinary.com/peerspace-inc/image/upload/q_80,c_crop,g_custom/w_2048/hztukpx3k9m3qbezy0ik.jpg",
        tale_id=1,
        )
        
    thread1 = Thread( # 1
        title="The Red Room",
        description="In the red door, there is a room with a bowl of candy and a vase full of lilies, as well as another red door at the far wall.",
        color="#e05265ff",
        icon="door-closed",
        tale_id=1,
        )
        
    thread2 = Thread( # 2
        title="The Blue Room",
        description="In the blue door, there is a small red key on the table, as well as another blue door at the far wall.",
        color="#5a70ccff",
        icon="door-open",
        tale_id=1,
        )
        
    thread3 = Thread( # 3
        title="The Joined Room",
        description="Looking behind you, you see both a red and blue door. It seems both rooms eventually led to the same destination. In here, you see a glowing fairy angrily throwing a tennis ball at the wall.",
        color="#4f4686ff",
        tale_id=1,
        )
        
    thread4 = Thread( # 4
        title="Take Candy",
        description="You take the candy and pocket it. They look very delicious.",
        color="#964a70ff",
        icon="candy-cane",
        tale_id=1,
        )
        
    thread5 = Thread( # 5
        title="Smell the Lilies",
        description="*sniff sniff* They're quite fragrant. How lovely.",
        color="#f9fbefff",
        icon="seedling",
        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/easter-lily-royalty-free-image-1583439719.jpg",
        tale_id=1,
        )
        
    thread6 = Thread( # 6
        title="Take Key",
        description="You take the little red key and put it in your pocket. This should help you out.",
        color="#e05265ff",
        icon="key",
        tale_id=1,
        )
        
    thread7 = Thread( # 7
        title="Talk to the Sweet Fairy",
        description="The fairy bemoans about how hungry it is, and it really wants something sweet to eat.",
        color="#57768aff",
        icon="comment",
        tale_id=1,
        )
        
    thread8 = Thread( # 8
        title="Give Candy",
        description="The sweet fairy is very happy, and thanks you with a smile.",
        color="#e05265ff",
        icon="candy-cane",
        tale_id=1,
        )
        
    thread9 = Thread( # 9
        title="Lecture Sweet Fairy About a Healthy Diet",
        description="You give the little fairy a stern talking-to about eating its vegetables to grow up healthy and strong. It seems very unhappy with you, and lapses into silence, throwing its ball with even more gusto.",
        color="#8cb15eff",
        icon="carrot",
        tale_id=1,
        )
        
    thread10 = Thread(
        title="Look around",
        description="You look around. Nice.",
        color="rgb(70,60,70)",
        icon="eye",
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHWvp2ZW7nv-Kor5411yZ45_iLhmDKphgrTw&usqp=CAU",
        tale_id=1,
        is_sequitur=False,
        )
    # thread10 = Thread(
    #     tale_id=1,
    #     title="",
    #     description="")
    
    db.session.add(thread0)
    db.session.add(thread1)
    db.session.add(thread2)
    db.session.add(thread3)
    db.session.add(thread4)
    db.session.add(thread5)
    db.session.add(thread6)
    db.session.add(thread7)
    db.session.add(thread8)
    db.session.add(thread9)
    db.session.add(thread10)
    db.session.commit()

    threads = [thread0, thread1, thread2, thread3, thread4, thread5, thread6, thread7, thread8, thread9, thread10]
    # Adding choice-links between threads with choice-thread default titles.
    choices = (
      (0, 1), (0, 2),
      (1, 4), (1, 5),
      (2, 6),
      (3, 7),
      (7, 8), (7, 9))
    for choice in choices:
        new_choice = Choice(
            title=threads[choice[1]].title,
            prev_thread=threads[choice[0]],
            next_thread=threads[choice[1]])
        db.session.add(new_choice)


    # Adding choices with unique titles
    new_choice5 = Choice(
    title="Go through second red door",
    prev_thread=threads[1],
    next_thread=threads[3])
    
    new_choice6 = Choice(
    title="Go through second blue door",
    prev_thread=threads[2],
    next_thread=threads[3])
    
    db.session.add(new_choice5)
    db.session.add(new_choice6)
    db.session.commit()


def undo_threads():
    db.session.execute('TRUNCATE threads RESTART IDENTITY CASCADE;')
    db.session.commit()