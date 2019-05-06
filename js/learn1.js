var scene = new THREE.Scene();    //新建场景

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);         //透视相机(视角, 横纵比, 近平面，远平面)

var renderer = new THREE.WebGLRenderer();  //新建渲染器