window.onload = function () {
    init();
    animate();
}


var renderer, camera, scene;
var geometry, mesh;
var texture = null;
var stats;

function init() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);

    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.z = 400;
    scene = new THREE.Scene();

    geometry = new THREE.PlaneGeometry(100,100,1,1);  //平面模型
    var material = new THREE.MeshBasicMaterial({
        wireframe: false,
        shading: THREE.FlatShading,
        vertexColors: THREE.VertexColors
    });

    var color1 = new THREE.Color(0x00900F);
    var color2 = new THREE.Color(0x0000F0);
    var color3 = new THREE.Color(0x20F0FF);

    for(var i=0; i<geometry.faces.length; i++){
        var f = geometry.faces[i];
        f.vertexColors[0] = color1;
        f.vertexColors[1] = color2;
        f.vertexColors[2] = color3;
    }

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    window.addEventListener("resize", onWindowResize, false);   
}

var param;

function onWindowResize(){
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(){
    stats.begin();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.end();
}
