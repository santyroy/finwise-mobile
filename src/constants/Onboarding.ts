import {Slide} from '@app-types/onboarding_types';

export const slides: Slide[] = [
  {
    id: 0,
    image: require('@assets/images/onboarding/onboard-1.png'),
    title: 'Gain total control of your money',
    subTitle: 'Become your own money manager and make every cent count',
  },
  {
    id: 1,
    image: require('@assets/images/onboarding/onboard-2.png'),
    title: 'Know where your money goes',
    subTitle:
      'Track your transaction easily, with categories and financial report ',
  },
  {
    id: 2,
    image: require('@assets/images/onboarding/onboard-3.png'),
    title: 'Planning ahead',
    subTitle: 'Setup your budget for each category so you in control',
  },
];
