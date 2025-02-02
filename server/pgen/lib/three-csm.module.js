import * as THREE from "../lib/glNoise/node_modules/three/build/three.module.js";

const TYPES$1 = {
  NORMAL: "MeshNormalMaterial",
  BASIC: "MeshBasicMaterial",
  PHONG: "MeshPhongMaterial",
  MATCAP: "MeshMatcapMaterial",
  TOON: "MeshToonMaterial",
  PHYSICAL: "MeshPhysicalMaterial",
  LAMBERT: "MeshLambertMaterial",
  DEPTH: "MeshDepthMaterial",
};

/**
 * @typedef {Object} CustomShader
 * @property {string} defines        Constant definitions like - "#define PI = 3.14;"
 * @property {string} header         Code to be injected above main. Place function definitions here.
 * @property {string} main           Code to be injected above main. Put main shader code here.
 */

/**
 * This class lets you use your own custom Vertex Shaders along with
 * predefined ThreeJS Fragmet Shaders. This takes away the hastle of
 * writing code for lighting and shaing.
 */
class CustomShaderMaterial extends THREE.Material {
  /**
   * Creates an instance of the <code>CustomShaderMaterial</code> class.
   *
   * <b>The variable <code>newPos</code> and <code>newNormal</code> must be
   * defined in the main section of the indjected shader.</b>
   *
   *
   * @param {Object} options                    Options for material.
   * @param {string} options.baseMaterial       Base Material. The material whos fragment shader is used. Any type from the exported <code>TYPES</code> object
   * @param {CustomShader} options.vShader   Custom Vertex Shader
   * @param {CustomShader} options.fShader   Custom Fragment Shader
   * @param {Object} options.uniforms           Custom Uniforms to be passed to the shader.
   * @param {Object} options.passthrough        Any custom options to be passed to the underlying base material.
   *
   * @example
   * const material = new CustomShaderMaterial({
   *     baseMaterial: TYPES.PHYSICAL,
   *     vShader: {
   *         defines: vertex.defines,
   *         header: vertex.header,
   *         main: vertex.main,
   *     },
   *    fShader: {
   *         defines: fragment.defines,
   *         header: fragment.header,
   *         main: fragment.main,
   *     },
   *     uniforms: {
   *         uTime: { value: 1.0 },
   *         uResolution: { value: new THREE.Vector3() },
   *     },
   *     passthrough: {
   *         flatShading: true,
   *     },
   * });
   * material.uniforms.uResolution.set(1920, 1080, 0);
   */
  constructor(options) {
    if (options.fShader) {
      if (!options.fShader.defines || !options.fShader.header || !options.fShader.main) {
        throw new Error("Property 'fShader' requires all its components to be present.");
      }
    }

    if (options.vShader) {
      if (!options.vShader.defines || !options.vShader.header || !options.vShader.main) {
        throw new Error("Property 'vShader' requires all its components to be present.");
      }
    }

    const base = new THREE[options.baseMaterial](options.passthrough);

    super();

    if (options.baseMaterial == TYPES$1.BASIC) console.warn("TYPES.BASIC does not support displacement in a Vertex Shader. Use TYPES.PHYSICAL instead.");

    if (options.baseMaterial == TYPES$1.NORMAL || options.baseMaterial == TYPES$1.LAMBERT) console.warn("TYPES.NORMAL and TYPES.LAMBERT do not support envornment maps.");

    for (const key in base) {
      if (this[key] === undefined) this[key] = 0;
    }

    this.setValues(base);

    this.onBeforeCompile = (shader) => {
      shader.vertexShader = _patchShader("vert", options.baseMaterial, shader.vertexShader, {
        defines: options.vShader.defines,
        header: options.vShader.header,
        main: options.vShader.main,
      });

      if (options.fShader) {
        shader.fragmentShader = _patchShader("frag", options.baseMaterial, shader.fragmentShader, {
          defines: options.fShader.defines,
          header: options.fShader.header,
          main: options.fShader.main,
        });
      }

      Object.keys(options.uniforms).forEach((k) => {
        shader.uniforms[k] = options.uniforms[k];
      });

      this.uniforms = shader.uniforms;
      //   this.needsUpdate = true;
    };
  }
}

/**
 * From https://codepen.io/marco_fugaro/pen/xxZWPWJ?editors=0010
 * @private
 */
function _patchShader(type, base, shader, { defines = "", header = "", main = "" }) {
  let patchedShader = shader;

  const replaces =
    type === "vert"
      ? {
          "#include <defaultnormal_vertex>": THREE.ShaderChunk.defaultnormal_vertex.replace("vec3 transformedNormal = objectNormal;", `vec3 transformedNormal = newNormal;`),

          "#include <displacementmap_vertex>": `
          transformed = newPos;
        `,
          "#include <project_vertex>": `
          vec4 mvPosition = vec4( transformed, 1.0 );
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;
          `,
        }
      : {
          "#include <lights_toon_fragment>": `
    diffuseColor = newColor;
    // totalEmissiveRadiance = newColor.rgb;
    #include <lights_toon_fragment>
    `,
          "#include <lights_phong_fragment>": `
    diffuseColor = newColor;
    // totalEmissiveRadiance = newColor.rgb;
    #include <lights_phong_fragment>
    `,
        };

  //   if (base === TYPES.PHONG && type === "frag") {
  //     replaces["#include <lights_toon_fragment>"] = `
  //         diffuseColor = newColor;
  //         // totalEmissiveRadiance = newColor.rgb;
  //         #include <lights_phong_fragment>
  //         `;
  //   }

  const replaceAll = (str, find, rep) => str.split(find).join(rep);
  Object.keys(replaces).forEach((key) => {
    patchedShader = replaceAll(patchedShader, key, replaces[key]);
  });

  patchedShader = patchedShader.replace(
    "void main() {",
    `
      ${header}
      void main() {
        ${main}
      `
  );

  return `
      ${defines}
      ${patchedShader}
    `;
}

const TYPES = {
  NORMAL: "MeshNormalMaterial",
  BASIC: "MeshBasicMaterial",
  PHONG: "MeshPhongMaterial",
  MATCAP: "MeshMatcapMaterial",
  TOON: "MeshToonMaterial",
  PHYSICAL: "MeshPhysicalMaterial",
  LAMBERT: "MeshLambertMaterial",
  DEPTH: "MeshDepthMaterial",
};

export { CustomShaderMaterial, TYPES };
