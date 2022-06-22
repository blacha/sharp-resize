# Sharp resizing changes 0.29 vs 0.30

# Fixes with sharp 0.30.7 https://github.com/lovell/sharp/issues/3262

```
cd ./sharp-0.30
yarn

cd ./sharp-0.29
yarn
```


```
node sharp-0.29/index.js # Outputs a PNG

node sharp-0.30/index.js # Error: webp: bad image dimensions
```

# Problem

Scaling a webp image past 16383 x 16383 now fails

```typescript
pipeline.resize(32768, 32768).extract({ top: 16384, left: 16384, width: 1024, height: 1024 })
```
