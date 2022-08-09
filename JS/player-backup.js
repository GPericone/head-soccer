function Player()
{
    this.pitch = null;

    this.name = null;
    this.playerLeft = false;
    this.playerRight = false;
    this.playerImage = null;
    this.WIDTH = 100;
    this.HEIGHT = 100;
    this.HALFWIDTH = 50;
    this.HALFHEIGHT = 50;
    this.MAXJUMPTIME = 3;

    // LEFT PLAYER
    this.STARTPOSITIONLEFT_X = 50;
    this.STARTPOSITIONLEFT_Y = 234;
    this.positionLeftX = this.STARTPOSITIONLEFT_X;
    this.positionLeftY = this.STARTPOSITIONLEFT_Y;
    this.leftVelocityX = 0;
    this.leftVelocityY = 0;
    this.leftAccelerationX = 0;
    this.leftAccelerationY = 0;
    this.statusLeft = "idle";
    this.W = 87;
    this.A = 65;
    this.D = 68;
    this.PressW = false;  
    this.PressA = false;
    this.PressD = false;
    leftInterval = null;
    this.isOnGroundLeft = true;



    // RIGHT PLAYER
    this.STARTPOSITIONRIGHT_X = 490;
    this.STARTPOSITIONRIGHT_Y = 234;
    this.positionRightX = this.STARTPOSITIONRIGHT_X;
    this.positionRightY = this.STARTPOSITIONRIGHT_Y;
    this.rightVelocityX = 0;
    this.rightVelocityY = 0;
    this.rightAccelerationX = 0;
    this.rightAccelerationY = 0;
    this.statusRight = "idle";
    this.UP = 38;
    this.LEFT = 37;
    this.RIGHT = 39;
    this.PressUP = false;  
    this.PressRIGHT = false;
    this.PressLEFT = false;
    rightInterval = null;
    this.isOnGroundRight = true;


    // PHYSICS
    this.speedLimit = 3;
    this.jumpForce = -8;
    this.gravityLeft = 0.3;
    this.gravityRight = 0.3;
    this.frictionLeft = 0.75;
    this.frictionRight = 0.75;
} 

// HANDLER TASTIERA GIOCATORE 1 

// Handler pressione tasto Giocatore1
Player.prototype.leftKeydownHandler = function(evt)
{
    if(startGame == true)
    {
        var key = (evt.which != null) ? evt.which : evt.keyCode;
        switch(key)
        {
            case this.W:            
                this.PressW = true;
                break;
            case this.A:
                 this.PressA = true;
                break;
            case this.D:
                this.PressD = true;
                break;
            default:
                break;
        }
    }
}

// Handler rilascio tasto Giocatore1
Player.prototype.leftKeyupHandler = function(evt)
{
    if(startGame == true)
    {
        var key = (evt.which != null) ? evt.which : evt.keyCode;
        switch(key)
        {
            case this.W:
                this.PressW = false; 
                break;
            case this.A:
                 this.PressA = false;
                break;
            case this.D:
                this.PressD = false;
                break;
            default:
                break;
        }
    }
}

// HANDLER TASTIERA GIOCATORE 2

// Handler pressione tasto Giocatore2
Player.prototype.rightKeydownHandler = function(evt)
{
    if(startGame == true)
    {
        var key = (evt.which != null) ? evt.which : evt.keyCode;
        switch(key)
        {
            case this.UP:
                this.PressUP = true;
                 break;               
            case this.LEFT:
                this.PressLEFT = true;
                break;
            case this.RIGHT:
                this.PressRIGHT = true;
                break;
            default:
                break;
        }
    }
}

// Handler rilascio tasto Giocatore2
Player.prototype.rightKeyupHandler = function(evt)
{
    if(startGame == true)
    {
        var key = (evt.which != null) ? evt.which : evt.keyCode;
        switch(key)
        {
            case this.UP:
                this.PressUP = false;
                 break;
            case this.LEFT:
                this.PressLEFT = false;
                break;
            case this.RIGHT:
                this.PressRIGHT = false;
                break;
            default:
                break;
        }
    }
}

// Funzione che gestisce il movimento del Giocatore1
Player.prototype.moveLeftPlayer = function()
{
    if(startGame == true)
    {
        if((this.PressW === true) && (this.isOnGroundLeft === true))
        {
            this.leftVelocityY += this.jumpForce;
            this.isOnGroundLeft = false;
            this.frictionLeft = 1;
            this.gravityLeft = 0;
            switch(this.name)
            {
                case "TheBoy":
                    this.playerImage.setAttribute("src", "../css/img/players/boy-jump.png");
                    break;
                case "Dino":
                    this.playerImage.setAttribute("src", "../css/img/players/dino-jump.png");
                    break;
                case "Santa":
                    this.playerImage.setAttribute("src", "../css/img/players/santa-jump.png");
                    break;
                case "Zom":
                    this.playerImage.setAttribute("src", "../css/img/players/zom-jump.png");
                    break;
                default:
                    break;
            }
            setTimeout(function()
            {
                switch(game.leftPlayer.name)
                {
                    case "TheBoy":
                        game.leftPlayer.playerImage.setAttribute("src", "../css/img/players/boy-idle.png");
                        break;
                    case "Dino":
                        game.leftPlayer.playerImage.setAttribute("src", "../css/img/players/dino-idle.png");
                        break;
                    case "Santa":
                        game.leftPlayer.playerImage.setAttribute("src", "../css/img/players/santa-idle.png");
                        break;
                    case "Zom":
                        game.leftPlayer.playerImage.setAttribute("src", "../css/img/players/zom-idle.png");
                        break;
                    default:
                        break;
                }
            },300);
        }
        if(this.PressA == true)
        {
            this.leftAccelerationX = -0.2;
            this.frictionLeft = 1;
        }
        if(this.PressD == true)
        {
           this.leftAccelerationX = 0.2;
           this.frictionLeft = 1;
        }

        if(this.PressW === false || this.isOnGroundLeft === false)
        {
            this.leftAccelerationY = 0;
            this.gravityLeft = 0.3;
        }

        if(this.PressA == false && this.PressD == false)
        {
            this.leftAccelerationX = 0;
        }

        if(this.PressW == false && this.PressA == false && this.PressD == false)
        {
            this.frictionLeft = 0.75;
        }

        this.leftVelocityX += this.leftAccelerationX;
        this.leftVelocityY += this.leftAccelerationY;
        if(this.isOnGroundLeft == true)
        {
            this.leftVelocityX *= this.frictionLeft;
        }
        this.leftVelocityY += this.gravityLeft;

        if(this.leftVelocityX > this.speedLimit)
        {
            this.leftVelocityX = this.speedLimit;
        }

        if(this.leftVelocityX < -this.speedLimit)
        {
            this.leftVelocityX = -this.speedLimit;
        }

        if(this.leftVelocityY > this.speedLimit * 2)
        {
            this.leftVelocityY = this.speedLimit * 2;
        }

        this.positionLeftX += this.leftVelocityX;
        this.positionLeftY += this.leftVelocityY;

        // COLLISIONI CON BORDI 

        if(this.positionLeftX < 80)
        {
            this.positionLeftX = 80;
        }
        if(this.positionLeftX > 460)
        {
            this.positionLeftX = 460;
        }

        // COLLISIONI TRA GIOCATORI
        
        // Il giocatore 2 è a destra del giocatore 1
        if(game.rightPlayer.positionRightX > this.positionLeftX)
        {
            // Il giocatore 1 si sovrappone a sinistra al giocatore 2
            if(game.rightPlayer.positionRightX - this.positionLeftX < 100)
            {
                this.positionLeftX = game.rightPlayer.positionRightX - 100;
            }
        }
        // Il giocatore 1 è a destra del giocatore 2
        else
        {
            // Il giocatore 1 si soprappone a destra al giocatore 2
            if(this.positionLeftX - game.rightPlayer.positionRightX < 100)
            {
                this.positionLeftX = game.rightPlayer.positionRightX + 100;
            }
        }
        
        if(this.positionLeftY > this.STARTPOSITIONLEFT_Y)
        {
            this.positionLeftY = this.STARTPOSITIONLEFT_Y;
            this.isOnGroundLeft = true;
            this.leftVelocityY = -this.gravityLeft;
        }
        this.playerImage.style.top = this.positionLeftY + "px";
        this.playerImage.style.left = this.positionLeftX + "px"; 
    }
}

Player.prototype.moveRightPlayer = function()
{
    if(startGame == true)
    {
        if((this.PressUP === true) && (this.isOnGroundRight === true))
        {   
            this.rightVelocityY += this.jumpForce;
            this.isOnGroundRight = false;
            this.frictionRight = 1;
            this.gravityRight = 0;
            switch(this.name)
            {
                case "TheBoy":
                    this.playerImage.setAttribute("src", "../css/img/players/boy-jump.png");
                    break;
                case "Dino":
                    this.playerImage.setAttribute("src", "../css/img/players/dino-jump.png");
                    break;
                case "Santa":
                    this.playerImage.setAttribute("src", "../css/img/players/santa-jump.png");
                    break;
                case "Zom":
                    this.playerImage.setAttribute("src", "../css/img/players/zom-jump.png");
                    break;
                default:
                    break;
            }
            setTimeout(function()
            {
                switch(game.rightPlayer.name)
                {
                    case "TheBoy":
                        game.rightPlayer.playerImage.setAttribute("src", "../css/img/players/boy-idle.png");
                        break;
                    case "Dino":
                        game.rightPlayer.playerImage.setAttribute("src", "../css/img/players/dino-idle.png");
                        break;
                    case "Santa":
                        game.rightPlayer.playerImage.setAttribute("src", "../css/img/players/santa-idle.png");
                        break;
                    case "Zom":
                        game.rightPlayer.playerImage.setAttribute("src", "../css/img/players/zom-idle.png");
                        break;
                    default:
                        break;
                }
            },300);     
        }
        if(this.PressLEFT == true)
        {
            this.rightAccelerationX = -0.2;
            this.frictionRight = 1;
        }
        if(this.PressRIGHT == true)
        {
            this.rightAccelerationX = 0.2;
            this.frictionRight = 1;
        }

        if(this.PressUP === false || this.isOnGroundRight === false)
        {
            this.rightAccelerationY = 0;
            this.gravityRight = 0.3;
        }

        if(this.PressLEFT == false && this.PressRIGHT == false)
        {
            this.rightAccelerationX = 0;
        }

        if(this.PressUP == false && this.PressLEFT == false && this.PressRIGHT == false)
        {
            this.frictionRight = 0.75;
        }

        this.rightVelocityX += this.rightAccelerationX;
        this.rightVelocityY += this.rightAccelerationY;
        if(this.isOnGroundRight == true)
        {
            this.rightVelocityX *= this.frictionRight;
        }
        this.rightVelocityY += this.gravityRight;

        if(this.rightVelocityX > this.speedLimit)
        {
            this.rightVelocityX = this.speedLimit;
        }

        if(this.rightVelocityX < -this.speedLimit)
        {
            this.rightVelocityX = -this.speedLimit;
        }

        if(this.rightVelocityY > this.speedLimit * 2)
        {
            this.rightVelocityY = this.speedLimit * 2;
        }

        this.positionRightX += this.rightVelocityX;
        this.positionRightY += this.rightVelocityY;

        // COLLISIONI CON BORDI

        if(this.positionRightX < 80)
        {
            this.positionRightX = 80;
        }
        if(this.positionRightX > 460)
        {
            this.positionRightX = 460;
        }

        // COLLISIONI TRA GIOCATORI
       
        // Il giocatore 2 è a destra del giocatore 1
        if(this.positionRightX > game.leftPlayer.positionLeftX)
        {
            // Il giocatore 2 si sovrappone a destra al giocatore 1
            if(this.positionRightX - game.leftPlayer.positionLeftX < 100)
            {
                this.positionRightX = game.leftPlayer.positionLeftX + 100;
            }
        }
        // Il giocatore 1 è a destra del giocatore 2
        else
        {
            // Il giocatore 2 si sovrappone a sinistra al giocatore 1
            if(game.leftPlayer.positionLeftX - this.positionRightX < 100)
            {
                this.positionRightX = game.leftPlayer.positionLeftX - 100;
            }
        }

        if(this.positionRightY > this.STARTPOSITIONRIGHT_Y)
        {
            this.positionRightY = this.STARTPOSITIONRIGHT_Y;
            this.isOnGroundRight = true;
            this.rightVelocityY = -this.gravityRight;
        }

        this.playerImage.style.top = this.positionRightY + "px";
        this.playerImage.style.left = this.positionRightX + "px";
    }
}

Player.prototype.createPlayer = function(Pitch, playerName, side)
{
    this.pitch = Pitch;
    this.name = playerName;
    this.playerImage = document.createElement("img");
    this.playerImage.setAttribute("class", "playerImage");
    switch(this.name)
    {
        case "TheBoy":
            this.playerImage.setAttribute("src", "../css/img/players/boy-idle.png");
            break;
        case "Dino":
            this.playerImage.setAttribute("src", "../css/img/players/dino-idle.png");
            break;
        case "Santa":
            this.playerImage.setAttribute("src", "../css/img/players/santa-idle.png");
            break;
        case "Zom":
            this.playerImage.setAttribute("src", "../css/img/players/zom-idle.png");
            break;
        default:
            break;
    }

    this.pitch.gameBox.appendChild(this.playerImage);

    if(side == "left")
    {
        this.playerLeft = true;
        this.playerImage.id = "leftPlayerImage";
        this.playerImage.style.left = this.STARTPOSITIONLEFT_X + "px";
        this.playerImage.style.top = this.STARTPOSITIONLEFT_Y + "px";
        document.addEventListener("keydown", this.leftKeydownHandler.bind(this));
        document.addEventListener("keyup", this.leftKeyupHandler.bind(this));
        this.leftInterval = setInterval(this.moveLeftPlayer.bind(this),REFRESH_RATE);
    }
    else if(side == "right")
   {
       this.playerRight = true;
       this.playerImage.id = "rightPlayerImage";
       this.playerImage.style.transform = "scaleX(-1)";
       this.playerImage.style.left = this.STARTPOSITIONRIGHT_X + "px";
       this.playerImage.style.top = this.STARTPOSITIONRIGHT_Y + "px";
       document.addEventListener("keydown", this.rightKeydownHandler.bind(this));
       document.addEventListener("keyup", this.rightKeyupHandler.bind(this));
       this.rightInterval = setInterval(this.moveRightPlayer.bind(this),REFRESH_RATE);
   } 
}


// Handlers

Player.prototype.centerLeftX = function()
{
    return (this.positionLeftX + this.WIDTH/2);
}

Player.prototype.centerLeftY = function()
{
    return (this.positionLeftY + this.HEIGHT/2);
}

Player.prototype.centerRightX = function()
{
    return (this.positionRightX + this.WIDTH/2);
}

Player.prototype.centerRightY = function()
{
    return (this.positionRightY + this.HEIGHT/2);
}