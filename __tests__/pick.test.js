require('dotenv').config();
const got = require('got');
const { pickPhoto } = require('../lib/pick');

jest.mock('got');

describe('Test pick', () => {
  test('Pick photo fail will return the dog image', async () => {
    expectData = process.env.BAD_THING_IMAGE;
    const resp = await pickPhoto(true, 1, -100);
    expect(resp.length).toBe(1);
    expect(resp[0]).toBe(expectData);
  });

  test('Pick photo will return image list', async () => {
    const postData = { 'mediaMeta': [{ 'type': 'test', 'url': 'https://i.imugr.com/test' }] };
    const mockData = [];
    for (let i = 0; i < 10; i += 1) mockData[i] = postData;
    got.mockResolvedValue({ 'body': mockData });
    const resp = await pickPhoto(true, 1, 100);
    expect(resp.length).toStrictEqual(10);
  });

  test('Pick photo will not return thumbnail image', async () => {
    const postData = {
      'mediaMeta': [{ 'type': 'test', 'url': 'https://i.imugr.com/test' }],
    };
    const mockData = [];
    for (let i = 0; i < 10; i += 1) mockData[i] = postData;
    mockData.push([{ 'type': 'image/thumbnail', 'url': 'https://i.imugr.com/test' }]);
    got.mockResolvedValue({ 'body': mockData });
    const resp = await pickPhoto(true, 1, 100);
    expect(resp.length).toStrictEqual(10);
  });
});
