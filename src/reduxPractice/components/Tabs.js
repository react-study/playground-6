import React from 'react';

const tablist = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nobis.',
  'Ipsum, fugiat odio. Deleniti quos ducimus repellendus mollitia necessitatibus quae.',
  'Temporibus alias, ducimus est, repudiandae atque architecto illo fuga labore.',
  'Repudiandae iusto harum fugiat officia iure laudantium porro repellendus suscipit.'
];

const Tabs = ( {focused, changeTab} ) => (
  <ul>
    {tablist.map((t,i) => (
        <li key={`tab${i}`} onClick = {() => changeTab(i)}>
          <span>#{i}</span>{' '}
          <span style={{
              display: i === focused ? 'block' : 'none'
          }}>{t}</span>
        </li>
    ))}
  </ul>
);

export default Tabs;
