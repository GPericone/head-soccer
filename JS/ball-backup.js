function Ball(Pitch)
{
    this.div = null;
    this.pitch = Pitch;

    this.WIDTH = 30;
    this.HEIGHT = 30;
    this.HALFWIDTH = 15;
    this.HALFHEIGHT = 15;

    this.STARTINGPOSITION_X = 305;
    this.STARTINGPOSITION_Y = 105;
    this.positionX = this.STARTINGPOSITION_X;
    this.positionY = this.STARTINGPOSITION_Y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.speedlimit = 3;
    this.friction = 0.75;
    this.gravity = 0.3;
    this.bounce = -0.75;
    this.isOnGround = false;
    this.ballInterval = null;
}


// Creazione del pallone e posizionamento iniziale
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

// Funzione che gestisce il movimento del pallone
Ball.prototype.moveBall = function()
{
    if(startGame == true)
    {
        this.velocityX += this.accelerationX;
        this.velocityY += this.accelerationY;
        if(this.isOnGround === true)
        {
            this.velocityX *=this.friction;
        }
        this.velocityY += this.gravity;

        if(this.velocityX > this.speedlimit)
        {
            this.velocityX = this.speedlimit;
        }

        if(this.velocityX < - this.speedlimit)
        {
            this.velocityX = - this.speedlimit;
        }

        if(this.velocityY > this.speedlimit * 2)
        {
            this.velocityY = this.speedlimit * 2;
        }

        if(this.velocityY < -this.speedlimit)
        {
            this.velocityY = -this.speedlimit;
        }

        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        // COLLISIONI CON BORDI
        // Bordo sinistro
        if((this.positionY > 180) && (this.positionX < 80 || this.positionX>560))
        {
            this.isGoal();
        }
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
                this.accelerationX = 2;
                //this.accelerationY += game.leftPlayer.leftVelocityY;
                this.accelerationyX += Math.random();
                this.accelerationY -= Math.random()*3;
            }
            else
            {
                this.velocityX *= this.bounce;
                this.velocityY *= this.bounce;
                this.accelerationX = -2;
                //this.accelerationY += game.leftPlayer.leftVelocityY;
                this.accelerationX -= Math.random();
                this.accelerationY -= Math.random()*3;
            }
        }

        if(Math.sqrt( (Math.pow((this.centerX() - game.rightPlayer.centerRightX()), 2))
        + Math.pow(this.centerY() - game.rightPlayer.centerRightY(), 2)) < 65)
        {
            if(this.centerX() < game.rightPlayer.centerRightX())
            {
                this.velocityX *= this.bounce;
                this.velocityY *= this.bounce;
                this.accelerationX = -2;
                //this.accelerationY += game.rightPlayer.rightVelocityY;
                this.accelerationX -= Math.random();
                this.accelerationY -= Math.random()*3;
            }
            else
            {
                this.velocityX *= this.bounce;
                this.velocityY *= this.bounce;
                this.accelerationX = 2;
                //this.accelerationY += game.rightPlayer.rightVelocityY;
                this.accelerationX += Math.random();
                this.accelerationY -= Math.random()*3;
            }
        }

        if(this.positionY + this.HEIGHT > FIELDPOSITION_Y)
        {
            this.positionY = FIELDPOSITION_Y;
            this.isOnGround = true;
            this.velocityY = -this.gravity;

        }

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


