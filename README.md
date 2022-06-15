# Sharp resizing changes 0.29 vs 0.30


```
cd ./sharp-0.30
yarn

cd ./sharp-0.28
yarn
```


```
node sharp-0.28/index.js # Outputs a PNG

node sharp-0.30/index.js # Error: webp: bad image dimensions
```

# PRoblem

Scaling a webp image past 16k now fails

```typescript
pipeline.resize(32768, 32768).extract({ top: 16384, left: 16384, width: 1024, height: 1024 })
```