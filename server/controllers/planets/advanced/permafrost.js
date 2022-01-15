module.exports = {
    permafrostColor,
    permafrostLight,
    permafrostConfig
}

const permafrostColor = `
if(vHeight <= uWorldOpts.seaLevel + 0.25)
    diffuseColor = vec3(0.494,0.589,1.);

else if (vHeight <= uWorldOpts.seaLevel + 0.65) 
    diffuseColor = vec3(0.518,0.596,0.847);

else
    diffuseColor = vec3(0.498,0.804,1.);`

const permafrostLight = `
if(vHeight > uWorldOpts.seaLevel + 0.6) {
    return diffuseColor + computeSpecular(L, V, N, 0.8);
  }
  if(vHeight > uWorldOpts.seaLevel + 0.25) {
    return diffuseColor + falloff * computeSpecular(L, V, N, 1.2);
  }
  return diffuseColor + falloff * computeSpecular(L, V, N, 0.95) * specularScale;`

const permafrostConfig = `
const worldOpts = {
    height: new GUIOpts(2, 0.01, 10, 0.01, "World Height"),
    seaLevel: new GUIOpts(0.25, -2, 2, 0.01, "Sea Level"),
    simplexOpacity: new GUIOpts(0.2, 0, 1, 0.01, "World Detail"),
  };
  
  const ridgeOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(0.5, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(2, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(3.5, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(1, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(1, 1, 10, 1, "Number of Layers"),
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
    scale: new GUIOpts(2, 0.01, 5, 0.01, "Scale"),
  };`