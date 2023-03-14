import { GetServerSideProps } from 'next';
import { ssrGetServerSideProps } from 'services/ssr/starred';
import Starred, { Props } from 'components/Pages/Starred';

export default Starred;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return ssrGetServerSideProps(context, context.query.customDomain === '1');
};
