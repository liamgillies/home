module.exports = {
    cryovolcanoColor,
    cryovolcanoLight,
    cryovolcanoConfig
}

const cryovolcanoColor = `
if (vHeight <= uWorldOpts.seaLevel + 0.25) 
    diffuseColor = vec3(0.4,0.016,0.008);

else if(vHeight <= uWorldOpts.seaLevel + 0.33)
    diffuseColor = vec3(1.,0.412,0.);

else if(vHeight <= uWorldOpts.seaLevel + 0.73)
    diffuseColor = vec3(0.518,0.596,0.847);

else
    diffuseColor = vec3(0.69,0.149,1.);`

const cryovolcanoLight = `
if(vHeight > uWorldOpts.seaLevel + 0.73) {
    return diffuseColor + computeSpecular(L, V, N, 1.4);
  }
    if(vHeight > uWorldOpts.seaLevel + 0.33) {
    return diffuseColor + falloff * computeSpecular(L, V, N, 1.2);
  }
  return diffuseColor + falloff * computeSpecular(L, V, N, shininess) * specularScale;
`

const cryovolcanoConfig = `
const worldOpts = {
    height: new GUIOpts(2, 0.01, 10, 0.01, "World Height"),
    seaLevel: new GUIOpts(0.25, -2, 2, 0.01, "Sea Level"),
    simplexOpacity: new GUIOpts(0.3, 0, 1, 0.01, "World Detail"),
  };
  
  const ridgeOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(1.3, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(1.4, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(1.7, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(1, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(5, 1, 10, 1, "Number of Layers"),
    terbulance: new GUIOpts(true, null, null, null, "Terbulance"),
    ridge: new GUIOpts(true, null, null, null, "Ridges"),
  };
  
  const SimplexOpts = {
    seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
    persistance: new GUIOpts(0.01, 0.01, 2, 0.01, "Smoothness"),
    lacunarity: new GUIOpts(2.8, 0.1, 4, 0.01, "Detail"),
    scale: new GUIOpts(0.56, 0.01, 5, 0.01, "Scale"),
    redistribution: new GUIOpts(2.1, 0.1, 5, 0.01, "Flatness"),
    octaves: new GUIOpts(7, 1, 10, 1, "Number of Layers"),
    terbulance: new GUIOpts(false, null, null, null, "Terbulance"),
    ridge: new GUIOpts(false, null, null, null, "Ridges"),
  };
  
  const maskOpts = {
    scale: new GUIOpts(1.6, 0.01, 5, 0.01, "Scale"),
  };`