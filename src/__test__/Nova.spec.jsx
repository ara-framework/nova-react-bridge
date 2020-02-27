import React from 'react';
import { mount } from 'enzyme';

import Nova from '../Nova';

jest.mock('uuid', () => ({
  v4: () => 'uuid',
}));

describe('Nova', () => {
  test('render placeholder with script tag correctly', () => {
    const data = { title: 'Ara' };

    const wrapper = mount(
      <Nova name="Example" data={data} />,
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('render placeholder with default data correctly', () => {
    const wrapper = mount(
      <Nova name="Example" />,
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('emit NovaMount when component is mount', async () => {
    const promise = new Promise((resolve) => {
      document.addEventListener('NovaMount', resolve);
    });

    mount(
      <Nova name="Example" />,
    );

    const event = await Promise.resolve(promise);

    expect(event.detail).toMatchSnapshot();
  });
});
