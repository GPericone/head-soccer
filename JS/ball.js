RANDOM_FACTOR = 3;
FIELDPOSITION_Y = 304;

function Ball(Pitch)
{
    this.div = null;
    this.WIDTH = 30;
    this.HEIGHT = 30;
    this.HALFWIDTH = 15;
    this.HALFHEIGHT = 15;
    this.pitch = Pitch;
    this.STARTINGPOSITION_X = 305;
    this.STARTINGPOSITION_Y = 105;
    this.positionX = this.STARTINGPOSITION_X;
    this.positionY = this.STARTINGPOSITION_Y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.SPEEDLIMIT = 5;
    this.friction = 0.95;
    this.gravity = 0.3;
    this.bounce = -0.75;
    this.isOnGround = false;
    this.ballInterval = null;
}

Ball.prototype.createBall = function()
{
    this.div = document.createElement("img");
    this.div.id = "ball";
    this.div.setAttribute("src", "../css/img/ball.png")
    this.pitch.gameBox.appendChild(this.div);
    this.div.style.left = this.STARTINGPOSITION_X + "px";
    this.div.style.top = this.STARTINGPOSITION_Y + "px";
    this.ballInterval = setInterval(this.moveBall.bind(this),REFRESH_RATE);
    this.goalInterval = setInterval(this.isGoal.bind(this), REFRESH_RATE);
}

Ball.prototype.moveBall = function()
{
    if(startGame == true)
    {
        // Rimbalzo contro bordi
        // Bordo sinistro
        if(this.positionX < 80)
        {
            this.velocityX *= this.bounce;
            this.positionX = 80;
        }
        // Bordo superiore
        if(this.positionY < 0)
        {
            this.velocityY *= this.bounce;
            this.positionY = 0;
        }
        // Bordo destro
        if((this.positionX + this.WIDTH) > 560)
        {
            this.velocityX *= this.bounce;
            this.positionY = 560;
        }
        // Bordo inferiore
        if(this.positionY > FIELDPOSITION_Y)
        {
            this.velocityY *= this.bounce;
            this.positionY = FIELDPOSITION_Y;
        }
        // La palla rimbalza sul giocatore di sinistra
        if(Math.sqrt( (Math.pow((this.centerX() - game.leftPlayer.centerLeftX()), 2))
            + Math.pow(this.centerY() - game.leftPlayer.centerLeftY(), 2)) < 65)
        {
            if(this.centerX() > game.leftPlayer.centerLeftX())
            {
                this.velocityX *= this.bounce;
                this.velocityY *= this.bounce;
                this.accelerationX += game.leftPlayer.speed;
                this.velocityX += Math.random()*5;
                this.velocityY -= Math.random()*5;
            }
            else
            {
                this.velocityX *= this.bounce;
                this.velocityY *= this.bounce;
                this.accelerationX -= game.leftPlayer.speed;
                this.velocityX -= Math.random()*5;
                this.velocityY -= Math.random()*5;
            }
        }

        if(Math.sqrt( (Math.pow((this.centerX() - game.rightPlayer.centerRightX()), 2))
        + Math.pow(this.centerY() - game.rightPlayer.centerRightY(), 2)) < 65)
        {
            if(this.centerX() < game.rightPlayer.centerRightX())
            {
                this.velocityX *= this.bounce;
                this.velocityY *= this.bounce;
                this.accelerationX -= game.rightPlayer.speed;
                this.velocityX -= Math.random()* RANDOM_FACTOR;
                this.velocityY -= Math.random()* RANDOM_FACTOR;
            }
            else
            {
                this.velocityX *= this.bounce;
                this.velocityY *= this.bounce;
                this.accelerationX += game.rightPlayer.speed;
                this.velocityX += Math.random()* RANDOM_FACTOR;
                this.velocityY -= Math.random()* RANDOM_FACTOR;
            }
        }


        this.velocityX += this.accelerationX;
        this.velocityY += this.accelerationY + this.gravity;

        if(this.velocityX > this.SPEEDLIMIT)
            this.velocityX = this.SPEEDLIMIT;

        if(this.velocityY > this.SPEEDLIMIT)
            this.velocityY = this.SPEEDLIMIT;

        if(this.positionY == FIELDPOSITION_Y && this.velocityX != 0)
            this.velocityX *= this.friction;

        this.positionX += this.velocityX;
        this.positionY += this.velocityY;


        this.div.style.left = this.positionX + "px";
        this.div.style.top = this.positionY + "px";
    }
}

Ball.prototype.isGoal = function()
{
    if(startGame == true)
    {
        if(this.positionX < 80 && this.positionY > 180)
        {
            game.rightScore++;
            rightGoalText = document.createElement("img");
            rightGoalText.id = "rightGoalText";
            rightGoalText.setAttribute("src", "../css/img/goalRight.png");
            this.pitch.gameBox.appendChild(rightGoalText);
            this.positionX = this.STARTINGPOSITION_X;
            this.positionY = this.STARTINGPOSITION_Y;
            this.velocityX = 0;
            this.velocityY = 0;
            this.accelerationX = 0;
            this.accelerationY = 0;
            game.leftPlayer.positionLeftX = game.leftPlayer.STARTPOSITIONLEFT_X;
            game.rightPlayer.positionRightX = game.leftPlayer.STARTPOSITIONRIGHT_X;
            goalTimeout = setTimeout(function()
            {
                rightGoalText.remove();
            },1000);

        }
        if(this.positionX > 560 && this.positionY> 180)
        {
            game.leftScore++;
            leftGoalText = document.createElement("img");
            leftGoalText.id = "leftGoalText";
            leftGoalText.setAttribute("src", "../css/img/goalLeft.png");
            this.pitch.gameBox.appendChild(leftGoalText);
            this.positionX = this.STARTINGPOSITION_X;
            this.positionY = this.STARTINGPOSITION_Y;
            this.velocityX = 0;
            this.velocityY = 0;
            this.accelerationX = 0;
            this.accelerationY = 0;
            game.leftPlayer.positionLeftX = game.leftPlayer.STARTPOSITIONLEFT_X;
            game.rightPlayer.positionRightX = game.leftPlayer.STARTPOSITIONRIGHT_X;
            goalTimeout = setTimeout(function()
            {
                leftGoalText.remove();
            },1000);
        }
    }
}

// Handlers

Ball.prototype.centerX = function()
{
    return this.positionX + (this.WIDTH / 2);
}

Ball.prototype.centerY = function()
{
    return this.positionY + (this.HEIGHT / 2);
}


