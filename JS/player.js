REFRESH_RATE = 10;

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
    // Starting positions
    this.STARTPOSITIONLEFT_X = 50;
    this.STARTPOSITIONLEFT_Y = 234;
    this.STARTPOSITIONRIGHT_X = 490;
    this.STARTPOSITIONRIGHT_Y = 234;
    this.positionLeftX = this.STARTPOSITIONLEFT_X;
    this.positionLeftY = this.STARTPOSITIONLEFT_Y;
    this.positionRightX = this.STARTPOSITIONRIGHT_X;
    this.positionRightY = this.STARTPOSITIONRIGHT_Y;
    this.statusLeft = "idle";
    this.statusRight = "idle";
    this.W = 87;
    this.A = 65;
    this.S = 83;
    this.D = 68;
    this.UP = 38;
    this.DOWN = 40;
    this.LEFT = 37;
    this.RIGHT = 39
    this.PressUP = false;  
    this.PressRIGHT = false;
    // this.PressDOWN = false;
    this.PressLEFT = false;
    this.PressW = false;  
    this.PressA = false;
    // this.PressS = false;
    this.PressD = false;
    this.speed = 3;
    this.leftVelocityX = 0;
    this.leftVelocityY = 0;
    this.jumpForce = 30;
    this.leftJumpTime = 0;
    this.rightJumpTime = 0;
    this.MAXJUMPTIME = 5;
    this.gravity = 10;
    leftInterval = null;
    rightInterval = null;
    /* document.addEventListener("keydown", this.keydownHandler());
    document.addEventListener("keyup", this.keyupHandler()); */
} 

Player.prototype.leftKeydownHandler = function(evt)
{
    if(startGame == true)
    {
        // Cross-browser compatibility
        var key = (evt.which != null) ? evt.which : evt.keyCode;
        console.log("left Handler" + key);
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

Player.prototype.rightKeydownHandler = function(evt)
{
    if(startGame == true)
    {
        // Cross-browser compatibility
        var key = (evt.which != null) ? evt.which : evt.keyCode;
        console.log("Right Handler" + key);
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

Player.prototype.leftKeyupHandler = function(evt)
{
    if(startGame == true)
    {
        // Cross-browser compatibility
        var key = (evt.which != null) ? evt.which : evt.keyCode;
        switch(key)
        {
            case this.W:
                this.PressW = false;
                this.leftJumpTime = 0;
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

Player.prototype.rightKeyupHandler = function(evt)
{
    if(startGame == true)
    {
        // Cross-browser compatibility
        var key = (evt.which != null) ? evt.which : evt.keyCode;
        switch(key)
        {
            case this.UP:
                this.PressUP = false;
                this.rightJumpTime = 0;
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

Player.prototype.moveLeftPlayer = function()
{
    if(startGame == true)
    {
        if(this.PressW == true)
        {
            if(this.leftJumpTime < this.MAXJUMPTIME)
            {
            this.positionLeftY -= this.jumpForce;
            this.leftJumpTime++;
            }
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
            this.positionLeftX -= this.speed;
        }
        if(this.PressD == true)
        {
           this.positionLeftX += this.speed;
        }
        if(this.positionLeftX < 80)
        {
            this.positionLeftX = 80;
        }
        if(this.positionLeftX > 460)
        {
            this.positionLeftX = 460;
        }
        // COLLISIONI TRA GIOCATORI
        /* if(game.rightPlayer.positionRightY - this.positionLeftY < 100)
        { */
            if(game.rightPlayer.positionRightX > this.positionLeftX)
            {
                // Il giocatore di sinistra si sovrappone a sinistra al giocatore di destra
                if(game.rightPlayer.positionRightX - this.positionLeftX < 100)
                {
                    this.positionLeftX = game.rightPlayer.positionRightX - 100;
                }
            }
            else
            {
                // Il giocatore di sinistra si soprappone a destra al giocatore di destra
                if(this.positionLeftX - game.rightPlayer.positionRightX < 100)
                {
                    this.positionLeftX = game.rightPlayer.positionRightX + 100;
                }
            }

        if(this.positionLeftY < this.STARTPOSITIONLEFT_Y)
            this.positionLeftY += this.gravity;
        if(this.positionLeftY > this.STARTPOSITIONLEFT_Y)
            this.positionLeftY = this.STARTPOSITIONLEFT_Y;
        this.playerImage.style.top = this.positionLeftY + "px";
        this.playerImage.style.left = this.positionLeftX + "px"; 
    }
}

Player.prototype.moveRightPlayer = function()
{
    if(startGame == true)
    {
        if(this.PressUP == true)
        {   
            if(this.rightJumpTime < this.MAXJUMPTIME)
            {
            this.positionRightY -= this.jumpForce;
            this.rightJumpTime++;
            }    
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
            this.positionRightX -= this.speed;
        }
        if(this.PressRIGHT == true)
        {
            this.positionRightX += this.speed;
        }
        if(this.positionRightX < 80)
        {
            this.positionRightX = 80;
        }
        if(this.positionRightX > 460)
        {
            this.positionRightX = 460;
        }
                                    // COLLISIONI TRA GIOCATORI
       
        if(this.positionRightX > game.leftPlayer.positionLeftX)
        {
            // Il giocatore di destra si sovrappone a destra al giocatore di sinistra
            if(this.positionRightX - game.leftPlayer.positionLeftX < 100)
            {
                this.positionRightX = game.leftPlayer.positionLeftX + 100;
            }
        }
        else
        {
            // Il giocatore di destra si sovrappone a sinistra al giocatore di sinistra
            if(game.leftPlayer.positionLeftX - this.positionRightX < 100)
            {
                this.positionRightX = game.leftPlayer.positionLeftX - 100;
            }
        }
        if(this.positionRightY < this.STARTPOSITIONRIGHT_Y)
            this.positionRightY += this.gravity;

        if(this.positionRightY > this.STARTPOSITIONRIGHT_Y)
            this.positionRightY = this.STARTPOSITIONRIGHT_Y;

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