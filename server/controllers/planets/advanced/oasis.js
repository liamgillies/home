module.exports = {
    oasisColor,
    oasisLight,
    oasisConfig
}

const oasisColor = `
if(vHeight <= uWorldOpts.seaLevel + 0.17)
    diffuseColor = vec3(0.18,0.663,0.796);

else if(vHeight <= uWorldOpts.seaLevel + 0.3)
    diffuseColor = vec3(0.18,0.639,0.055);

else if (vHeight <= uWorldOpts.seaLevel + 0.5)
  diffuseColor = vec3(0.62,0.518,0.341);

else if (vHeight <= uWorldOpts.seaLevel + 0.8) 
    diffuseColor = vec3(0.529,0.353,0.125);

else
    diffuseColor = vec3(0.498,0.804,1.);
`

const oasisLight = `
if(vHeight > uWorldOpts.seaLevel + 0.8) {
    return diffuseColor + computeSpecular(L, V, N, 1.4);
  }
  return diffuseColor + falloff * computeSpecular(L, V, N, shininess) * specularScale;`

const oasisConfig = `
const worldOpts = {
    height: new GUIOpts(2, 0.01, 10, 0.01, "World Height"),
    seaLevel: new GUIOpts(0.17, -2, 2, 0.01, "Sea Level"),
    simplexOpacity: new GUIOpts(0.3, 0, 1, 0.01, "World Detail"),
  };
  
  const ridgeOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(0.01, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(3, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(0.8, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(1, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(1, 1, 10, 1, "Number of Layers"),
    terbulance: new GUIOpts(true, null, null, null, "Terbulance"),
    ridge: new GUIOpts(true, null, null, null, "Ridges"),
  };
  
  const SimplexOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(0.01, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(0.1, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(0.01, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(0.1, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(1, 1, 10, 1, "Number of Layers"),
    terbulance: new GUIOpts(false, null, null, null, "Terbulance"),
    ridge: new GUIOpts(false, null, null, null, "Ridges"),
  };
  
  const maskOpts = {
    scale: new GUIOpts(0.3, 0.01, 5, 0.01, "Scale"),
  };`