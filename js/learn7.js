window.onload = function () {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    animation();
    changeMaterial();
}


var renderer;
var stats;
var width;
var height;
function initThree(){
    width = window.innerWidth;
    height = window.innerHeight;
    renderer = new THREE.WebGLRenderer({
        antialiias: true
    })

    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x000000, 1.0);

    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}

var camera;
function initCamera(){
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.set(0,0,3);
}

var scene;
function initScene(){
    scene = new THREE.Scene();

    //添加一个辅助坐标轴
    // var axes = new THREE.AxisHelper(2000);
    // scene.add(axes);
}

var light;
function initLight(){
    light = new THREE.DirectionalLight(0xFFFFFF,1); 
    light.position.set(0, 0, 10);
    scene.add(light);
}

var mesh;
var textureName = 1;
function initObject(){
    //获取纹理
    var loader = new THREE.TextureLoader();
    var texture = loader.load("../texture/" + textureName + '.png');

    //然后创建一个phong材质来处理着色，并传递给纹理映射
    var material = new THREE.MeshPhongMaterial({map:texture});

    //创建一个立方体的几何体
    var geometry = new THREE.CubeGeometry(1, 1, 1);

     //将集合体和材质放到一个网格中
     mesh = new THREE.Mesh(geometry, material);

     scene.add(mesh);
}

var isChange = false;
function animation(){
    stats.begin();

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    if(isChange){
        isChange = !isChange;
        
        if(textureName < 3){
            textureName++;
        }else{
            textureName = 1;
        }
        
        let image = new Image()
        image.src ="../texture/" + textureName + '.png';
        image.onload = function () {
            mesh.material.map.image = image;
            mesh.material.map.needsUpdate = true;
        }
    }

    renderer.render(scene, camera);

    requestAnimationFrame(animation);

    stats.end();
}


function changeMaterial(){
    document.body.onclick = function () {
        isChange = !isChange;
    }
}