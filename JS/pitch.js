function Pitch()
{
    this.gameBox = document.createElement("div");
    this.width = 640;
    this.height = 360;
    this.ball = null;
    this.leftSoccerGoal = null;
    this.rightSoccerGoal = null;
    this.leftPlayer = null;
    this.rightPlayer = null;
    this.cloudsTimer = null;
    this.cloudPosition = 0;
}

Pitch.prototype.createPitch = function()
{
    main = document.getElementById("main");
    this.gameBox.id = "pitchDiv";
    main.appendChild(this.gameBox);
    this.createClouds();
    this.startClouds();
    this.createLeftSoccerGoal();
    this.createRightSoccerGoal();
}

Pitch.prototype.createClouds = function()
{
    clouds = document.createElement("img");
    clouds.id = "clouds";
    clouds.setAttribute("src", "../css/img/clouds.png");    
    this.gameBox.appendChild(clouds);
}

Pitch.prototype.startClouds = function()
{
    this.cloudsTimer = setInterval(this.moveClouds.bind(this),200);
}

Pitch.prototype.moveClouds = function()
{
    clouds = document.getElementById("clouds");
    if(this.cloudPosition == 600)
    {
        clouds.style.left = "0px";
        this.cloudPosition = 0;
    }
    else
    {
        this.cloudPosition += 0.1;
        clouds.style.left = this.cloudPosition + "px";
    }
}

Pitch.prototype.createLeftSoccerGoal = function()
{
    leftSoccerGoal = document.createElement("img");
    leftSoccerGoal.id = "leftSoccerGoal";
    leftSoccerGoal.setAttribute("src", "../css/img/leftSoccerGoal.png");    
    this.gameBox.appendChild(leftSoccerGoal);
}

Pitch.prototype.createRightSoccerGoal = function()
{
    rightSoccerGoal = document.createElement("img");
    rightSoccerGoal.id = "rightSoccerGoal";
    rightSoccerGoal.setAttribute("src", "../css/img/rightSoccerGoal.png");    
    this.gameBox.appendChild(rightSoccerGoal);
}
