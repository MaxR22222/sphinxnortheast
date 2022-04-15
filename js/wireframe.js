import {solids, polyhedra, models} from './wireframe/model.js';
import s1 from './wireframe/min.model.js';
import {loadObj, edgeList} from './wireframe/loader.js';
import * as g from './wireframe/render.js';

var ww = window.innerWidth, wh = window.innerHeight;

const canvas = document.getElementById('canv');
// canvas.style.backgroundColor = 'darkslateblue';
const ctx = canvas.getContext('2d');
canvas.width = ww; canvas.height = wh;
// console.log(canvas.style)

let obj = loadObj(Object.values(polyhedra)[12], 5);
let obj_v = obj.vertices.v;
let obj_i = obj.indices.v;

// let obj_v = s1.v;
// let obj_i = s1.i;

obj_i = edgeList(obj_i);

let mouse = {x:0,y:0};
window.onmousemove = (e)=>{
    mouse.x = (2.*e.clientX-ww)/wh;
    mouse.y = (2.*e.clientY-wh)/wh;
}
window.ontouchmove = (e)=>{
    mouse.x = (2.*e.touches[0].clientX-ww)/wh;
    mouse.y = (2.*e.touches[0].clientY-wh)/wh;
}

// let rot = g.create_rot(.02, -0.03, -0.014);
// let rot = g.create_rot(.002, -0.005, -0.005);
// let rot = g.create_rot(.005, -0.008, -0.006);
let rot = g.create_rot(.01, -0.008, -0.009);

// obj_v = g.mat_mul_4(obj_v, g.create_rot(0.2, -0.5, 0.7));
let translate = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[mouse.x,mouse.y,0,1]];
let proj = g.create_proj(.7, .3, .3);
let colors = { bkgd: '#bbbbbb', fill: '#bbbbbb', stroke: 'grey' };
let scene = g.create_canvas_scene(ctx, ww, wh, colors, obj_v, obj_i, rot, translate, null, proj);

document.body.onkeydown = (e)=>{
    if(e.key === " ") scene.r_mat = scene.r_mat ? 0 : rot;
}

window.setInterval(()=>{
        // translate[3][0] = 1+mouse.x*2;
        // translate[3][1] = mouse.y*2; 
        translate[3][0] = 1.;
        translate[3][2] = 2.2;  
        scene.v_mat = g.lookAt( [.6+-mouse.x*3, -mouse.y*3, -1.], [0,0, 1.5], .0);
        g.canvasrender(scene, 0);
}, 30);