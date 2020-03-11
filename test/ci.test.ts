// TODO snapshots...
import { COMMANDS } from '../src/commands';
import { buildCiTemplate } from '../src/ci';

describe('buildCiTemplate', () => {
  it('builds playwright templates', () => {
    COMMANDS.forEach(item => {
      const provider = item.command;
      expect(buildCiTemplate({ provider, qawolf: false })).toMatchSnapshot(
        provider,
      );
    });
  });

  it('builds qawolf templates', () => {
    COMMANDS.forEach(item => {
      const provider = item.command;
      expect(buildCiTemplate({ provider, qawolf: true })).toMatchSnapshot(
        `${provider}_qawolf`,
      );
    });
  });
});
