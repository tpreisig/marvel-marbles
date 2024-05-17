class Marvel{
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random()* 8 + 8;
        this.radius = this.radius;
        this.minPad = this.radius * 2;
        this.x = this.minPad + Math.random() * (this.effect.width - this.minPad*2);
        this.y = this.minPad + Math.random() * (this.effect.height - this.minPad*2);
        this.vx = Math.random() * 2 - 1;
        this.vy = 4;
    }
    draw(context, gradient){
        context.fillStyle = gradient;
        context.strokeStyle = "#f2fff2";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
    }

class Effect{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.marvels = [];
        this.numbersOfMarvels = 300;
        this.createMarvels();
        this.someConf();

        window.addEventListener('resize', e => {
        this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight, context);
        
        })
    }
    someConf(){
        console.log('Class Effect has been instigated.');
        console.log(this.marvels);
    }
    createMarvels(){
        for (let n=0; n < this.numbersOfMarvels; n++){
            this.marvels.push(new Marvel(this));
        }
    }
