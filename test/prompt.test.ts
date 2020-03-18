import * as prompt from '../src/prompt';
import * as utils from '../src/utils';

const { promptOverwrite } = prompt;

describe('promptOverwrite', () => {
  afterAll(() => jest.restoreAllMocks());

  it('returns true if path does not exist', async () => {
    jest
      .spyOn(utils, 'pathExists')
      .mockReturnValue(new Promise(resolve => resolve(false)));

    const shouldSave = await promptOverwrite('myTest.test.js');
    expect(shouldSave).toBe(true);
  });

  it('returns true if path exists but can overwrite', async () => {
    jest
      .spyOn(utils, 'pathExists')
      .mockReturnValue(new Promise(resolve => resolve(true)));
    jest
      .spyOn(prompt, 'promptConfirmOverwrite')
      .mockReturnValue(new Promise(resolve => resolve(true)));

    const shouldSave = await promptOverwrite('myTest.test.js');
    expect(shouldSave).toBe(true);
  });

  it('returns false if path exists and cannot overwrite', async () => {
    jest
      .spyOn(utils, 'pathExists')
      .mockReturnValue(new Promise(resolve => resolve(true)));
    jest
      .spyOn(prompt, 'promptConfirmOverwrite')
      .mockReturnValue(new Promise(resolve => resolve(false)));

    const shouldSave = await promptOverwrite('myTest.test.js');
    expect(shouldSave).toBe(false);
  });
});
