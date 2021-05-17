import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * This is the highest level of the web app.
 */
class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      camera: null,
      controls: null,
      cube: null,
      renderer: null,
      scene: null,
    };

    this.render_scene = this.render_scene.bind(this);
  }

  componentDidMount() {
    const canvas = document.querySelector("#main-screen");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 50;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 20;
    const controls = new OrbitControls( camera, renderer.domElement );

    const scene = new THREE.Scene();

    const geometry = new THREE.DodecahedronGeometry(7);
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    this.setState({
      camera: camera,
      cube: cube,
      controls: controls,
      renderer: renderer,
      scene: scene,
    });

    renderer.render(scene, camera);

    requestAnimationFrame(this.render_scene);
  }

  resizeRendererToDisplaySize (renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  render_scene (time) {
    let camera = this.state.camera;
    let cube = this.state.cube;
    let renderer = this.state.renderer;

    if (this.resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    time *= 0.001;  // convert time to seconds

    cube.rotation.x = time;
    cube.rotation.y = time;

    this.state.controls.update();

    renderer.render(this.state.scene, camera);

    requestAnimationFrame(this.render_scene);
  }

  render() {
    return (
      <div id="App">
        <canvas id="main-screen" />
      </div>
    );
  }
}

export default App;
