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

    geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial({
        shading: THREE.FlatShading,
        wireframe: false,
        vertexColors: THREE.VertexColors
    });

    var color1 = new THREE.Color(0xFF0000);
    var color2 = new THREE.Color(0x00FF00);
    var color3 = new THREE.Color(0x0000FF);

    var p1 = new THREE.Vector3(100,0,0);
    var p2 = new THREE.Vector3(0,100,0);
    var p3 = new THREE.Vector3(-100,0,0);

    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.vertices.push(p3);

    var face = new THREE.Face3(0,1,2);
    // var normal = new THREE.Vector3(0,1,0);  
    // face.normal.copy(normal);  //normal 面法向量
    // face.vertexNormals.push(normal.clone(),normal.clone(),normal.clone()); //vertexNormals 3个顶点法向量的数组

    face.vertexColors[0] = color1;
    face.vertexColors[1] = color2;
    face.vertexColors[2] = color3;

    geometry.faces.push(face);

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
