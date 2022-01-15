module.exports = {
    duneColor,
    duneLight,
    duneConfig
}

const duneColor = `
    if(vHeight <= uWorldOpts.seaLevel + 0.01)
      diffuseColor = vec3(0.729,0.608,0.451);
  
    else if(vHeight <= uWorldOpts.seaLevel + 0.14)
      diffuseColor = vec3(0.529,0.353,0.125);
  
    else if(vHeight <= uWorldOpts.seaLevel + 0.28)
      diffuseColor = vec3(0.62,0.518,0.341);
  
    else
      diffuseColor = vec3(0.62,0.902,0.298);
  }`

const duneLight = `
if(vHeight > uWorldOpts.seaLevel + 0.28) {
    return diffuseColor + specularStrength * computeSpecular(L, V, N, 0.9);
  }
return diffuseColor * (diffuse + light.ambient) + specular;`

const duneConfig = `
const worldOpts = {
    height: new GUIOpts(1.08, 0.01, 10, 0.01, "World Height"),
    seaLevel: new GUIOpts(0.1, -2, 2, 0.01, "Sea Level"),
    simplexOpacity: new GUIOpts(0.01, 0, 1, 0.01, "World Detail"),
  };
  
  const ridgeOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(0.74, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(2.12, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(1.7, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(1, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(1, 1, 10, 1, "Number of Layers"),
    terbulance: new GUIOpts(true, null, null, null, "Terbulance"),
    ridge: new GUIOpts(true, null, null, null, "Ridges"),
  };
  
  const SimplexOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(0.01, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(3.24, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(3.65, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(2.59, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(10, 1, 10, 1, "Number of Layers"),
    terbulance: new GUIOpts(false, null, null, null, "Terbulance"),
    ridge: new GUIOpts(false, null, null, null, "Ridges"),
  };
  
  const maskOpts = {
    scale: new GUIOpts(0.16, 0.01, 5, 0.01, "Scale"),
  };`