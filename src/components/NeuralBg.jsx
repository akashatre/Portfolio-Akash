import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 90;
const CONN_DIST  = 2.4;
const BOUNDS     = 7;

function Network() {
    const groupRef = useRef();
    const mouseRef = useRef({ x: 0, y: 0 });

    const nodes = useRef(
        Array.from({ length: NODE_COUNT }, () => ({
            pos: new THREE.Vector3(
                (Math.random()-0.5)*BOUNDS*2,
                (Math.random()-0.5)*BOUNDS*2,
                (Math.random()-0.5)*BOUNDS
            ),
            vel: new THREE.Vector3(
                (Math.random()-0.5)*0.003,
                (Math.random()-0.5)*0.003,
                (Math.random()-0.5)*0.002
            ),
        }))
    );

    const ppArr  = useRef(new Float32Array(NODE_COUNT*3));
    const maxL   = NODE_COUNT*NODE_COUNT;
    const lpArr  = useRef(new Float32Array(maxL*6));
    const lcArr  = useRef(new Float32Array(maxL*6));
    const ptRef  = useRef();
    const lsRef  = useRef();

    useEffect(()=>{
        const mv = e=>{
            mouseRef.current.x = (e.clientX/window.innerWidth-0.5)*2;
            mouseRef.current.y = (e.clientY/window.innerHeight-0.5)*2;
        };
        window.addEventListener('mousemove',mv);
        return ()=>window.removeEventListener('mousemove',mv);
    },[]);

    useFrame(({clock})=>{
        const t  = clock.getElapsedTime();
        const ns = nodes.current;
        const pp = ppArr.current;
        const lp = lpArr.current;
        const lc = lcArr.current;

        if(groupRef.current){
            groupRef.current.rotation.y += (mouseRef.current.x*0.25 - groupRef.current.rotation.y)*0.018;
            groupRef.current.rotation.x += (-mouseRef.current.y*0.12 - groupRef.current.rotation.x)*0.018;
        }

        for(let i=0;i<ns.length;i++){
            const n=ns[i];
            n.pos.add(n.vel);
            if(Math.abs(n.pos.x)>BOUNDS)   n.vel.x*=-1;
            if(Math.abs(n.pos.y)>BOUNDS)   n.vel.y*=-1;
            if(Math.abs(n.pos.z)>BOUNDS/2) n.vel.z*=-1;
            pp[i*3]=n.pos.x; pp[i*3+1]=n.pos.y; pp[i*3+2]=n.pos.z;
        }
        if(ptRef.current) ptRef.current.geometry.attributes.position.needsUpdate=true;

        let li=0;
        for(let i=0;i<ns.length;i++){
            for(let j=i+1;j<ns.length;j++){
                const dx=ns[i].pos.x-ns[j].pos.x;
                const dy=ns[i].pos.y-ns[j].pos.y;
                const dz=ns[i].pos.z-ns[j].pos.z;
                const d=Math.sqrt(dx*dx+dy*dy+dz*dz);
                if(d<CONN_DIST){
                    const s = 1-d/CONN_DIST;
                    const pulse = 0.3+0.7*Math.abs(Math.sin(t*1.1+i*0.25+j*0.12));
                    const a = s*pulse;
                    lp[li*6]=ns[i].pos.x; lp[li*6+1]=ns[i].pos.y; lp[li*6+2]=ns[i].pos.z;
                    lp[li*6+3]=ns[j].pos.x; lp[li*6+4]=ns[j].pos.y; lp[li*6+5]=ns[j].pos.z;
                    // Purple → Cyan gradient per edge
                    const mix = (i+j)%2===0;
                    lc[li*6]  =mix?0.54*a:0.08*a; lc[li*6+1]=mix?0.36*a:0.83*a; lc[li*6+2]=mix?0.96*a:0.93*a;
                    lc[li*6+3]=mix?0.08*a:0.54*a; lc[li*6+4]=mix?0.83*a:0.36*a; lc[li*6+5]=mix?0.93*a:0.96*a;
                    li++;
                }
            }
        }
        if(lsRef.current){
            lsRef.current.geometry.setDrawRange(0,li*2);
            lsRef.current.geometry.attributes.position.needsUpdate=true;
            lsRef.current.geometry.attributes.color.needsUpdate=true;
        }
    });

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position',new THREE.BufferAttribute(ppArr.current,3));
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position',new THREE.BufferAttribute(lpArr.current,3));
    lGeo.setAttribute('color',new THREE.BufferAttribute(lcArr.current,3));
    lGeo.setDrawRange(0,0);

    return (
        <group ref={groupRef}>
            <points ref={ptRef} geometry={pGeo}>
                <pointsMaterial color="#8B5CF6" size={0.055} transparent opacity={0.85}
                    sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
            </points>
            <lineSegments ref={lsRef} geometry={lGeo}>
                <lineBasicMaterial vertexColors transparent opacity={0.38}
                    blending={THREE.AdditiveBlending} depthWrite={false} />
            </lineSegments>
        </group>
    );
}

function Stars() {
    const ref = useRef();
    const count = 300;
    const pos = new Float32Array(count*3);
    for(let i=0;i<count;i++){
        pos[i*3]=(Math.random()-0.5)*30;
        pos[i*3+1]=(Math.random()-0.5)*30;
        pos[i*3+2]=(Math.random()-0.5)*15-12;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    useFrame(({clock})=>{ if(ref.current) ref.current.rotation.y=clock.getElapsedTime()*0.008; });
    return (
        <points ref={ref} geometry={geo}>
            <pointsMaterial color="#22D3EE" size={0.018} transparent opacity={0.3}
                sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
    );
}

const NeuralBg = () => (
    <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none'}}>
        <Canvas camera={{position:[0,0,9],fov:62}}
            gl={{alpha:true,antialias:true,powerPreference:'high-performance'}}
            dpr={[1,1.4]}>
            <Suspense fallback={null}>
                <Stars />
                <Network />
            </Suspense>
        </Canvas>
    </div>
);

export default NeuralBg;
