const { CI_PROVIDERS } = require('../build/providers');
const { saveCiTemplate } = require('../build/ci');

CI_PROVIDERS.forEach(async ({ name }) => {
  if (!name) return;

  await saveCiTemplate({ force: true, provider: name });
});
