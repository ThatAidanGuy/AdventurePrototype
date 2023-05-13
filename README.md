A simple adventure game by Aidan Andreasen based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **7 scenes based on `AdventureScene`**: Entrance, LivingRoom, Kitchen, Bedroom, Bathroom, Hallway, Exit.
- **2 scenes *not* based on `AdventureScene`**: Intro, Ending.
- **2 methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: Added a method to make objects appear when other objects are clicked: setAlpha().
    - Enhancement 2: Many tweaks to numbers, string contents, transition lengths, etc. to customize this engine to the needs of this game, as well as a couple more formal additions that didn't quite work in time to submit and were thus cut (global variables and removing old inventory text).

Experience requirements:
- **6/7 locations in the game world**: Each of the seven scenes based on AdventureScene corresponds to a room in a house, with the arguable exception of Exit.
- **2+ interactive objects in most scenes**: Every adventure scene has at least two doors the player can use to move between scenes. There are also usually several items the player can click on to remove from the game world, be that contextualized as them taking an item, rescuing a person, or disposing of a hazard.
- **Many objects have `pointerover` messages**: All objects which can be clicked on (immediately or eventually) display a pointerover message identifying themselves.
- **Many objects have `pointerdown` effects**: On the flip side, every item the player can see the name of via pointerover can be clicked on, and usually that item can be removed from the game world accompanied by an effect – or if it cannot be removed yet, then the player will usually receive a message giving them a hint as to what must be done.
- **Some objects are themselves animated**: The Intro and Ending scenes display various animations via tweens, and many objects with pointerdown effects have animations that go beyond the bare minimum for pointerdowns – even if it is usually a fade out.

Asset sources:
- The vast majority of assets are vector art made by me in Keynote. I don't think it's worth going into each individual one because they're all the same story: I made a bunch of shapes and lines, filled the shapes with colors, and placed them on top of each other as appropriate to make a drawing. I then took a screenshot of the drawing and used Lunapic to make the background transparent. I saved that png from Lunapic and put it in my assets folder here, rinse and repeat about 30 times.
- The Paw Patrol image comes from [this New York Times article](https://www.nytimes.com/2020/06/10/arts/television/protests-fictional-cops.html).
- The ending is from the infamous NES *Ghostbusters* game, originally designed by Activision in 1984 and ported to the NES by Bits Laboratory in 1986. I thought it would be funny for anyone who gets the reference – that's about as good as an ending as anything considering how small-scale and mundane this project is, right?


Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.