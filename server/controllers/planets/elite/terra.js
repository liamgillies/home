module.exports = {
    terraColor,
    terraLight,
    terraConfig
}

const terraColor = `
if(vHeight <= uWorldOpts.seaLevel + 0.25)
    diffuseColor = vec3(0.129,0.075,0.22);

else if (vHeight <= uWorldOpts.seaLevel + 0.28)
    diffuseColor = vec3(0.294, 0.839, 0.804);

else if (vHeight <= uWorldOpts.seaLevel + 0.4)
    diffuseColor = vec3(0.369,0.769,0.408);

else if (vHeight <= uWorldOpts.seaLevel + 0.6)
    diffuseColor = vec3(0.329, 0.369, 0.325);

else
    diffuseColor = vec3(0.69,0.149,1.);`

const terraLight = `
if(vHeight > uWorldOpts.seaLevel + 0.6) {
    return diffuseColor + computeSpecular(L, V, N, 0.8) * falloff;
  }
  if(vHeight > uWorldOpts.seaLevel + 0.25) {
    return diffuseColor + falloff * computeSpecular(L, V, N, 1.2);
  }
  return diffuseColor + falloff * computeSpecular(L, V, N, 0.95) * specularScale;
`

const terraConfig = `
const worldOpts = {
    height: new GUIOpts(2, 0.01, 10, 0.01, "World Height"),
    seaLevel: new GUIOpts(0.25, -2, 2, 0.01, "Sea Level"),
    simplexOpacity: new GUIOpts(0.2, 0, 1, 0.01, "World Detail"),
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
  };
`  