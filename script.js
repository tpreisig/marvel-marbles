
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
    update(){
        this.x += this.vx;
        if (this.x > this.effect.width - this.radius * 2 || this.x < this.radius) this.vx *= -1;
        this.y += this.vy;
        if (this.y > this.effect.height - this.radius * 2 || this.y < this.radius) this.vy *= -1;
    }
    reset(){
        this.x = this.minPad + Math.random() * (this.effect.width - this.minPad * 2);
        this.y = this.minPad + Math.random() * (this.effect.height - this.minPad * 2);
    }
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
    playMarvels(context, gradient){
        this.marvels.forEach(notTheMovie => {
            notTheMovie.draw(context, gradient);
            notTheMovie.update();
        })
    }
    resize(width, height){
        const canvas = document.querySelector('canvas');
        this.canvas.width = width * 0.85;
        this.canvas.height = height * 0.8;
        this.width = width;
        this.height = height;
        this.marvels.forEach(notTheMovie => {
            notTheMovie.reset();
            const ctx = canvas.getContext('2d');
            const gradient = ctx.createLinearGradient(0,0,canvas.width*2.5,canvas.height);
            gradient.addColorStop(0,"lime");
            gradient.addColorStop(0.2, "teal");
            gradient.addColorStop(0.4, "deeppink");
            gradient.addColorStop(0.7, "blue");
            gradient.addColorStop(0.9, "deeppink");
            notTheMovie.draw(this.context, gradient);
        });
    }
}


window.addEventListener('load', function(){
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0,0,canvas.width*4,canvas.height*2);
    gradient.addColorStop(0,"lime");
    gradient.addColorStop(0.3, "teal");
    gradient.addColorStop(0.4, "deeppink");
    gradient.addColorStop(0.7, "blue");
    gradient.addColorStop(0.9, "deeppink");

    canvas.width = window.innerWidth * 0.85;
    canvas.height = window.innerHeight * 0.8;
    const effect = new Effect(canvas, ctx);
    effect.createMarvels();

    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        effect.playMarvels(ctx, gradient);
        requestAnimationFrame(animate);
    }   
    animate();
});
