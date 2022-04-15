import {solids, polyhedra, models} from './wireframe/model.js';
import s1 from './wireframe/min.model.js';
import {loadObj, edgeList} from './wireframe/loader.js';
import * as g from './wireframe/render.js';

var ww = 60, wh = 30;

let obj = loadObj(Object.values(polyhedra)[5], 3);
let obj_v = obj.vertices.v;
let obj_i = obj.indices.v;
obj_i = edgeList(obj_i);

var pre = document.getElementById('disp');
var pre2 = document.getElementById('disp2');

let mouse = {x:0,y:0};
window.onmousemove = (e)=>{
    mouse.x = (2.*e.clientX-window.innerWidth)/window.innerHeight;
    mouse.y = (2.*e.clientY-window.innerHeight)/window.innerHeight;
}
window.ontouchmove = (e)=>{
    mouse.x = (2.*e.touches[0].clientX-ww)/wh;
    mouse.y = (2.*e.touches[0].clientY-wh)/wh;
}

document.body.onkeydown = (e)=>{
    if(e.key === " ") scene.r_mat = scene.r_mat ? 0 : rot;
}

let rot = g.create_rot(.028, -0.014, -0.015);
let translate = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[mouse.x,mouse.y,0,1]];
let proj = g.create_proj(.7, .3, .3);
let scene = g.create_ascii_scene([pre, pre2], ww, wh, obj_v, obj_i, rot, translate, null, proj);

window.setInterval(()=>{
        // translate[3][0] = 1+mouse.x*2;
        // translate[3][1] = mouse.y*2; 
        translate[3][0] = 0;
        translate[3][2] = 2.;  
        scene.v_mat = g.lookAt( [.0+-mouse.x*3, -mouse.y*3, -1.], [0,0, 1.5], .0);
        g.asciirender(scene, 0);
}, 30);
