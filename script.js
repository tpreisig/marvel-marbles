
class Marvel{
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random()* 16 + 8;
        this.minRadius = this.radius;
        this.maxRadius = this.radius * 2;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius*2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius*2);
        this.vx = Math.random() * 6 - 1;
        this.vy = 2;
    }
    draw(context, gradient){
        context.lineWidth = 2;
        context.fillStyle = gradient;
        context.strokeStyle = "rgba(240, 248, 255, 0.8)";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
    }
    update(){
        this.x += this.vx;
        if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;
        this.y += this.vy;
        if (this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;
    }
    reset(){
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    }
}

class Effect{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.marvels = [];
        this.numbersOfMarvels = 200;
        this.createMarvels();
        window.addEventListener('resize', e => {
        this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight, context);
        document.getElementById('resizeEvent').innerHTML = `<p>Resize event ${e.currentTarget.innerWidth} ${e.currentTarget.innerHeight}</p>`;
        })
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
        this.width = width * 0.85;
        this.height = height * 0.8;
        this.canvas.width = width * 0.85;
        this.canvas.height = height * 0.8;

        this.marvels.forEach(notTheMovie => {
            notTheMovie.reset();
            const ctx = canvas.getContext('2d');
            const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
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
