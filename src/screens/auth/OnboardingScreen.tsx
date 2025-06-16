import {FC, useState, useRef} from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import PrimaryButton from '@components/PrimaryButton';
import SecondaryButton from '@components/SecondaryButton';

import {slides} from '@constants/Onboarding';
import {Colors} from '@constants/Colors';

import {AuthStackParamList} from '@navigation/AuthStack';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;

const OnboardingScreen: FC = () => {
  const {height, width} = useWindowDimensions();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentSlide = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentSlide);
  };

  const skipSlides = () => {
    const lastSlideIndex = slides.length - 1;
    const lastOffset = lastSlideIndex * width;
    ref.current?.scrollToOffset({animated: true, offset: lastOffset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const nextSlide = () => {
    if (currentSlideIndex !== slides.length - 1) {
      const nextSlideIndex = currentSlideIndex + 1;
      const nextOffset = nextSlideIndex * width;
      ref.current?.scrollToOffset({animated: true, offset: nextOffset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const goToSignIn = () => navigation.replace('SignIn');

  return (
    <SafeAreaView style={styles.container}>
      {/* Slides */}
      <FlatList
        data={slides}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={[styles.slideContainer, {maxWidth: width}]}>
            <Image
              source={item.image}
              resizeMode="contain"
              style={[{width: width}, styles.slideImage]}
            />
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideSubTitle}>{item.subTitle}</Text>
          </View>
        )}
        contentContainerStyle={{height: height * 0.75}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        ref={ref}
      />

      {/* Indicators */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex === index && styles.indicatorActive,
            ]}
          />
        ))}
      </View>

      {/* Buttons */}
      {currentSlideIndex !== slides.length - 1 ? (
        <View style={styles.buttonContainer}>
          <SecondaryButton
            title="Skip"
            onPress={skipSlides}
            btnContainerStyle={styles.btnFlex}
          />
          <PrimaryButton
            title="Next"
            onPress={nextSlide}
            btnContainerStyle={styles.btnFlex}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Get Started"
            onPress={goToSignIn}
            btnContainerStyle={styles.btnFlex}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base.light[100],
    paddingVertical: 20,
  },

  // OnboardingSlide
  slideContainer: {
    alignItems: 'center',
  },
  slideImage: {
    height: '75%',
  },
  slideTitle: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.base.dark['100'],
    maxWidth: '90%',
  },
  slideSubTitle: {
    maxWidth: '70%',
    fontSize: 16,
    textAlign: 'center',
    color: Colors.base.light[20],
    lineHeight: 20,
  },

  // Indicator
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: Colors.violet[20],
    borderRadius: 4,
  },
  indicatorActive: {
    backgroundColor: Colors.violet[100],
    height: 14,
    width: 14,
    borderRadius: 7,
  },

  // Button
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  btnFlex: {
    flex: 1,
  },
});
