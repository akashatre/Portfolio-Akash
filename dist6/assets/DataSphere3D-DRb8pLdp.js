import{r as o,j as e}from"./index-BvbRU12W.js";import{R as A,b as R,u as x,A as M,V as j,S as z,c as C,C as F,L as E,B as P}from"./react-three-fiber.esm-BDvnm5Zz.js";const D=()=>parseInt(A.replace(/\D+/g,"")),_=D();class I extends C{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${_>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const B=t=>new j().setFromSpherical(new z(t,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),L=o.forwardRef(({radius:t=100,depth:a=50,count:s=5e3,saturation:c=0,factor:l=4,fade:i=!1,speed:n=1},m)=>{const r=o.useRef(null),[u,h,p]=o.useMemo(()=>{const d=[],v=[],S=Array.from({length:s},()=>(.5+.5*Math.random())*l),g=new R;let y=t+a;const w=a/s;for(let b=0;b<s;b++)y-=w*Math.random(),d.push(...B(y).toArray()),g.setHSL(b/s,c,.9),v.push(g.r,g.g,g.b);return[new Float32Array(d),new Float32Array(v),new Float32Array(S)]},[s,a,l,t,c]);x(d=>r.current&&(r.current.uniforms.time.value=d.clock.elapsedTime*n));const[f]=o.useState(()=>new I);return o.createElement("points",{ref:m},o.createElement("bufferGeometry",null,o.createElement("bufferAttribute",{attach:"attributes-position",args:[u,3]}),o.createElement("bufferAttribute",{attach:"attributes-color",args:[h,3]}),o.createElement("bufferAttribute",{attach:"attributes-size",args:[p,1]})),o.createElement("primitive",{ref:r,object:f,attach:"material",blending:M,"uniforms-fade-value":i,depthWrite:!1,transparent:!0,vertexColors:!0}))}),T=()=>{const t=o.useRef(),a=1200,{positions:s,colors:c,sizes:l}=o.useMemo(()=>{const i=new Float32Array(a*3),n=new Float32Array(a*3),m=new Float32Array(a);for(let r=0;r<a;r++){const u=Math.acos(1-2*(r+.5)/a),h=Math.PI*(1+Math.sqrt(5))*r,p=2+(Math.random()-.5)*.3;i[r*3]=p*Math.sin(u)*Math.cos(h),i[r*3+1]=p*Math.sin(u)*Math.sin(h),i[r*3+2]=p*Math.cos(u);const f=Math.random();n[r*3]=.99*f+.99*(1-f),n[r*3+1]=.77*f+1*(1-f),n[r*3+2]=.21*f+1*(1-f),m[r]=Math.random()*1.5+.5}return{positions:i,colors:n,sizes:m}},[]);return x(({clock:i})=>{if(t.current){const n=i.getElapsedTime();t.current.rotation.y=n*.07,t.current.rotation.x=Math.sin(n*.04)*.18}}),e.jsx("group",{ref:t,children:e.jsxs("points",{children:[e.jsxs("bufferGeometry",{children:[e.jsx("bufferAttribute",{attach:"attributes-position",count:a,array:s,itemSize:3}),e.jsx("bufferAttribute",{attach:"attributes-color",count:a,array:c,itemSize:3}),e.jsx("bufferAttribute",{attach:"attributes-size",count:a,array:l,itemSize:1})]}),e.jsx("pointsMaterial",{vertexColors:!0,size:.04,transparent:!0,opacity:.85,sizeAttenuation:!0,blending:M,depthWrite:!1})]})})},V=()=>{const t=o.useRef(),a=o.useRef(),s=o.useRef();x(({clock:i})=>{const n=i.getElapsedTime();t.current&&(t.current.rotation.z=n*.1),a.current&&(a.current.rotation.x=n*.08),s.current&&(s.current.rotation.y=n*.06)});const c=new E({color:"#FDC435",transparent:!0,opacity:.15,blending:M}),l=(i,n=128)=>{const m=[];for(let r=0;r<=n;r++){const u=r/n*Math.PI*2;m.push(new j(Math.cos(u)*i,Math.sin(u)*i,0))}return new P().setFromPoints(m)};return e.jsxs(e.Fragment,{children:[e.jsx("line",{ref:t,geometry:l(2.35),material:c}),e.jsx("line",{ref:a,geometry:l(2.5),material:c}),e.jsx("line",{ref:s,geometry:l(2.65),material:c})]})},G=()=>{const t=o.useRef();return x(({clock:a})=>{if(t.current){const s=1+Math.sin(a.getElapsedTime()*1.2)*.04;t.current.scale.set(s,s,s)}}),e.jsxs("mesh",{ref:t,children:[e.jsx("sphereGeometry",{args:[.5,32,32]}),e.jsx("meshBasicMaterial",{color:"#FDC435",transparent:!0,opacity:.06,blending:M})]})},q=({size:t="100%"})=>e.jsx("div",{style:{width:t,height:t,position:"absolute",inset:0,pointerEvents:"none"},children:e.jsx(F,{camera:{position:[0,0,5.5],fov:42},gl:{alpha:!0,antialias:!0,powerPreference:"high-performance"},dpr:[1,1.5],children:e.jsxs(o.Suspense,{fallback:null,children:[e.jsx("ambientLight",{intensity:.3}),e.jsx("pointLight",{position:[4,4,4],intensity:1,color:"#FDC435"}),e.jsx(L,{radius:100,depth:60,count:800,factor:3,saturation:0,fade:!0,speed:.3}),e.jsx(G,{}),e.jsx(T,{}),e.jsx(V,{})]})})});export{q as default};
