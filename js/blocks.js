Tasks();
let area = GetAreaJs();
getAreaHtml()
localStorage.setItem('Records', "Records\n");
ScoresFunc();


function GetAreaJs()
{
    let blocksContainer = [];


    for(let i = 0; i < 4; i++)
    {   
        let blocksRow = [];
        for(let a = 0; a < 4; a++)
        {
            blocksRow.push(
            {
                isBombBlock: false
            });
        }
        blocksContainer.push(blocksRow);
    }
    
    let x = getRandomInt(4);
    let y = getRandomInt(4);

    blocksContainer[x][y].isBombBlock = true;
    return blocksContainer;
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function getAreaHtml()
{   
    var zone = document.createElement("div");
    zone.className="gameZone";
    for(let x = 0; x < 4; x++)
    {   
        let row = document.createElement("div");
        for(let y = 0; y < 4; y++)
        {
            let elem = document.createElement("div");
            elem.className = "block";
            let elem2 = document.createElement("button");
            elem2.id = String(x) + String(y);
            elem.appendChild(elem2);
            elem2.addEventListener("click", () => checkHanlder(x,y));
            row.appendChild(elem);
        }
        zone.appendChild(row);
    }

    var cont = document.getElementsByClassName("container")[0];
    cont.appendChild(zone);
}

function checkHanlder(x,y)
{
    let checkResult = area[x][y].isBombBlock;
    console.log(area);
    if(checkResult)
    {
        alert('Game over');
        let Numberr = document.getElementsByClassName("Number")[0];
       localStorage.Records += Numberr.innerText + '\n'
        Numberr.innerHTML = 0;
    }
    else{
        alert('Yes! +1 point!');
        let Numberr = document.getElementsByClassName("Number")[0];
        Numberr.innerHTML = Number(Numberr.innerHTML) + 1;
    }
        
}

async function Tasks()
{   
    let result = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(data => AddTasks(data)
      );
}

function AddTasks(data)
{   
    let Tasks = document.getElementsByClassName("tasks")[0];
    for(let i = 0; i < data.length; i++)
    {
        let elem = document.createElement("div");
        elem.className = "task";
        elem.innerText = data[i].title;
        Tasks.appendChild(elem);
    }
}

function ScoresFunc()
{
    let Records = document.getElementsByClassName("RecordsButton")[0];
    Records.addEventListener("click", () => ScoresShow())
}

function ScoresShow()
{
        alert(localStorage.Records);
}

