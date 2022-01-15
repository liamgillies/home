module.exports = {
    eternalColor,
    eternalLight,
    eternalConfig
}

const eternalColor = `
if(vHeight <= uWorldOpts.seaLevel + 4.5)
    diffuseColor = vec3(0.027,0.,0.047);

else
    diffuseColor = vec3(1.,0.843,0.);`

const eternalLight = `
if(vHeight > uWorldOpts.seaLevel + 4.5) {
    return diffuseColor + computeSpecular(L, V, N, 0.8) * falloff;
  }
  return diffuseColor + falloff * computeSpecular(L, V, N, 0.95);`

const eternalConfig = `
const worldOpts = {
    height: new GUIOpts(10, 0.01, 10, 0.01, "World Height"),
    seaLevel: new GUIOpts(0.5, -2, 2, 0.01, "Sea Level"),
    simplexOpacity: new GUIOpts(1, 0, 1, 0.01, "World Detail"),
  };
  
  const ridgeOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(0.8, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(2, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(2.5, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(1, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(10, 1, 10, 1, "Number of Layers"),
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
    scale: new GUIOpts(0.55, 0.01, 5, 0.01, "Scale"),
  };`