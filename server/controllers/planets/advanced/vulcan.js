module.exports = {
    vulcanColor,
    vulcanLight,
    vulcanConfig
}

const vulcanColor = `
if (vHeight <= uWorldOpts.seaLevel + 0.25) 
    diffuseColor = vec3(0.4,0.016,0.008);

else if(vHeight <= uWorldOpts.seaLevel + 0.33)
    diffuseColor = vec3(1.,0.412,0.);

else if(vHeight <= uWorldOpts.seaLevel + 0.5)
    diffuseColor = vec3(0.529,0.353,0.125);

else if (vHeight <= uWorldOpts.seaLevel + 0.64)
    diffuseColor = vec3(0.62,0.518,0.341);

else
    diffuseColor = vec3(0.498,0.804,1.);
`

const vulcanLight = `
if(vHeight > uWorldOpts.seaLevel + 0.64) {
    return diffuseColor + computeSpecular(L, V, N, 1.4);
  }
  return diffuseColor + falloff * computeSpecular(L, V, N, shininess) * specularScale;`

const vulcanConfig = `
const worldOpts = {
  height: new GUIOpts(2, 0.01, 10, 0.01, "World Height"),
  seaLevel: new GUIOpts(0.25, -2, 2, 0.01, "Sea Level"),
  simplexOpacity: new GUIOpts(0.2, 0, 1, 0.01, "World Detail"),
};

const ridgeOpts = {
  seed: new GUIOpts(Math.random() * 1000, null, null, null, "Seed"),
  persistance: new GUIOpts(0.75, 0.01, 2, 0.01, "Smoothness"),
  lacunarity: new GUIOpts(1.4, 0.1, 4, 0.01, "Detail"),
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
  scale: new GUIOpts(0.56, 0.01, 5, 0.01, "Scale"),
  redistribution: new GUIOpts(2.1, 0.1, 5, 0.01, "Flatness"),
  octaves: new GUIOpts(7, 1, 10, 1, "Number of Layers"),
  terbulance: new GUIOpts(false, null, null, null, "Terbulance"),
  ridge: new GUIOpts(false, null, null, null, "Ridges"),
};

const maskOpts = {
  scale: new GUIOpts(1, 0.01, 5, 0.01, "Scale"),
};`