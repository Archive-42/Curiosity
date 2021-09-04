# Crystal Escape

[Crystal Escape](https://bamorgan13.github.io/CrystalEscape/ "Crystal Escape Live Site") is a side-scrolling space shooter reminiscent of Gradius, R-Type, and other shoot-em-ups of the 8- and 16-bit eras.
The player pilots a spaceship, avoiding obstacles and enemies in search of crystals to power up their ship and make their escape back home.
Shooting enemies can reveal powerups to alter the ship's speed or weapon.
Grabbing the crystal in each level moves the player on to the next zone, where their ship will move faster and also be bombarded with even more enemies.

![Crystal Escape Gameplay](documentation/CrystalEscape_screen-grab.png "Crystal Escape Gameplay")

### Functionality
* Players can press the up and down arrow keys to adjust the ship's height in order to avoid obstacles and enemies.
* Pressing the spacebar will fire the ship's weapon.
* Enemies have a chance to drop a random powerup that can affect the player in various ways, such as:
    * Increasing or decreasing the ship speed
    * Increasing the speed of the ship's bullets
    * Firing more bullets with every shot
    * Firing larger bullets
    * etc.
* Enemies can be planted on the ground, firing up at the player's ship, or flying in the air, obstructing the path.
* As crystals are acquired, new enemies will spawn, larger numbers will be present, and the ship will move faster.

### Architecture and Technologies
* Vanilla JavaScript will be used for game logic
* HTML5 Canvas will be used for rendering the game sprites and backgrounds
* CSS will be used for basic styling of the webpage

### MVPs
- [ ] Title screen with instructions
- [x] Ship can move along the vertical axis and fire weapon with player input
- [x] Enemies are created and horizontal positions scroll automatically
- [x] Collision with enemies triggers ship destruction
- [x] Weapon collision with enemies triggers enemy destruction
- [x] Powerups affect game variables (increased speed, bullet size, etc.)
- [x] Collecting crystal triggers new phase with altered variables
- [x] Score is increased continually as player progresses through level. Bonus points awarded for destroying enemies

### Implementation Timeline

##### Day 1:
- [x] Brainstorm game ideas
- [x] Write proposal
- [x] Research visual assets
- [x] Create basic JavaScript skeleton with HTML5 Canvas and CSS files

##### Day 2:
- [x] Render backgrounds and ship on canvas
- [x] Vertical ship movement 
- [x] Bullet creation and movement

##### Day 3:
- [x] Enemy spawning
- [x] Scrolling of background and enemies

##### Day 4:
- [x] Ship collision triggers destruction
- [x] Bullet collision with enemies causes enemy destruction
- [x] Powerups alter game variables

##### Day 5:
- [x] Crystal spawns after score threshold is met
- [x] Collecting crystal triggers next phase with increased game variables
- [x] Score is continually updated and displayed for the player

##### Bonus Goals:
- [ ] Background music and sound effects
- [ ] Player can adjust starting variables to increase or decrease difficulty
- [ ] Connect to Google Firebase for persistent leaderboard
- [ ] Allow two-player co-op
