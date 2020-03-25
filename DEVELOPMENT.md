# After Template Updates

1. Update all CI templates with `node test/saveAll.js`

2. Push to all git providers (BitBucket/GitHub/GitLab) and ensure they pass

3. Update test snapshots with `npx jest --updateSnapshot`
