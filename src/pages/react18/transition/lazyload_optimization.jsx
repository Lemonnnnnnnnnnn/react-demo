import React, { Suspense, startTransition  } from 'react';
import Tabs from '../components/Tabs';
import Glimmer from '../components/Glimmer';

const Comments = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("../components/Comments")), 300);
  });
});
const Photos = React.lazy(() => import('../components/Photos'));

function LazyLoad() {
  const [tab, setTab] = React.useState('photos');

  //#region transition
  // 因为懒加载的原因，首次切换comments 的tab时会出现 suspense的闪烁
  function handleTabSelect(tab) {
    startTransition(() => { // 你告诉react，tab不是一个迫切的更新需求，而是一个会交互渲染的转场（transitions），这样react就会保持旧的UI直到更新
      setTab(tab);
    })
  };
  //#endregion transition

  return (
    <div>
      <Tabs onTabSelect={handleTabSelect} />
      <Suspense fallback={<Glimmer />}>
        {tab === 'photos' ? <Photos /> : <Comments />}
      </Suspense>
    </div>
  );
}


export default LazyLoad