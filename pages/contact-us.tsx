import { NextPage } from 'next';

import HomeLayout from '@/layouts/Home';
import { i18nNamespace } from '@/constants';

const Contact: NextPage = () => {
  return <HomeLayout mode="light">contact-us</HomeLayout>;
};

Contact.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Contact;
