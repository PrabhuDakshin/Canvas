var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');
// c.fillStyle ='red';
// c.fillRect(100,100, 150, 150);

// c.beginPath();
// c.moveTo(20, 20);
// c.lineTo(400, 20 );
// c.moveTo(20, 40);
// c.lineTo(400, 40 );
// c.moveTo(400, 80 );
// c.lineTo(400, 120 );
// c.stroke();

// c.beginPath();
// c.arc(300, 300, 40, 0, Math.PI * 1.5);
// for(let i = 0; i < 10; i++)
// {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 50, 0, Math.PI * 2);
//     c.strokeStyle = "#" + parseInt(Math.random() * 0xffffff).toString(16);
//     c.stroke();

// }
// c.stroke();


// c.stroke();

let mouse = {
    x: undefined,
    y: undefined
}
let maxRadius = 60, minRadius = 3;


window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})

function Circle(x, y, dx, dy, radius)
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        c.fillStyle = "#" + parseInt(Math.random() * 0xffffff).toString(16);
        c.strokeStyle = "#" + parseInt(Math.random() * 0xffffff).toString(16);
        
        c.fill();
        c.stroke();
        
    }

    this.update = () => {
        this.dx = this.x + this.radius > innerWidth || this.x - radius < 0  ? -this.dx : this.dx;
        this.dy = this.y + this.radius > innerHeight || this.y - radius < 0 ? -this.dy : this.dy;
        this.x += this.dx;
        this.y += this.dy;

        //interactivity

        if( mouse.x - this.x < 50 && mouse.x- this.x > -50 
            && mouse.y- this.y < 50 && mouse.y- this.y > -50) 
            { if(this.radius < maxRadius) this.radius += 1  }
        else if(this.radius > this.minRadius) this.radius -= 1;
        this.draw();
    }
    
}

var circleArray = [];

for(let i = 1; i<1800; i++ )
{
    let radius = Math.random() * 3 +1;
    let x = Math.random() * (innerWidth - 2*radius) + radius;
    let y = Math.random() * (innerHeight - 2*radius) + radius;
    let dx = (Math.random() - 0.5) * 1;
    let dy = (Math.random() - 0.5) * 1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}


let x = 150, y = 150, radius = 70, dx = 9, dy = 9;

function animate(){
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(var i = 0; i < circleArray.length; i++)
    {
        circleArray[i].update();
    }
    
   
    requestAnimationFrame(animate);
}

animate();
