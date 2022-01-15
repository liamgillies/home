module.exports = {
  oceanicColor,
  oceanicLight,
  oceanicConfig
}

const oceanicColor = `
if (vHeight == uWorldOpts.seaLevel) 
  diffuseColor = vec3(0.024,0.409,1.);

else if (vHeight <= uWorldOpts.seaLevel + 0.18)
  diffuseColor = vec3(0.188,0.518,0.153);

else
  diffuseColor = vec3(0.62,0.902,0.298);
`

const oceanicLight = `
if(vHeight > uWorldOpts.seaLevel + 0.18) {
    return diffuseColor + specularStrength * computeSpecular(L, V, N, 0.9);
  }
return diffuseColor * (diffuse + light.ambient) + specular;`

const oceanicConfig = `
const worldOpts = {
    height: new GUIOpts(1, 0.01, 10, 0.01, "World Height"),
    seaLevel: new GUIOpts(0.25, -2, 2, 0.01, "Sea Level"),
    simplexOpacity: new GUIOpts(0.2, 0, 1, 0.01, "World Detail"),
  };
  
  const ridgeOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(0.5, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(2, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(1, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(1, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(7, 1, 10, 1, "Number of Layers"),
    terbulance: new GUIOpts(true, null, null, null, "Terbulance"),
    ridge: new GUIOpts(true, null, null, null, "Ridges"),
  };
  
  const SimplexOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(0.5, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(2, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(1, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(1, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(7, 1, 10, 1, "Number of Layers"),
    terbulance: new GUIOpts(false, null, null, null, "Terbulance"),
    ridge: new GUIOpts(false, null, null, null, "Ridges"),
  };
  
  const maskOpts = {
    scale: new GUIOpts(0.18, 0.01, 5, 0.01, "Scale"),
  };`