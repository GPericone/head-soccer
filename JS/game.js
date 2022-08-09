game = null;
startGame = false;

function begin()
{
    game = new Game();
    game.splashScreen();
}

function Game()
{
    this.pitch = new Pitch();
    this.ball = new Ball(this.pitch);
    this.selectedLeftPlayer = null;
    this.selectedRightPlayer = null;
    this.leftPlayer = new Player();
    this.rightPlayer = new Player();
    this.leftScore = 0;
    this.rightScore = 0;
    this.scoreboard = null;
    this.seconds = 0;
    this.secondsInterval = null;
    this.gameTimeout = null;
}

Game.prototype.splashScreen = function()
{
    main = document.getElementById("main");
    splash = document.createElement("div");
    splash.id = "splashScreen";
    main.appendChild(splash);
    splashH3 = document.createElement("h3");
    splashH3.textContent = "Scegli i due personaggi!";
    splash.appendChild(splashH3);
    characterSelection = document.createElement("div");
    characterSelection.id = "characterSelection";
    splash.appendChild(characterSelection);
    // The Boy
    figcaptionTheBoy = document.createElement("figcaption");
    figcaptionTheBoy.id = "figcaptionTheBoy";
    figcaptionTheBoy.setAttribute("class", "figcaptionCharacter");
    characterTheBoy = document.createElement("img");
    characterTheBoy.id = "characterTheBoy";
    characterTheBoy.setAttribute("class", "character");
    characterTheBoy.setAttribute("src", "../css/img/players/boy-idle.png");
    captionTheBoy = document.createElement("caption");
    captionTheBoy.id = "captionTheBoy";
    captionTheBoy.setAttribute("class", "captionCharacter");
    captionTheBoy.textContent = "Boy";
    figcaptionTheBoy.appendChild(characterTheBoy);
    figcaptionTheBoy.appendChild(captionTheBoy);
    figcaptionTheBoy.addEventListener("click", function()
    {
        game.select("TheBoy");
    });
    characterSelection.appendChild(figcaptionTheBoy);
    // Dino
    figcaptionDino = document.createElement("figcaption");
    figcaptionDino.id = "figcaptionDino";
    figcaptionDino.setAttribute("class", "figcaptionCharacter");
    characterDino = document.createElement("img");
    characterDino.id = "characterDino";
    characterDino.setAttribute("class", "character");
    characterDino.setAttribute("src", "../css/img/players/dino-idle.png");
    captionDino = document.createElement("caption");
    captionDino.id = "captionDino";
    captionDino.setAttribute("class", "captionCharacter");
    captionDino.textContent = "Dino";
    figcaptionDino.appendChild(characterDino);
    figcaptionDino.appendChild(captionDino);
    figcaptionDino.addEventListener("click", function()
    {
        game.select("Dino");
    });
    characterSelection.appendChild(figcaptionDino);
    // Santa
    figcaptionSanta = document.createElement("figcaption");
    figcaptionSanta.id = "figcaptionSanta";
    figcaptionSanta.setAttribute("class", "figcaptionCharacter");
    characterSanta = document.createElement("img");
    characterSanta.id = "characterSanta";
    characterSanta.setAttribute("class", "character");
    characterSanta.setAttribute("src", "../css/img/players/santa-idle.png");
    captionSanta = document.createElement("caption");
    captionSanta.id = "captionSanta";
    captionSanta.setAttribute("class", "captionCharacter");
    captionSanta.textContent = "Santa";
    figcaptionSanta.appendChild(characterSanta);
    figcaptionSanta.appendChild(captionSanta);
    figcaptionSanta.addEventListener("click", function()
    {
        game.select("Santa");
    });
    characterSelection.appendChild(figcaptionSanta);
    // Zom
    figcaptionZom = document.createElement("figcaption");
    figcaptionZom.id = "figcaptionZom";
    figcaptionZom.setAttribute("class", "figcaptionCharacter");
    characterZom = document.createElement("img");
    characterZom.id = "characterZom";
    characterZom.setAttribute("class", "character");
    characterZom.setAttribute("src", "../css/img/players/zom-idle.png");
    captionZom = document.createElement("caption");
    captionZom.id = "captionZom";
    captionZom.setAttribute("class", "captionCharacter");
    captionZom.textContent = "Zom";
    figcaptionZom.appendChild(characterZom);
    figcaptionZom.appendChild(captionZom);
    figcaptionZom.addEventListener("click", function()
    {
        game.select("Zom");
    });
    characterSelection.appendChild(figcaptionZom);

    buttonStart = document.createElement("button");
    buttonStart.id = "buttonStart";
    buttonStart.setAttribute("onclick", "game.start()");
    buttonStart.disabled = true;
    buttonStart.textContent = "Gioca!";
    splash.appendChild(buttonStart);
}

Game.prototype.start = function()
{
    main = document.getElementById("main");
    while (main.hasChildNodes()) 
    {   
        main.removeChild(main.firstChild);
    } 
    this.pitch.createPitch();
    this.ball.createBall();
    this.leftPlayer.createPlayer(this.pitch, game.selectedLeftPlayer, "left");
    this.rightPlayer.createPlayer(this.pitch, game.selectedRightPlayer, "right");
    this.leftScore = 0;
    this.rightScore = 0;
    this.createScoreboard();
    startGame = true;
    this.secondsInterval = setInterval(function(){
        game.seconds++;
    },1000);
    this.gameTimeout = setTimeout(this.fineGioco.bind(this),60000);
}

Game.prototype.fineGioco = function()
{
    startGame = false;
    clearInterval(this.secondsInterval);
    winnerText = document.createElement("img");
    winnerText.id ="winnerText";
    this.pitch.gameBox.appendChild(winnerText);
    if(this.leftScore > this.rightScore)
    {
        switch(game.rightPlayer.name)
        {
            case "TheBoy":
                game.rightPlayer.playerImage.setAttribute("src", "../css/img/players/boy-lose.png");
                break;
            case "Dino":
                game.rightPlayer.playerImage.setAttribute("src", "../css/img/players/dino-lose.png");
                break;
            case "Santa":
                game.rightPlayer.playerImage.setAttribute("src", "../css/img/players/santa-lose.png");
                break;
            case "Zom":
                game.rightPlayer.playerImage.setAttribute("src", "../css/img/players/zom-lose.png");
                break;
            default:
                break;
        }
        switch(game.leftPlayer.name)
        {
            case "TheBoy":
                winnerText.setAttribute("src", "../css/img/boy-win.png");
                break;
            case "Dino":
                winnerText.setAttribute("src", "../css/img/dino-win.png");
                break;
            case "Santa":
                winnerText.setAttribute("src", "../css/img/santa-win.png");
                break;
            case "Zom":
                winnerText.setAttribute("src", "../css/img/zom-win.png");
                break;
            default:
                break;
        }        
    }
    else if(this.leftScore < this.rightScore)
    {
        switch(game.leftPlayer.name)
        {
            case "TheBoy":
                game.leftPlayer.playerImage.setAttribute("src", "../css/img/players/boy-lose.png");
                break;
            case "Dino":
                game.leftPlayer.playerImage.setAttribute("src", "../css/img/players/dino-lose.png");
                break;
            case "Santa":
                game.leftPlayer.playerImage.setAttribute("src", "../css/img/players/santa-lose.png");
                break;
            case "Zom":
                game.leftPlayer.playerImage.setAttribute("src", "../css/img/players/zom-lose.png");
                break;
            default:
                break;
        }
        switch(game.rightPlayer.name)
        {
            case "TheBoy":
                winnerText.setAttribute("src", "../css/img/boy-win.png");
                break;
            case "Dino":
                winnerText.setAttribute("src", "../css/img/dino-win.png");
                break;
            case "Santa":
                winnerText.setAttribute("src", "../css/img/santa-win.png");
                break;
            case "Zom":
                winnerText.setAttribute("src", "../css/img/zom-win.png");
                break;
            default:
                break;
        }       
    }
    else
    {
        winnerText.setAttribute("src", "../css/img/draw.png");
    }
    setTimeout(function()
        {         
            location.reload();     
        },3000);
}

Game.prototype.createScoreboard = function()
{
    gameBox = this.pitch.gameBox;
    this.scoreboard = document.createElement("div");
    this.scoreboard.id = "scoreboard";
    leftScoreboard = document.createElement("input");
    leftScoreboard.id = "leftScoreboard";
    leftScoreboard.setAttribute("readonly", "true");
    leftScoreboard.value = this.leftScore;
    rightScoreboard = document.createElement("input");
    rightScoreboard.id = "rightScoreboard";
    rightScoreboard.setAttribute("readonly", "true");
    rightScoreboard.value = this.rightScore;
    timeScoreboard = document.createElement("input");
    timeScoreboard.id = "timeScoreboard";
    timeScoreboard.setAttribute("readonly", "true");
    timeScoreboard.value = this.seconds;
    this.scoreboard.appendChild(leftScoreboard);
    this.scoreboard.appendChild(rightScoreboard);
    this.scoreboard.appendChild(timeScoreboard);
    scoreboardInterval = setInterval(function()
    {
        leftScoreboard.value = game.leftScore;
        rightScoreboard.value = game.rightScore;
        timeScoreboard.value = game.seconds;
    },REFRESH_RATE);
    gameBox.appendChild(this.scoreboard);
}

Game.prototype.select = function()
{
    if(this.selectedLeftPlayer == null)
    {
        this.selectedLeftPlayer = arguments[0];
        figcaptionSelected = document.getElementById("figcaption" + arguments[0]);
        characterSelected = document.getElementById("character" + arguments[0]);
        figcaptionSelected.setAttribute("class", "figcaptionCharacter leftSelected");
        characterSelected.setAttribute("class", "character leftSelected");
    }
    else if(this.selectedRightPlayer == null)
    {
        this.selectedRightPlayer = arguments[0];
        figcaptionSelected = document.getElementById("figcaption" + arguments[0]);
        characterSelected = document.getElementById("character" + arguments[0]);
        buttonStart = document.getElementById("buttonStart");
        buttonStart.disabled = false;
        figcaptionSelected.setAttribute("class", "figcaptionCharacter rightSelected");
        characterSelected.setAttribute("class", "character rightSelected");
    }
}


