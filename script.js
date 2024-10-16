import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom({
    width: 1000,
    height: 600,
});

setGravity(2000);

scene("title", ()=>{
    loadSprite("grid", "ovfs88vhtmu91-removebg-preview.png");
    add([
        rect(width(), height()),
        color(210, 213, 205)
    ])
    add([
        sprite("grid", {width: width() / 1.5, height: height() - 30}),
        anchor("center"),
        pos(width() / 2, height() / 2)
    ])
    add([
        text("Connect 4"),
        anchor("center"),
        pos(width() / 2, height() / 3),
        scale(2),
        color(0, 0, 0)
    ])
    add([
        text("Click to Start"),
        anchor("center"),
        pos(width() / 2, height() / 2),
        scale(1.5),
        color(0, 0, 0)
    ])
    onClick(()=>{go("game");});
})

scene("game", ()=>{
    loadSprite("grid", "ovfs88vhtmu91-removebg-preview.png");
    let turn = true;
    let timer = 0;
    let matrix = [[0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0]];
    let winner = 0;
    add([
        rect(width(), height()),
        color(200, 200, 200)
    ])
    const grid = add([
        sprite("grid", {width: width() / 1.48, height: height() - 30}),
        anchor("center"),
        pos(width() / 2, height() / 2)
    ])
    add([
        rect(width(), 10),
        anchor("center"),
        pos(width() / 2, height() - 68),
        area(),
        body({isStatic: true}),
        opacity(0)
    ])
    onClick(()=>{
        if(winner > 0) {
            go("game");
        } else if(timer > 50) {
            let x = mousePos().x;
            let circX = -1;
            let column;
            if(x > 200 && x < 300) {
                circX = 262;
                column = 0;
            }
            else if(x > 300 && x < 375) {
                circX = 342;
                column = 1;
            }
            else if(x > 375 && x < 465) {
                circX = 424;
                column = 2;
            }
            else if(x > 465 && x < 555) {
                circX = 502;
                column = 3;
            }
            else if(x > 555 && x < 635) {
                circX = 583;
                column = 4;
            }
            else if(x > 635 && x < 715) {
                circX = 662;
                column = 5;
            }
            else if(x > 715 && x < 805) {
                circX = 740;
                column = 6;
            }
            if(circX > -1 && matrix[0][column] == 0) {
                add([
                    circle(40),
                    pos(circX, 0),
                    color(255, turn ? 0 : 255, 0),
                    area(),
                    body()
                ])
                for(let i = 0; i < 6; i++) {
                    if(matrix[i][column] != 0) {
                        matrix[i - 1][column] = turn ? 1 : 2;
                        break;
                    } else if(i == 5) {
                        matrix[i][column] = turn ? 1 : 2;
                        break;
                    }
                }
                for(let i = 0; i < 6; i++) {
                    for(let j = 0; j < 7; j++) {
                        if(j > 2 && matrix[i][j] != 0 && matrix[i][j - 1] == matrix[i][j] && matrix[i][j - 2] == matrix[i][j] && matrix[i][j - 3] == matrix[i][j])
                            winner = matrix[i][j];
                        if(i > 2 && matrix[i][j] != 0 && matrix[i - 1][j] == matrix[i][j] && matrix[i - 2][j] == matrix[i][j] && matrix[i - 3][j] == matrix[i][j])
                            winner = matrix[i][j];
                        if(i < 3 && j > 2 && matrix[i][j] != 0 && matrix[i + 1][j - 1] == matrix[i][j] && matrix[i + 2][j - 2] == matrix[i][j] && matrix[i + 3][j - 3] == matrix[i][j])
                            winner = matrix[i][j];
                        if(i < 3 && j < 4 && matrix[i][j] != 0 && matrix[i + 1][j + 1] == matrix[i][j] && matrix[i + 2][j + 2] == matrix[i][j] && matrix[i + 3][j + 3] == matrix[i][j])
                            winner = matrix[i][j];
                    }
                }
                readd(grid);
                if(winner > 0) {
                    add([
                        text((winner == 1 ? "Red " : "Yellow ") + "Wins"),
                        anchor("center"),
                        pos(width() / 2, 100),
                        scale(2),
                        color(255, winner == 1 ? 0 : 255, 0)
                    ])
                    add([
                        text("Click to Restart"),
                        anchor("center"),
                        pos(width() / 2, 200),
                        scale(1.5),
                        color(0, 0, 0)
                    ])
                }
                turn = !turn;
                timer = 0;
            }
        }
    })
    onUpdate(()=>{
        timer++;
    })
})

go("title");