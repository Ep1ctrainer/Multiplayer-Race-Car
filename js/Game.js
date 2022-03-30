class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(700,200);
    car2 = createSprite(800,200);
    car3 = createSprite(1100,200);
    car4 = createSprite(1200,200);
    cars = [car1, car2, car3, car4];

    car1.addImage ("car1", car1img);
    car2.addImage ("car2", car2img);
    car3.addImage ("car3", car3img);
    car4.addImage ("car4", car4img);
    //ground.addImage ("ground", groundimg);
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      //background("#c68767");
      image(track, 0 ,- displayHeight*3.95, displayWidth, displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 250;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 300;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y + 400;

          stroke(10);
          fill("red");
          ellipse(x, y , 60, 60);
        }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 5250){
        gameState = 2;
        player.rank +=1;
        Player.updateCarsAtEnd(player.rank);
    }

    drawSprites();
  }

    end(){
      console.log("Game ended");
      console.log(player.rank);
    }
}