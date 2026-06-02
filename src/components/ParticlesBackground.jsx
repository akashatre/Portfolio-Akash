import { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;
        let w = window.innerWidth, h = window.innerHeight;
        canvas.width = w; canvas.height = h;
        const particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random()*w, y: Math.random()*h,
                vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4,
                r: Math.random()*1.5+0.5, a: Math.random()*0.4+0.15
            });
        }
        const animate = () => {
            ctx.clearRect(0,0,w,h);
            particles.forEach((p,i) => {
                p.x+=p.vx; p.y+=p.vy;
                if(p.x<0||p.x>w) p.vx*=-1;
                if(p.y<0||p.y>h) p.vy*=-1;
                ctx.beginPath();
                ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
                ctx.fillStyle=`rgba(253,196,53,${p.a})`;
                ctx.fill();
                particles.slice(i+1).forEach(q => {
                    const d=Math.hypot(p.x-q.x,p.y-q.y);
                    if(d<130){
                        ctx.beginPath();
                        ctx.strokeStyle=`rgba(253,196,53,${(1-d/130)*0.1})`;
                        ctx.lineWidth=1;
                        ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
                    }
                });
            });
            animId=requestAnimationFrame(animate);
        };
        const onResize=()=>{ w=window.innerWidth; h=window.innerHeight; canvas.width=w; canvas.height=h; };
        window.addEventListener('resize',onResize);
        animate();
        return ()=>{ window.removeEventListener('resize',onResize); cancelAnimationFrame(animId); };
    },[]);
    return <canvas ref={canvasRef} style={{position:'fixed',top:0,left:0,zIndex:0,pointerEvents:'none'}} />;
};

export default ParticlesBackground;
