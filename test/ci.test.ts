import * as ci from '../src/ci';
import { CI_PROVIDERS } from '../src/providers';

const { buildCiTemplate } = ci;

describe('buildCiTemplate', () => {
  it('builds playwright templates', () => {
    CI_PROVIDERS.forEach(item => {
      if (!item.name) return;
      const provider = item.name;
      expect(buildCiTemplate({ provider, qawolf: false })).toMatchSnapshot(
        provider,
      );
    });
  });

  it('builds qawolf templates', () => {
    CI_PROVIDERS.forEach(item => {
      if (!item.name) return;

      const provider = item.name;
      expect(buildCiTemplate({ provider, qawolf: true })).toMatchSnapshot(
        `${provider}_qawolf`,
      );
    });
  });
});
