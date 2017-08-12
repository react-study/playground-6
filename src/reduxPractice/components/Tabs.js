import React from 'react';

const tablist = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, explicabo!',
    'Animi recusandae, similique veniam neque omnis harum veritatis nobis sit!',
    'Quod suscipit vitae eveniet consequatur, itaque quia, facere sunt praesentium.',
    '아무내용이나 마구 적으셔도 됩니다요'
];

const Tabs = ({ focused, changeTab }) => (
    <ul>
        {tablist.map((t, i) => (
            <li key={`tab${i}`} onClick={() => changeTab(i)}>
                <span>#{i}</span>{' '}
                <span style={{
                    display: i === focused ? 'block' : 'none'
                }}>{t}</span>
            </li>
        ))}
    </ul>
);

export default Tabs;