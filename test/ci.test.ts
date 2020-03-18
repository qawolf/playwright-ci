import { COMMANDS } from '../src/commands';
import * as ci from '../src/ci';

const { buildCiTemplate, promptOverwrite } = ci;

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

describe('promptOverwrite', () => {
  afterAll(() => jest.restoreAllMocks());

  it('returns true if path does not exist', async () => {
    jest
      .spyOn(ci, 'pathExists')
      .mockReturnValue(new Promise(resolve => resolve(false)));

    const shouldSave = await promptOverwrite('myTest.test.js');
    expect(shouldSave).toBe(true);
  });

  it('returns true if path exists but can overwrite', async () => {
    jest
      .spyOn(ci, 'pathExists')
      .mockReturnValue(new Promise(resolve => resolve(true)));
    jest
      .spyOn(ci, 'promptConfirmOverwrite')
      .mockReturnValue(new Promise(resolve => resolve(true)));

    const shouldSave = await promptOverwrite('myTest.test.js');
    expect(shouldSave).toBe(true);
  });

  it('returns false if path exists and cannot overwrite', async () => {
    jest
      .spyOn(ci, 'pathExists')
      .mockReturnValue(new Promise(resolve => resolve(true)));
    jest
      .spyOn(ci, 'promptConfirmOverwrite')
      .mockReturnValue(new Promise(resolve => resolve(false)));

    const shouldSave = await promptOverwrite('myTest.test.js');
    expect(shouldSave).toBe(false);
  });
});
