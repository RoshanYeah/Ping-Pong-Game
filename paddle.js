class Paddle{
    constructor(x,y,w,h){
        var options = {
            isStatic:false
        }
        this.body = Bodies.rectangle(x,y,w,h,options)
        this.w = w
        this.h = h
        World.add(world,this.body)
    }
    show(){
        let pos = this.body.position
        push()
        rectMode(CENTER)
        noStroke()
        fill("yellow")
        rect(pos.x,pos.y,this.w,this.h)
        pop()
    }
}