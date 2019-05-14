window.onload = function () {
    init();
    animate();
}


var renderer, camera, scene;
var mesh;
var texture = null;
var stats;

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.z = 400;
    scene = new THREE.Scene();

    var geometry = new THREE.PlaneGeometry(500,300,1,1);  //平面模型
    var material;
    var loader = new THREE.TextureLoader();
    loader.load('../texture/5.png', function(text){
        texture = text;
        material = new THREE.MeshBasicMaterial({
            map: texture
        });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    },function(xhr){
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },function(){
        console.log( 'An error happened' );
    });

    createUI();
    window.addEventListener("resize", onWindowResize, false);   
}

var param;
function createUI(){
    var parameter = function(){
        this.repeat = 1;
        this.wrap = 1;
    }
    param = new parameter();
    var gui = new dat.GUI();
    gui.add(param, "repeat", 1, 5).name("纹理重复");
    gui.add(param, "wrap", 1, 3).name("纹理环绕").step(1);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(){
    stats.begin();
    change();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.end();
}

function change(){
    if(texture != null){
        texture.repeat.x = texture.repeat.y = param.repeat;
        if(param.wrap == 1){
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }else if(param.wrap == 2){
            texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        }else if(param.wrap == 3){
            texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
        }
        texture.needsUpdate = true;
    }
}