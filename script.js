let Elements = {};
['StartSection','GoalSection','FindRouteBtn','MapContainer','Canvas','Map'].forEach((Key)=>{
    Elements[Key] = document.getElementById(Key);
});

let CTX;
function RunCTX() {
    CTX.reset();
    CTX.beginPath();
    Elements['Canvas'].setAttribute('height', Elements['Map'].offsetHeight);
    Elements['Canvas'].setAttribute('width', Elements['Map'].offsetWidth);
    CTX.lineWidth = 2;
    CTX.strokeStyle = 'green';

    let StartX = Elements['Start'].offsetLeft + (Elements['Start'].offsetWidth / 2);
    let StartY = Elements['Start'].offsetTop + (Elements['Start'].offsetHeight / 2);
    let EndX = Elements['End'].offsetLeft + (Elements['End'].offsetWidth / 2);
    let EndY = Elements['End'].offsetTop + (Elements['End'].offsetHeight / 2);

    CTX.moveTo(StartX, StartY);
    CTX.lineTo(EndX, EndY);
    CTX.stroke();
    CTX.beginPath();
    CTX.lineWidth = 10;
    CTX.strokeStyle = 'red';
    CTX.moveTo(StartX, StartY);
    CTX.lineTo(StartX + 10, StartY + 10);
    CTX.moveTo(EndX, EndY);
    CTX.lineTo(EndX + 10, EndY + 10);
    CTX.stroke();

    CTX.lineWidth = 2;
    CTX.strokeStyle = 'red';

    let PlusAX = Elements['PlusA'].offsetLeft + (Elements['PlusA'].offsetWidth / 2);
    let PlusAY = Elements['PlusA'].offsetTop + (Elements['PlusA'].offsetHeight / 2);
    let PlusBX = Elements['PlusB'].offsetLeft + (Elements['PlusB'].offsetWidth / 2);
    let PlusBY = Elements['PlusB'].offsetTop + (Elements['PlusB'].offsetHeight / 2);

    CTX.moveTo(PlusAX, PlusAY);
    CTX.lineTo(PlusBX, PlusBY);
    CTX.lineTo(EndX, EndY);
    CTX.moveTo(PlusAX, PlusAY);
    CTX.lineTo(StartX, StartY);
    CTX.stroke();
    CTX.beginPath();
    CTX.lineWidth = 10;
    CTX.strokeStyle = '#000000';
    CTX.moveTo(PlusAX, PlusAY);
    CTX.lineTo(PlusAX + 10, PlusAY + 10);
    CTX.moveTo(PlusBX, PlusBY);
    CTX.lineTo(PlusBX + 10, PlusBY + 10);
    CTX.stroke();
}

document.addEventListener("DOMContentLoaded", function() {
    CTX = Elements['Canvas'].getContext("2d");

    Elements['FindRouteBtn'].addEventListener('click', function() {
        let Paths = [],
            StartPath = Elements['StartSection'].value.toString().toLowerCase().replaceAll(' & ','-').replaceAll(' ','-'),
            EndPath = Elements['GoalSection'].value.toString().toLowerCase().replaceAll(' & ','-').replaceAll(' ','-');

        document.querySelectorAll('.map-item').forEach((Path) => {
            if (![StartPath, EndPath].includes(Path.id)) {
                Paths.push(Path.id);
            }
        });

        Elements['Start'] = document.getElementById(StartPath);
        Elements['PlusA'] = document.getElementById(Paths[Math.floor(Math.random() * 100) % Paths.length]);
        Elements['PlusB'] = document.getElementById(Paths[Math.floor(Math.random() * 100) % Paths.length]);
        Elements['End'] = document.getElementById(EndPath);

        Elements['MapContainer'].style.display = 'block';
        RunCTX();
    });
});
