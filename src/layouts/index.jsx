import { IRouteComponentProps } from 'umi';

export default function Layout({ children, location, route, history, match }) {
  return <div style={{ padding: '2rem' }}>{children}</div>;
}
