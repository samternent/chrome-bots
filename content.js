
// bot object
var Bot = function (myBot,stage,settings) {

    // bot settings
    var speedX = settings.speedX,
        speedY = settings.speedY,
        direction = 0,
        bots = [],
        vision = function (obj) {
            var vision =  myBot.getElementsByClassName('vision')[0];
            vision.style.width = settings.visionLength + 'px';
            vision.style.height = settings.visionWidth + 'px';
            return vision;
        },
        bounding = function (obj) {
            return obj.getBoundingClientRect();
        },

        // main loop
        go = function () {
            var topPos = parseInt(myBot.style.top),
                leftPos = parseInt(myBot.style.left);

            myBot.style.top = topPos + speedY + 'px';
            myBot.style.left = leftPos + speedX + 'px'

            checkForBot();
            checkForWalls();
        },

        // stage collision detection
        checkForWalls = function () {
            var botBox = bounding(vision()),
                stageBox = bounding(stage);


            if (botBox.bottom > stageBox.bottom && speedY > 0 ||
                botBox.top < stageBox.top && speedY < 0) {
                speedY *= -1;
                vision().style.backgroundColor = 'orange';
                myBot.style.zIndex = Math.floor(Math.random() * 100) - 10;
            }
            if (botBox.right > stageBox.right && speedX > 0 ||
                botBox.left < stageBox.left && speedX < 0) {
                speedX *= -1;
                vision().style.backgroundColor = 'orange';
            }
            var angle = Math.atan2(speedY, speedX)/(Math.PI/180);

            myBot.style.webkitTransform = 'rotate(' + angle + 'deg)';
        },


        // helper TODO: change this somewhere
        getDistance = function (x1 , y1 , x2 , y2){
            xb = ((x2 - x1)*(x2 - x1));
            yb = ((y2 - y1)*(y2 - y1));
            return Math.sqrt(xb + yb);
        },
        // check for bot
        checkForBot = function () {
            var botBox = bounding(vision());
            var hits = [];
            for (var i=0;i<bots.length;i++) {
                var enemyBox = bounding(bots[i]);
                //var distance = getDistance(botBox.right, botBox.top+(botBox.height/2), enemyBox.left+(enemyBox.width/2), enemyBox.top+(enemyBox.height/2));

                if(bots[i].id !== myBot.id) {
                    if (enemyBox.right < botBox.left ||
                       enemyBox.left > botBox.right ||
                       enemyBox.bottom < botBox.top ||
                       enemyBox.top > botBox.bottom) {
                    } else {
                        hits.push(enemyBox);
                    }
                }
            }
            if(hits.length > 0) {
                vision().style.backgroundColor = 'red';

            } else {
                vision().style.backgroundColor = 'transparent';
            }
        },

        // get other bots
        getOtherBots = function () {
            return stage.getElementsByClassName('bot');
        },

        // initialize
        init = function () {
            myBot.style.top = settings.startPosY + 'px';
            myBot.style.left = settings.startPosX + 'px';
            bots = getOtherBots();
        };

    return {
        go: go,
        init: init
    }

};


// get DOM elements
    var stage = document.body,
        samBotDOM = document.createElement('div'),
        botOneDOM = document.createElement('div'),
        botTwoDOM = document.createElement('div'),
        botThreeDOM = document.createElement('div'),
        botFourDOM = document.createElement('div'),
        visionOne = document.createElement('div');
        visionTwo = document.createElement('div');
        visionThree = document.createElement('div');
        visionFour = document.createElement('div');
        visionFive = document.createElement('div');

        samBotDOM.className = 'bot';
        botOneDOM.className = 'bot';
        botTwoDOM.className = 'bot';
        botThreeDOM.className = 'bot';
        botFourDOM.className = 'bot';
        samBotDOM.id = 'botOne';
        botOneDOM.id = 'botTwo';
        botTwoDOM.id = 'botThree';
        botThreeDOM.id = 'botFour';
        botFourDOM.id = 'botFive';
        visionOne.className = 'vision';
        visionTwo.className = 'vision';
        visionThree.className = 'vision';
        visionFour.className = 'vision';
        visionFive.className = 'vision';

        document.body.appendChild(samBotDOM);
        document.body.appendChild(botOneDOM);
        document.body.appendChild(botTwoDOM);
        document.body.appendChild(botThreeDOM);
        document.body.appendChild(botFourDOM);
        samBotDOM.appendChild(visionOne);
        botOneDOM.appendChild(visionTwo);
        botTwoDOM.appendChild(visionThree);
        botThreeDOM.appendChild(visionFour);
        botFourDOM.appendChild(visionFive);




    var samSettings = {
        speedX: 7,
        speedY: 15,
        startPosX: 0,
        startPosY: 0,
        visionLength: 150,
        visionWidth: 20
    },
    enemy1Settings = {
        speedX: 20,
        speedY: 13,
        startPosX: 400,
        startPosY: 0,
        visionLength: 100,
        visionWidth: 20
    },
    enemy2Settings = {
        speedX: 5,
        speedY: 19,
        startPosX: 0,
        startPosY: 400,
        visionLength: 50,
        visionWidth: 20
    },
    enemy3Settings = {
        speedX: 18,
        speedY: 9,
        startPosX: 400,
        startPosY: 400,
        visionLength: 40,
        visionWidth: 20
    },
    enemy4Settings = {
        speedX: 8,
        speedY: 13,
        startPosX: 300,
        startPosY: 200,
        visionLength: 140,
        visionWidth: 20
    };


    // create bot instances
    var samBot = Bot(samBotDOM,stage,samSettings);
    var botOne = Bot(botOneDOM,stage,enemy1Settings);
    var botTwo = Bot(botTwoDOM,stage,enemy2Settings);
    var botThree = Bot(botThreeDOM,stage,enemy3Settings);
    var botFour = Bot(botFourDOM,stage,enemy4Settings);


    // initialize bots
    samBot.init();
    botOne.init();
    botTwo.init();
    botThree.init();
    botFour.init();

    // start the loop
    setInterval(function () {
        samBot.go();
        botOne.go();
        botTwo.go();
        botThree.go();
        botFour.go();

    }, 100);



