module.exports = {
    tectonColors,
    tectonLight,
    tectonConfig
}

const tectonColors = `
    if (vHeight <= uWorldOpts.seaLevel) 
    diffuseColor = vec3(0.4,0.016,0.008);

  else if(vHeight <= uWorldOpts.seaLevel + 0.04)
    diffuseColor = vec3(0.169,0.004,0.);

  else if(vHeight <= uWorldOpts.seaLevel + 0.1)
    diffuseColor = vec3(0.22,0.157,0.145);

  else if (vHeight <= uWorldOpts.seaLevel + 0.22)
    diffuseColor = vec3(0.192,0.153,0.137);

  else
    diffuseColor = vec3(0.62,0.902,0.298);`

const tectonLight = `
if(vHeight > uWorldOpts.seaLevel + 0.22) {
  return diffuseColor + specularStrength * computeSpecular(L, V, N, 0.9);
}
return diffuseColor * (diffuse + light.ambient) + specular;`

const tectonConfig = `
const worldOpts = {
    height: new GUIOpts(1, 0.01, 10, 0.01, "World Height"),
    seaLevel: new GUIOpts(0.22, -2, 2, 0.01, "Sea Level"),
    simplexOpacity: new GUIOpts(0.2, 0, 1, 0.01, "World Detail"),
  };
  
  const ridgeOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(1, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(2.8, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(1.7, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(1, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(7, 1, 10, 1, "Number of Layers"),
    terbulance: new GUIOpts(true, null, null, null, "Terbulance"),
    ridge: new GUIOpts(true, null, null, null, "Ridges"),
  };
  
  const SimplexOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(0.01, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(2.8, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(3.65, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(3.65, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(7, 1, 10, 1, "Number of Layers"),
    terbulance: new GUIOpts(false, null, null, null, "Terbulance"),
    ridge: new GUIOpts(false, null, null, null, "Ridges"),
  };

  const maskOpts = {
    scale: new GUIOpts(2.27, 0.01, 5, 0.01, "Scale"),
  };`