import React, { Suspense } from 'react';
import Tabs from './components/Tabs';
import Glimmer from './components/Glimmer';

// const Comments = React.lazy(() => import('./components/Comments'));

// 模拟加载延迟时间
const Comments = React.lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve(import("./components/Comments")), 300);
    });
  });
const Photos = React.lazy(() => import('./components/Photos'));

function LazyLoad() {
  const [tab, setTab] = React.useState('photos');


  return (
    <div >
      <Tabs onTabSelect={setTab} />
      <Suspense fallback={<Glimmer />}>
        {tab === 'photos' ? <Photos /> : <Comments />}
      </Suspense>
    </div>
  );
}

export default LazyLoad;
